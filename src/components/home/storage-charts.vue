<template>
  <div class="home-charts-wrapper">
    {{ cDate }}
    <div ref="ec" class="ec"></div>
  </div>
</template>

<script>
  export default {
    name: 'home-charts',
    data(){
      return {
        ec: null
      }
    },
    props: {
      cData: {
        type: Array
      },
      cDate: {
        type: Array
      }
    },
    mounted() {
      this.init()
    },
    computed: {
      maxNum(){
        let m = Math.max.apply(null, this.cData)
        if(m == 0){ return 2 }
        else{ return m % 2 == 1 ? m + 1 : m }
      }
    },
    methods: {
      init(){
        this.ec = this.$echarts.init(this.$refs.ec)
        this.ec.setOption({
          title: {
            text: '75.0',
            textStyle: {
              color: '#fff',
              fontSize: 22
            },
            subtext: '资产总容量',
            subtextStyle: {
              color: '#909090',
            },
            itemGap: -10, // 主副标题距离
            left: 'center',
            top: '44'
          },
//          legend: {
//            orient : 'vertical',
//          },
          angleAxis: {
            max: 100, // 满分
            clockwise: true, // 逆时针
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          radiusAxis: {
            type: 'category',
            // 隐藏刻度线
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            }
          },
          polar: {
            center: ['50%', '50%'],
            radius: '128%' //图形大小
          },
          series: [
            { // 灰色环
              type: 'bar',
              data: [
                {
                  value: 100,
                  itemStyle: {
                    color: 'RGBA(43, 50, 57, 1)',
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 5,
                    shadowOffsetY: 2
                  }
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 10,
              barGap: '-0', // 两环重叠
              z: 4
            },
            { // 内环
              type: 'bar',
              data: [
                {
                  value: 70,
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 1,
                        color: 'rgba(79, 65, 249, 1)'
                      }, {
                        offset: 0,
                        color: 'rgba(56, 195, 254, 1)'
                      }])
                    }
                  },
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barW1idth: 14,
              barGap: '-0', // 两环重叠
              z: 1,
            },
            { // 外环
              type: 'bar',
              data: [
                {
                  value: 70,
                  itemStyle: {
                    normal: {
                      color: new this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                        offset: 1,
                        color: 'rgba(79, 65, 249, 0.2)'
                      }, {
                        offset: 0,
                        color: 'rgba(56, 195, 254, 0.2)'
                      }])
                    }
                  },
                }
              ],
              coordinateSystem: 'polar',
              roundCap: true,
              barWidth: 14,
              barGap: '0', // 两环重叠
              z: 3,
            },
          ]
        })
      }
    },
    watch: {
      cData(val){
        this.init()
      },
      cDate(val){
        this.init()
        window.addEventListener("resize", this.ec.resize);
      }
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
