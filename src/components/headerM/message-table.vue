<template>
  <div class="messageTable">
    <!--模块切换导航-->
    <div class="nav">
      <ul>
        <li v-for="(item,index) in navList"
            :key="index"
            :class="[{'active': navListIndex == index}]"
            @click="changeNavTable(index)">
          <span class="navLi">{{ item }}</span>
        </li>
      </ul>
    </div>
    <!--模块-->
    <div class="moudleList">
      <!--公共模块-btn-->
      <div class="statusBtnList">
        <ul>
          <li v-for="(item,index) in statusList"
              :key="index"
              :class="[{'active': statusIndex == index}]"
              class="statusBtn"
              @click="changeStatusBtn(index)">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
      <!--系统-->
      <div class="item-system" v-show="navListIndex == '0'">
        <span v-show="!systemTableData.length" class="null">{{ null_ }}</span>
        <el-table
          v-show="systemTableData.length"
          :show-header=false
          :data="systemTableData"
          style="width: 100%">
          <!--多选-->
          <el-table-column
            type="selection"
            align="right"
            width="45"/>
          <!--消息-->
          <el-table-column
            prop="message"
            width="250"/>
          <!--时间-->
          <el-table-column
            prop="date"/>
        </el-table>
      </div>
      <!--活动-->
      <div class="item-activity" v-show="navListIndex == '1'">
        <span v-show="!activityTableData.length" class="null">{{ null_ }}</span>
        <el-table
          v-show="activityTableData.length"
          :show-header=false
          :data="activityTableData"
          style="width: 100%">
          <!--多选-->
          <el-table-column
            type="selection"
            align="right"
            width="45"/>
          <!--消息-->
          <el-table-column
            prop="message"
            width="250"/>
          <!--时间-->
          <el-table-column
            prop="date"/>
        </el-table>
      </div>
      <!--公共模块-footer-->
      <div class="footer">
        <el-checkbox v-model="checkboxBtnVal" class="checkbox">{{ checkboxBtn }}</el-checkbox>
        <span class="showMeAll" @click="showMeAll">{{ all }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'messageTable',
    data() {
      return {
        navList: ['系统', '活动'],
        navListIndex: '0',
        statusList: ['全部', '未读', '已读'],
        statusIndex: '0',
        all: '查看所有消息',
        checkboxBtn: '备选项',
        checkboxBtnVal: '',
        systemTableData: [
          {
            date: '2016-05-02',
            message: '任务[1001_场景一]渲染完成，渲染结果将保留20天，请您',
          },
          {
            date: '2016-05-02',
            message: '任务[1001_场景一]渲染完成，渲染结果将保留20天，请您',
          },
          {
            date: '2016-05-02',
            message: '任务[1001_场景一]渲染完成，渲染结果将保留20天，请您',
          },
          {
            date: '2016-05-04',
            message: '王小虎',
          },
          {
            date: '2016-05-01',
            message: '王小虎',
          },
          {
            date: '2016-05-03',
            message: '王小虎',
          }
        ],
        activityTableData: [],
        null_: '空空如也～'
      }
    },
    methods: {
      // 切换Table
      changeNavTable(index) {
        this.navListIndex = index
      },
      // 切换btn
      changeStatusBtn(index) {
        this.statusIndex = index
      },
      showMeAll() {
        this.$router.push('/messageCenter')
      }
    }
  }
</script>

<style lang="less" scoped>
  .messageTable {
    display: flex;
    background-color: rgba(255, 255, 255, 1);

    .nav {
      position: relative;
      z-index: 2;
      width: 80px;
      height: 400px;
      background-color: rgba(241, 244, 249, 1);
      padding: 20px 0px;
      box-sizing: border-box;

      li {
        position: relative;
        margin-bottom: 20px;
        padding-left: 20px;
        cursor: pointer;

        .navLi {
          font-size: 14px;
          color: rgba(22, 29, 37, 0.59);
          line-height: 20px;
        }

        &.active {
          &::before {
            position: absolute;
            left: 0px;
            top: 0px;
            content: '';
            width: 5px;
            height: 20px;
            background-color: rgba(27, 83, 244, 1);
          }

          .navLi {
            font-weight: 600;
            color: rgba(27, 83, 244, 1);
          }
        }
      }
    }

    .moudleList {
      position: relative;
      width: calc(100% - 80px);
      padding: 20px 0px;
      box-sizing: border-box;

      .item-activity,
      .item-system {
        display: flex;
        justify-content: center;
        align-items: center;
        height: calc(100% - 55px);

        .null {
          font-size: 14px;
          font-weight: 400;
          color: rgba(22, 29, 37, 0.4);
          line-height: 20px;
        }
      }

      .statusBtnList {
        padding: 0px 20px;
        box-sizing: border-box;

        .statusBtn {
          display: inline-block;
          width: 60px;
          height: 21px;
          background-color: rgba(248, 248, 248, 1);
          border-radius: 11px;
          text-align: center;
          margin-right: 10px;
          cursor: pointer;

          span {
            font-size: 12px;
            color: rgba(22, 29, 37, 0.4);
            line-height: 21px;
          }

          &.active {
            background-color: rgba(39, 95, 239, 1);

            span {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }

      .footer {
        position: absolute;
        bottom: 0px;
        left: 0px;
        display: flex;
        justify-content: space-between;
        height: 55px;
        width: 100%;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 15px 0px rgba(27, 83, 244, 0.1);
        padding: 20px;
        box-sizing: border-box;

        .showMeAll {
          font-size: 12px;
          color: rgba(22, 29, 37, 1);
          cursor: pointer;
        }
      }
    }
  }

  .checkbox {
    padding-left: 3px;
  }

  /deep/ .el-table__body-wrapper {
    height: 294px;
    overflow-x: hidden;
    margin-top: 10px;
  }

  /deep/ .el-table__body {
    border-spacing: 0px;
  }

  /deep/ .el-table .el-table__row:hover::after {
    display: none;
  }

  /deep/ .el-table .el-table__row {
    background-color: transparent;
  }

  /deep/ .el-table__row {
    td:nth-of-type(1) .cell {
      padding-right: 8px;
    }

    td:nth-of-type(2) .cell {
      padding-left: 2px;
      color: rgba(22, 29, 37, 0.79);
    }

    td:nth-of-type(3) .cell {
      color: rgba(22, 29, 37, 0.6);
      font-size: 10px;
    }
  }

  /deep/ .el-table td,
  /deep/ .el-table th {
    vertical-align: text-top;
  }
</style>
