<template>
  <div class="consumption-wrapper">
    <!--table-->
    <div class="recharge-table" ref="rechargeTable">

      <!--条件筛选-->
      <div class="filter">
        <!--任务ID-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.taskIdLabel }}：
          </span>
          <input type="text"
                 class="filter-item-i filter-item-input"
                 placeholder="请输入"
                 v-model="filter.taskIdVal">
        </div>
        <!--场景名-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.scenesLabel }}：
          </span>
          <input type="text"
                 class="filter-item-i t"
                 v-model="filter.scenesVal">
        </div>
        <!--所属项目-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.projectLabel }}：
          </span>
          <el-select v-model="filter.projectVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select">
            <el-option
              v-for="item in filter.projectList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--查询时间-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.inquireLabel }}：
          </span>
          <modelCalendar :val="filter.inquireVal" style="display: inline-block;" />
        </div>

        <div class="filter-btn primary">
          {{ filter.iquireBtn }}
        </div>
        <div class="filter-btn">
          {{ filter.resetBtn }}
        </div>
        <!--导出记录-->
        <div class="filter-btn r">
          {{ filter.exportBtn }}
        </div>
      </div>

      <!--table-->
      <el-table
        :data="table.rechargeData"
        @selection-change="handleSelectionChange"
        @filter-change="filterHandler"
        class="k"
        :border=true
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          show-overflow-tooltip
          min-width="58"
          width="58" />
        <!--任务ID-->
        <el-table-column
          prop="id"
          label="任务ID"
          sortable
          show-overflow-tooltip
          min-width="160" />
        <!--场景名-->
        <el-table-column
          prop="scenesName"
          label="场景名"
          show-overflow-tooltip
          width="200" />
        <!--状态-->
        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip
          width="120" />
        <!--所属项目-->
        <el-table-column
          prop="object"
          label="所属项目"
          show-overflow-tooltip
          width="146" />
        <!--渲染时长 -->
        <el-table-column
          prop="time"
          label="渲染时长"
          show-overflow-tooltip
          width="160" />
        <!--总帧数-->
        <el-table-column
          prop="total"
          label="总帧数"
          show-overflow-tooltip
          width="100" />
        <!--消费类型-->
        <el-table-column
          prop="type"
          label="消费类型"
          show-overflow-tooltip
          width="120" />
        <!--应付金币-->
        <el-table-column
          prop="shouldPay"
          label="应付金币"
          show-overflow-tooltip
          width="120" />
        <!--实付金币-->
        <el-table-column
          prop="actualPay"
          label="实付金币"
          show-overflow-tooltip
          width="120" />
        <!--创建人-->
        <el-table-column
          prop="user"
          label="创建人"
          show-overflow-tooltip
          width="140" />
        <!--更新时间-->
        <el-table-column
          prop="upDate"
          label="更新时间"
          show-overflow-tooltip
          width="200" />
        <!--查看-->
        <el-table-column
          label="操作"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <div class="operateBtn" @click="seeMore(scope.row)">
              查看
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="table.outPutTableTotal">
      </el-pagination>
    </div>

    <!--详情-->
    <el-dialog :visible.sync="dialogVisible"
               width="80vw"
               :show-close=false >
      <more-dialog />
    </el-dialog>
  </div>
</template>

<script>
  import modelCalendar from '@/components/farm-model/farm-calendar'
  import moreDialog from '@/components/bill/more-dialog'

  export default {
    name: 'consumption',
    data(){
      return {
        table: {
          rechargeData: [
            // {
            //   id: '',               //任务ID
            //   scenesName: '',       //场景名
            //   status: '',           //状态
            //   object: '',           //所属项目
            //   time: '',             //渲染时长
            //   total: '',            //总帧数
            //   type: '',             //消费类型
            //   shouldPay: '',        //应付金币
            //   actualPay: '',        //实付金币
            //   user: '',             //创建人
            //   upDate: '',           //更新时间
            // },
            {
              id: '1001',
              scenesName: '场景一.ma',
              status: '渲染完成',
              object: '项目一',
              time: '48分53秒',
              total: '48',
              type: '下载消费',
              shouldPay: '0.20',
              actualPay: '0.20',
              user: 'Admin',
              upDate: '2020-01-01 23:11:52',
            },

          ],
          outPutTableTotal: 82,
          selectionList: [],            //渲染输出选中项
        },
        filter: {
          taskIdLabel: '查询ID',
          taskIdVal: '',
          scenesLabel: '场景名',
          scenesVal: '',
          projectLabel: '所属项目',
          projectVal: '',
          inquireLabel: '查询时间',
          inquireVal: '',
          projectList: [],
          iquireBtn: '查询',
          resetBtn: '重置',
          exportBtn: '导出记录'
        },
        dialogVisible: false
      }
    },
    components: {
      modelCalendar,
      moreDialog
    },
    methods: {
      // 充值中心多选
      handleSelectionChange(val){
        this.table.selectionList = val
      },
      //筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },
      seeMore(item){
        // console.log(item)
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .page {
    position: absolute;
    bottom: 30px;
    left: 25px;
  }
  /deep/.el-table__body-wrapper {
    height: calc(100vh - 491px);
  }

  .recharge-table {
    overflow: hidden;
    .filter {
      position: relative;
      height: 50px;
      background: rgba(33, 41, 51, 0.59);
      border-radius: 4px;
      margin: 20px 10px 0px;
      width: calc(100% - 20px);
      padding: 0px 20px;
      box-sizing: border-box;
      .t {
        width: 200px;
      }
      .r {
        position: absolute;
        right: 0px;
      }
    }
  }
  .operateBtn {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,97,255,1);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
