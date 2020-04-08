<template>
  <div class="more-dialog">
    <header class="header">
      <img src="@/icons/shutDialogIcon.png"
           alt=""
           @click="closeDialogFun"
           class="closeBtn">
    </header>
    <section>
      <div class="label-table">
        <span class="label">
          {{ dialogTit }}
        </span>
      </div>
      <div class="tableList">
        <!--下载消费详情-->
        <div class="table-box" v-show="showTable == 'downloadTable'">
          <el-table
            :data="downloadTableData"
            class="o"
            :border=true
            style="width: 100%">

            <!--帧数-->
            <el-table-column
              prop="framesNum"
              label="帧数"
              sortable
              show-overflow-tooltip />
            <!--已下载次数-->
            <el-table-column
              prop="downloadNum"
              label="已下载次数"
              sortable
              show-overflow-tooltip />
            <!--费用（金币）-->
            <el-table-column
              prop="cost"
              label="费用（金币）"
              sortable
              show-overflow-tooltip />
            <!--大小-->
            <el-table-column
              prop="size"
              label="大小"
              show-overflow-tooltip />
            <!--单价（金币/核对）-->
            <el-table-column
              prop="price"
              label="单价（金币/核对）"
              sortable
              show-overflow-tooltip />
            <!--下载完成时间 -->
            <el-table-column
              prop="date"
              label="下载完成时间"
              show-overflow-tooltip />

          </el-table>
        </div>
        <!--渲染消费详情-->
        <div class="table-box" v-show="showTable == 'expendTable'">
          <el-table
            :data="expendTableData"
            class="o"
            :border=true
            style="width: 100%">

            <!--帧数-->
            <el-table-column
              prop="num"
              label="帧数"
              sortable
              show-overflow-tooltip />
            <!--渲染费用（金币）-->
            <el-table-column
              prop="gold"
              label="渲染费用（金币）"
              sortable
              show-overflow-tooltip />
            <!--渲染时长-->
            <el-table-column
              prop="duration"
              label="渲染时长"
              show-overflow-tooltip />
            <!--渲染开始时间-->
            <el-table-column
              prop="startDate"
              label="渲染开始时间"
              sortable
              show-overflow-tooltip
              width="192" />
            <!--渲染结束时间 -->
            <el-table-column
              prop="endDate"
              label="渲染结束时间"
              show-overflow-tooltip
              width="192" />
            <!--单价（金币/核对）-->
            <el-table-column
              prop="price"
              label="单价（金币/核对）"
              show-overflow-tooltip />
            <!--CPU利用率-->
            <el-table-column
              prop="percent"
              label="CPU利用率"
              show-overflow-tooltip />
            <!--内存峰值-->
            <el-table-column
              prop="peak"
              label="内存峰值"
              show-overflow-tooltip />

          </el-table>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'more-dialog',
    data(){
      return {
        dialogTit: '消费详情',
        showTable: 'expendTable',
        // 下载消费详情
        downloadTableData: [
          // {
          //   framesNum: null,       //帧数
          //   downloadNum: null,     //已下载次数
          //   cost: null,            //费用（金币）
          //   size: null,            //大小
          //   price: null,           //单价（金币/核对）
          //   date: ''               //下载完成时间
          // },
          {
            framesNum: 1,
            downloadNum: 3,
            cost: 10.234,
            size: '12.54G',
            price: 1.362,
            date: '2020-01-01 04:23:44'
          },
        ],
        // 渲染消费详情
        expendTableData: [
          // {
          //   num: null,        //帧数
          //   gold: null,      // 渲染费用（金币）
          //   duration: null,  // 渲染时长
          //   startDate: '',   // 渲染开始时间
          //   endDate: '',     // 渲染结束时间
          //   price: null,     // 单价（金币/核对）
          //   percent: '',     // CPU利用率
          //   peak: ''         // 内存峰值
          // },
          {
            num: 1,
            gold: 1.362,
            duration: '1分32秒',
            startDate: '2020-03-11 06:55:41',
            endDate: '2020-05-01 05:22:21',
            price: 5.326,
            percent: '23%',
            peak: '26G'
          },
        ],

      }
    },
    methods: {
      // 关闭
      closeDialogFun(){

      }
    }
  }
</script>

<style lang="less" scoped>
  .more-dialog {
    position: relative;
    .header {
      position: absolute;
      width: 100%;
      .closeBtn {
        float: right;
        width:18px;
        height:18px;
        cursor: pointer;
        opacity:0.6;
      }
    }
    section {
      .label-table {
        position: relative;
        .label {
          display: inline-block;
          font-size:16px;
          color:rgba(255,255,255,0.6);
          padding: 10px 30px;
          cursor: pointer;
          background-color: rgba(22, 29, 37, 1);
          border-radius: 8px 8px 0px 0px;
          font-weight:600;
          color:rgba(255, 255, 255, 0.9);
        }
      }
      .tableList {
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;
      }
    }
  }
</style>
