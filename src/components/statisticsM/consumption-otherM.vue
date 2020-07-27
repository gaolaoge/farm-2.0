<template>
  <div class="consumption-wrapper echartsM">
    <div class="header">
      <div class="c">
        <!--名称-->
        <span class="name fc">{{ $t('statistics_mainM.consumption.name') }}</span>
        <!--新增任务数统计-->
        <span class="navLi fc"
              :class="[{'active': navIndex == 0}]">{{ $t('statistics_mainM.consumption.navLi_one') }}</span>
        <!--累计任务数统计-->
        <span class="navLi fc"
              :class="[{'active': navIndex == 1}]">{{ $t('statistics_mainM.consumption.navLi_two') }}</span>
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
        <el-select v-model="value1" placeholder="请选择">
          <el-option
            v-for="item in options"
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
        value1: '选项1',
        startDate: '',
        endDate: '',
        fullBtn: true
      }
    },
    watch: {
      startDate() {
        this.$emit('monitorVal', [this.startDate, this.endDate, 'taskData'])
      },
      endDate() {
        this.$emit('monitorVal', [this.startDate, this.endDate, 'taskData'])
      }
      //   cData(val) {
      //     this.init()
      //   },
      //   cDate(val) {
      //     this.init()
      //     window.addEventListener("resize", this.ec.resize);
      //   }
    },
    mounted() {
      this.init()
      window.addEventListener('resize', this.ec.resize)
      this.$refs.selectDateM.setDateInterval(this.dateInterval)
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
          series: [
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,         // 是否平滑曲线显示
              symbol: 'circle',     // 标记的样式
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: 'rgba(255, 191, 0, 1)'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(255, 191, 0, 0.2)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 191, 0, 0)'
                  }
                ])
              },
              data: [
                ['2020-01-01', 12],
                ['2020-01-02', 53],
                ['2020-01-03', 12],
                ['2020-01-04', 52],
                ['2020-01-05', 12],
                ['2020-01-06', 22],
                ['2020-01-07', 12],
              ]
            },
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: 'rgba(27, 83, 244, 0.9)'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(0, 75, 206, 0.6)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(162, 203, 255, 0.2)'
                  }
                ])
              },
              data: [
                ['2020-01-01', 52],
                ['2020-01-02', 15],
                ['2020-01-03', 12],
                ['2020-01-04', 72],
                ['2020-01-05', 32],
                ['2020-01-06', 22],
                ['2020-01-07', 12],
              ]
            }
          ]
        })
      },
      // 日期选择模块选择结果
      changeSelectDate([startDate, endDate]) {
        this.startDate = startDate
        this.endDate = endDate
      },
      // 全屏
      f(){
        this.$emit('fullScreen', 'showTaskData')
        setTimeout(this.ec.resize, 120)
        this.fullBtn = false
      },
      // 取消全屏
      e(){
        this.$emit('miniScreen')
        setTimeout(this.ec.resize, 120)
        this.fullBtn = true
      }
    },
    components: {
      calendar
    }
  }
</script>

<style lang="less" scoped>
  .consumption-wrapper {

  }
</style>
