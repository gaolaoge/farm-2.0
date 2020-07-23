<template>
  <div class="statisticsM-wrapper" :class="[{'fullItem': fullItem}]">
    <!--任务数据统计-->
    <taskData ref="taskData" @monitorVal="monitorVal" @fullScreen="fullScreen" @miniScreen="miniScreen"
              v-show="screen.showTaskData"/>
    <!--帧数统计-->
    <numberOfFrames ref="numOfFrames" v-show="screen.showNumOfFrames"/>
    <!--消费统计-->
    <consumption ref="consumption" v-show="screen.showConsumption"/>
    <!--任务状态统计-->
    <taskStatus ref="taskStatus" v-show="screen.showTaskStatus"/>
  </div>
</template>

<script>
  import taskData from '@/components/statisticsM/taskData-otherM'
  import numberOfFrames from '@/components/statisticsM/numberOfFrames-otherM'
  import consumption from '@/components/statisticsM/consumption-otherM'
  import taskStatus from '@/components/statisticsM/taskStatus-otherM'
  import {
    createCalendar
  } from '@/assets/common.js'
  import {
    getQueryConditions
  } from '@/api/statistics-api.js'

  export default {
    name: 'statisticsM-wrapper',
    data() {
      return {
        fullItem: false,
        screen: {
          showTaskData: true,
          showNumOfFrames: true,
          showConsumption: true,
          showTaskStatus: true
        },
      }
    },
    methods: {
      // 通过日期选择器修改区间 监听结果是否匹配下拉框选项
      monitorVal([s, e, dom]) {
        let {year, month, day} = createCalendar(new Date()),
          t = `${year}-${month}-${day}`
        if (t != e) this.$refs[dom].dateInterval = 'customize'
        let num = 1000 * 60 * 60 * 24
        let {year: y, month: m, day: d} = createCalendar(new Date(new Date().getTime() - 6 * num))
        let {year: y2, month: m2, day: d2} = createCalendar(new Date(new Date().getTime() - 29 * num))
        if (s == `${y}-${m}-${d}`) this.$refs[dom].dateInterval = 'nearlySevenDays'
        if (s == `${y2}-${m2}-${d2}`) this.$refs[dom].dateInterval = 'nearlyThirtyDays'
      },
      // 全屏
      fullScreen(selectScreen) {
        this.fullItem = true
        for (let i in this.screen) {
          if (i == selectScreen) this.screen[i] = true
          else this.screen[i] = false
        }
      },
      // 取消全屏
      miniScreen(){
        this.fullItem = false
        for (let i in this.screen) if (!this.screen[i]) this.screen[i] = true
      }
    },
    mounted() {
      // 获取图表条件历史记录
      getQueryConditions()
        .then(data => {
          console.log(data)
        })
    },
    components: {
      taskData,
      numberOfFrames,
      consumption,
      taskStatus
    }
  }
</script>

// echarts公共样式
<style lang="less">
  .statisticsM-wrapper {
    .echartsM {
      background-color: rgba(255, 255, 255, 1);
      width: calc(50% - 10px);
      height: calc(50% - 10px);
      border-radius: 14px;
      /*overflow: hidden;*/
      display: flex;
      flex-direction: column;
      transition: all 0.1s;

      .header {
        height: 35px;
        box-shadow: 0px 1px 0px rgba(22, 29, 37, 0.3);
        display: flex;
        justify-content: space-between;

        .c {
          display: flex;
        }

        .name {
          width: 100px;
          height: 36px;
          color: rgba(255, 255, 255, 1);
          background-color: rgba(27, 83, 244, 1);
          font-size: 14px;
          user-select: none;
        }

        .navLi {
          position: relative;
          margin-left: 30px;
          width: 98px;
          cursor: pointer;
          user-select: none;
          color: rgba(22, 29, 37, 0.6);
          font-size: 14px;

          &.active {
            color: rgba(22, 29, 37, 1);

            &::after {
              position: absolute;
              bottom: -2px;
              left: 0px;
              content: '';
              width: 98px;
              height: 1px;
              background-color: rgba(27, 83, 244, 1);
              box-shadow: 0px 0px 1px 1px rgba(27, 83, 244, 0.6);
            }
          }
        }

        .date {
          position: relative;
          padding: 0px 17px;
          color: rgba(22, 29, 37, 0.6);
          font-size: 12px;
          user-select: none;


        }

        .bigger {
          position: relative;
          padding: 0px 17px;
          cursor: pointer;
          height: 100%;
        }

        .select {
          position: relative;
          width: 90px;

          /deep/ .el-input__inner {
            border: 0px;
          }
        }

        .fc {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .bl {
          &::before {
            position: absolute;
            top: 12px;
            left: 0px;
            content: '';
            width: 2px;
            height: 12px;
            background-color: rgba(22, 29, 37, 0.15);
          }
        }

        .filter .filter-item .filter-item-i {
          border: 1px solid rgba(0, 0, 0, 0);
          margin-right: 0px;
          cursor: pointer;
        }
      }

      section {
        position: relative;
        flex-shrink: 1;
        flex-grow: 1;
        height: 1px;

        .selectData {
          position: absolute;
          z-index: 9;
          width: 100%;

          /deep/ .el-select {
            padding: 10px 15px;

            .el-input__inner {
              height: 25px;
              width: 120px;
              background: rgba(248, 248, 248, 1);
              border-radius: 2px;
              border: 1px solid rgba(22, 29, 37, 0.1);
            }

            .el-input__suffix {
              display: flex;
              align-items: center;

              .el-input__suffix-inner {

              }
            }
          }
        }

        .ec {
          height: 100%;
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .statisticsM-wrapper {
    width: 100%;
    padding: 0px 50px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;

    &.fullItem {
      .echartsM {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
