<template>
  <div class="systemTable">
    <div class="btnList">
      <div class="btn"
           v-for="(item,index) in btnList"
           @click="changeNav(index)"
           :class="[{'active': index == activeBtnIndex}]"
           :key="index">
        <span>{{ item }}</span>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :show-header=false
        :data="table.tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <!--多选-->
        <el-table-column
          type="selection"
          align="center"
          width="55" />
        <!--消息-->
        <el-table-column
          prop="message"
          label="消息"
          show-overflow-tooltip />
        <!--日期-->
        <el-table-column
          label="日期"
          prop="date"
          width="120" />
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="jump"
        :current-page.sync="table.currentPage"
        :total="table.outPutTableTotal" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'systemTable',
    data(){
      return {
        btnList: ['全部', '未读', '已读'],
        table: {
          tableData: [
            {
              date: '2016-05-03',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-02',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-01',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-08',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-06',
              message: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-07',
              message: '上海市普陀区金沙江路 1518 弄'
            }
          ],
          outPutTableTotal: 82,
          currentPage: 1,
          pageSize: 10,
          selectionList: [],            //渲染输出选中项
        },
        activeBtnIndex: '0'
      }
    },
    methods: {
      //
      changeNav(index){
        this.activeBtnIndex = index
      },
      // 多选
      handleSelectionChange(val){

      }
    }
  }
</script>

<style lang="less" scoped>
  .systemTable {
    overflow: hidden;
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    .btnList {
      padding: 10px 0px;
      .btn {
        display: inline-block;
        width: 68px;
        height: 24px;
        background-color: rgba(248, 248, 248, 1);
        border-radius: 13px;
        text-align: center;
        margin: 0px 15px;
        cursor: pointer;
        span {
          font-size: 14px;
          color: rgba(22, 29, 37, 0.39);
          line-height: 24px;
        }
        &.active {
          background-color: rgba(39, 95, 239, 1);
          span {
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .table {
      flex-grow: 1;
    }
    .page {
      margin: 0px 25px 30px;
    }
  }
  /deep/.el-table__body-wrapper {
    height: calc(100vh - 330px);
  }
  /deep/.el-table__row{
    td:nth-of-type(3) .cell {
      color: rgba(255, 255, 255, 0.5);
      font-size: 10px;
    }
  }
</style>
