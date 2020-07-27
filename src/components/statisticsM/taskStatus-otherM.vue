<template>
  <div class="taskStatusEchart-wrapper echartsM">
    <div class="header">
      <div class="c">
        <!--名称-->
        <span class="name fc">{{ $t('statistics_mainM.taskStatus.name') }}</span>
      </div>
      <div class="c filter">
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
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: 20,
            bottom: 20,
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
          },
          series: [

            {
              name: '面积模式',
              type: 'pie',
              radius: [30, 160],
              center: ['50%', '50%'],
              roseType: 'area',
              data: [
                {value: 10, name: 'rose1'},
                {value: 5, name: 'rose2'},
                {value: 15, name: 'rose3'},
                {value: 25, name: 'rose4'},
                {value: 20, name: 'rose5'},
                {value: 35, name: 'rose6'},
                {value: 30, name: 'rose7'},
                {value: 40, name: 'rose8'}
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
  }
</script>

<style lang="less" scoped>
  .taskStatusEchart-wrapper {

  }
</style>
