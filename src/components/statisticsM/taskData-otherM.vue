<template>
  <div class="taskDataEchart-wrapper echartsM">
    <div class="header">
      <div class="c">
        <!--名称-->
        <span class="name fc">{{ $t('statistics_mainM.taskData.name') }}</span>
        <!--新增任务数统计-->
        <span class="navLi fc" :class="[{'active': navIndex == 0}]">
          {{ $t('statistics_mainM.taskData.navLi_one') }}
        </span>
        <!--累计任务数统计-->
        <span class="navLi fc" :class="[{'active': navIndex == 1}]">
          {{ $t('statistics_mainM.taskData.navLi_two') }}
        </span>
      </div>
      <div class="c filter">
        <!--时间区间-->
        <div class="filter-item">
          <calendar @changeSelectDate="changeSelectDate" @changeSelect="dateInterval = 'customize'" ref="selectDateM"/>
        </div>
        <!--下拉框-->
        <div class="select bl">
          <el-select v-model="dateInterval" placeholder="请选择" @change="$refs.selectDateM.setDateInterval(dateInterval)">
            <el-option
              v-for="item in dateIntervalList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--全屏-->
        <span class="bigger fc bl" v-show="fullBtn">
          <img src="@/icons/bigger.png" alt="" @click="f">
        </span>
        <!--返回-->
        <div class="farm-primary-form-btn" v-show="!fullBtn" @click="e">
          <img src="@/icons/back_icon-black.png" alt="" class="btnIcon default">
          <img src="@/icons/back_icon-white.png" alt="" class="btnIcon hover">
          <span>返回</span>
        </div>
      </div>
    </div>
    <section>
      <div class="selectData">
        <el-select v-model="taskV" placeholder="请选择">
          <el-option
            v-for="item in taskList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="ec" ref="ec"/>
    </section>
  </div>
</template>

<script>
  import calendar from '@/components/farm-model/farm-calendar.vue'
  import {
    getTaskData
  } from '@/api/statistics-api.js'
  import {
    mapState
  } from 'vuex'
  import {messageFun} from "../../assets/common";

  export default {
    name: '',
    data() {
      return {
        navIndex: 0,
        ec: null,
        dateIntervalList: [
          {
            value: 'nearlySevenDays',
            label: '近7天'
          },
          {
            value: 'nearlyThirtyDays',
            label: '近30天'
          },
          {
            value: 'customize',
            label: '自定义'
          }
        ],
        itemList: [
          {
            value: '选项1',
            label: '近7天'
          },
          {
            value: '近30天',
            label: '近30天'
          },
          {
            value: '自定义',
            label: '自定义'
          }
        ],
        dateInterval: 'nearlySevenDays',
        taskV: '',
        startDate: '',
        endDate: '',
        fullBtn: true,
        chartsSeries: []
      }
    },
    props: {
      taskList: Array,
      chartsData: {
        type: Object,
        default: null
      }
    },
    watch: {
      startDate() {
        this.$emit('monitorVal', [this.startDate, this.endDate, 'taskData'])
      },
      endDate() {
        this.$emit('monitorVal', [this.startDate, this.endDate, 'taskData'])
      },
      'chartsData': {
        handler: function (val) {
          if (!val) return false
          else this.getChartsData()
        },
        immediate: true
      }
    },
    mounted() {
      this.init()
      window.addEventListener('resize', this.ec.resize)
      this.$refs.selectDateM.setDateInterval(this.dateInterval)
    },
    computed: {
      ...mapState(['zoneId'])
    },
    methods: {
      // echarts 初始化
      init() {
        this.ec = this.$echarts.init(this.$refs.ec)
        this.ec.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            backgroundColor: 'rgba(27, 83, 244, 0.59)'
          },
          xAxis: {
            type: 'time',
            maxInterval: 3600 * 24 * 1000,
            splitLine: {
              show: false
            },
            axisLabel: {
              color: 'rgba(22, 29, 37, 0.4)'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(22, 29, 37, 0.1)'
              }
            },
          },
          yAxis: {
            type: 'value',
            axisTick: {
              inside: true
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              inside: false,
              formatter: '{value}',
              color: 'rgba(22, 29, 37, 0.4)'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(22, 29, 37, 0.1)'
              }
            },
            z: 10
          },
          grid: {
            top: 50,
            left: 26,
            right: 26,
          },
          series: this.chartsSeries
        })
      },
      // 日期选择模块选择结果
      changeSelectDate([startDate, endDate]) {
        this.startDate = startDate
        this.endDate = endDate
      },
      // 全屏
      f() {
        this.$emit('fullScreen', 'showTaskData')
        setTimeout(this.ec.resize, 120)
        this.fullBtn = false
      },
      // 取消全屏
      e() {
        this.$emit('miniScreen')
        setTimeout(this.ec.resize, 120)
        this.fullBtn = true
      },
      // 获取charts数据
      async getChartsData() {
        let data = await getTaskData({
          "type": String(this.navIndex + 1),
          "projectUuid": this.chartsData[this.navIndex == 0 ? 'count' : 'newly']['projectUuid'],
          "dateBegin": new Date(this.startDate).getTime(),
          "dateEnd": new Date(this.endDate).getTime(),
          "defaultDateStatus": '1',
          "zoneuuid": this.zoneId
        })
        if (data.data.code != 200) {
          messageFun('error', '获取数据失败')
        } else {
          this.chartsSeries = Object.keys(data.data.data).map((item,index) => {
            return {
              name: this.taskList.find(curr => curr.value == item).label,
              type: 'line',
              smooth: true,         // 是否平滑曲线显示
              symbol: 'circle',     // 标记的样式
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: 'rgba(255, 191, 0, 1)'
              },
              // areaStyle: {
              //   color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //     {
              //       offset: 0,
              //       color: 'rgba(255, 191, 0, 0.2)'
              //     },
              //     {
              //       offset: 1,
              //       color: 'rgba(255, 191, 0, 0)'
              //     }
              //   ])
              // },
              data: this.transformType(data.data.data[item])
            }
          })
          console.log(this.chartsSeries)
          this.init()
        }
      },
      // 格式转换
      transformType(data){
        let l = []
        Object.keys(data).forEach(item => {
          l.push([item, data[item]])
        })
        return l
      }
    },
    components: {
      calendar
    }
  }
</script>

<style lang="less" scoped>
  .taskDataEchart-wrapper {

  }
</style>
