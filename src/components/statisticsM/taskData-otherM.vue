<template>
  <div class="taskDataEchart-wrapper echartsM">
    <div class="header">
      <div class="c">
        <!--名称-->
        <span class="name fc">{{ $t('statistics_mainM.taskData.name') }}</span>
        <!--新增任务数统计-->
        <span class="navLi fc" :class="[{'active': navIndex == 0}]">{{ $t('statistics_mainM.taskData.navLi_one') }}</span>
        <!--累计任务数统计-->
        <span class="navLi fc" :class="[{'active': navIndex == 1}]">{{ $t('statistics_mainM.taskData.navLi_two') }}</span>
      </div>
      <div class="c">
        <!--时间区间-->
        <span class="date fc bl">2020-05-29～2020-06-04</span>
        <!--下拉框-->
        <div class="select bl">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--全屏-->
        <span class="bigger fc bl"><img src="@/icons/bigger.png" alt=""></span>
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
      <div class="ec" ref="ec" />
    </section>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        navIndex: 0,
        ec: null,
        options: [
          {
            value: '选项1',
            label: '近7天'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          }
        ],
        value: '选项1',
        value1: '选项1',
      }
    },
    // watch: {
    //   cData(val) {
    //     this.init()
    //   },
    //   cDate(val) {
    //     this.init()
    //     window.addEventListener("resize", this.ec.resize);
    //   }
    // },
    mounted(){
      this.init()
      window.addEventListener('resize', this.ec.resize)
    },
    methods: {
      init(){
        this.ec = this.$echarts.init(this.$refs.ec)
        this.ec.setOption({
          animation: false,
          title: {
            left: 'center',
            text: '触屏 tooltip 和 dataZoom 示例',
            subtext: '"tootip" and "dataZoom" on mobile device',
          },
          legend: {
            top: 'bottom',
            data: ['意向']
          },
          tooltip: {
            triggerOn: 'none',
            position: function (pt) {
              return [pt[0], 130];
            }
          },
          toolbox: {
            left: 'center',
            itemSize: 25,
            top: 55,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {}
            }
          },
          xAxis: {
            type: 'time',
            // boundaryGap: [0, 0],
            axisPointer: {
              value: '2016-10-7',
              snap: true,
              lineStyle: {
                color: '#004E52',
                opacity: 0.5,
                width: 2
              },
              label: {
                show: true,
                formatter: function (params) {
                  return this.$echarts.format.formatTime('yyyy-MM-dd', params.value);
                },
                backgroundColor: '#004E52'
              },
              handle: {
                show: true,
                color: '#004E52'
              }
            },
            splitLine: {
              show: false
            }
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
              inside: true,
              formatter: '{value}\n'
            },
            z: 10
          },
          grid: {
            top: 110,
            left: 15,
            right: 15,
            height: 160
          },
          dataZoom: [{
            type: 'inside',
            throttle: 50
          }],
          series: [
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#8ec6ad'
              },
              stack: 'a',
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#8ec6ad'
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              },
              data: [
                {date: '2020-01-01', data: 12},
                {date: '2020-01-02', data: 12},
                {date: '2020-01-03', data: 12},
                {date: '2020-01-04', data: 22},
                {date: '2020-01-05', data: 12},
                {date: '2020-01-06', data: 12},
                {date: '2020-01-07', data: 12},
                {date: '2020-01-08', data: 12},
              ]
            },
            {
              name: '模拟数据',
              type: 'line',
              smooth: true,
              stack: 'a',
              symbol: 'circle',
              symbolSize: 5,
              sampling: 'average',
              itemStyle: {
                color: '#d68262'
              },
              areaStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#d68262'
                }, {
                  offset: 1,
                  color: '#ffe'
                }])
              },
              data: [
                {date: '2020-01-01', data: 123},
                {date: '2020-01-02', data: 12},
                {date: '2020-01-03', data: 232},
                {date: '2020-01-04', data: 22},
                {date: '2020-01-05', data: 12},
                {date: '2020-01-06', data: 122},
                {date: '2020-01-07', data: 12},
                {date: '2020-01-08', data: 127},
              ]
            }
          ]
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .taskDataEchart-wrapper {

  }
</style>
