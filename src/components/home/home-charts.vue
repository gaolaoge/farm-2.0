<template>
  <div class="home-charts-wrapper">
    <div ref="ec" class="ec"></div>
  </div>
</template>

<script>
  export default {
    name: 'home-charts',
    data(){
      return {

      }
    },
    mounted() {
      let ec = this.$echarts.init(this.$refs.ec)

      ec.setOption({
        title: {
          x: 'right',
          y: -10,
          subtext: '任务数/个',
          textStyle: {
            color: 'rgba(255,255,255,0.49)',
            fontSize: 12,
          }
        },
        tooltip: {

        },
        grid: {
          top:  30,
          bottom: 18,
          left: 25,
          right: 15
        },
        xAxis: {
          type: 'category',
          data: ['01.23', '01.24', '01.25', '01.26', '01.27', '01.28', '01.29'],
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: 'rgba(255,255,255,0.49)',
              fontSize: 12,
            }
          },
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 60,
          interval: 30,
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.49)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.14)'
            }
          },
        },
        series: [{
          data: [22, 31, 32, 24, 42, 53, 47],
          type: 'line',
          symbol: 'emptyCircle',
          smooth: true,
          itemStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(35, 96, 190, 1)'
              },
              {
                offset: 1,
                color: 'rgba(82, 206, 229, 1)'
              }
            ])
          },
          areaStyle:{
            normal:{
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(80,141,255,0.39)'
                },
                {
                  offset: .5,
                  color: 'rgba(56,155,255,0.25)'
                },
                {
                  offset: 1,
                  color: 'rgba(38,197,254,0.00)'
                }
              ])

            }
          },
        }],
        tooltip: {
          // trigger: 'item',
          // backgroundColor: 'rgba(0,0,0,0.7)',
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .home-charts-wrapper {
    .ec {
      width: 100%;
      height: 160px;
    }
  }
</style>
