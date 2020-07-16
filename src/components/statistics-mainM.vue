<template>
  <div class="statisticsM-wrapper">
    <!--任务数据统计-->
    <taskData/>
    <!--帧数统计-->
    <numberOfFrames/>
    <!--消费统计-->
    <consumption/>
    <!--任务状态统计-->
    <taskStatus/>
  </div>
</template>

<script>
  import taskData from '@/components/statisticsM/taskData-otherM'
  import numberOfFrames from '@/components/statisticsM/numberOfFrames-otherM'
  import consumption from '@/components/statisticsM/consumption-otherM'
  import taskStatus from '@/components/statisticsM/taskStatus-otherM'

  export default {
    name: 'statisticsM-wrapper',
    data() {
      return {}
    },
    methods: {},
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
      overflow: hidden;
      display: flex;
      flex-direction: column;

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
      }
      section {
        position: relative;
        flex-shrink: 1;
        flex-grow: 1;
        height: 1px;
        .selectData {
          position: absolute;
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
  }
</style>
