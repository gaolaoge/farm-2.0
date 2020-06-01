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
            bottom: 20,
            left: 25,
            right: 15
          },
          xAxis: {
            type: 'category',
            data: this.cDate,
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
            max: this.maxNum,
            interval: Math.ceil(this.maxNum / 2),
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
            data: this.cData,
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
