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
            <el-option label="全部" value="-1"/>
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
          <modelCalendar style="display: inline-block;" @changeSelectDate="changeFilterDate" />
        </div>
        <!--查询-->
        <div class="filter-btn primary" @click="getList">
          {{ filter.iquireBtn }}
        </div>
        <!--重置-->
        <div class="filter-btn" @click="reset">
          {{ filter.resetBtn }}
        </div>
        <!--导出记录-->
        <div class="filter-btn r" @click="exportTable">
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
          width="160" />
        <!--场景名-->
        <el-table-column
          prop="scenesName"
          label="场景名"
          show-overflow-tooltip
          min-width="200" />
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
        <!--<el-table-column-->
          <!--prop="time"-->
          <!--label="渲染时长"-->
          <!--show-overflow-tooltip-->
          <!--width="160" />-->
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
        <!--费用（金币）-->
        <el-table-column
          prop="pay"
          label="费用（金币）"
          show-overflow-tooltip
          width="120" />
        <!--实付金币-->
        <!--<el-table-column-->
          <!--prop="actualPay"-->
          <!--label="实付金币"-->
          <!--show-overflow-tooltip-->
          <!--width="120" />-->
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
        :current-page.sync="table.currentPage"
        :total="table.outPutTableTotal">
      </el-pagination>
    </div>

    <!--详情-->
    <el-dialog :visible.sync="dialogVisible"
               width="80vw"
               :show-close=false >
      <more-dialog @closeDialog="closeDialog"
                   width="80vw"
                   :dialogTableType="dialogTableType"
                   :renderDialogTableData="renderDialogTableData"
                   :downloadDialogTableData="downloadDialogTableData" />
    </el-dialog>
  </div>
</template>

<script>
  import modelCalendar from '@/components/farm-model/farm-calendar'
  import moreDialog from '@/components/bill/more-dialog'
  import {
    getConsumptionTable,
    getConsumptionSelectList,
    exportConsumptionTable,
    consumptionSeeMore,
    upTopSeeMore
  } from '@/api/api'
  import {
    createCalendar,
    getDate,
    exportDownloadFun
  } from '@/assets/common.js'

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
          ],
          outPutTableTotal: 82,
          pageSize: 10,
          currentPage: 1,
          selectionList: [],            //渲染输出选中项
        },
        filter: {
          taskIdLabel: '查询ID',
          taskIdVal: '',
          scenesLabel: '场景名',
          scenesVal: '',
          projectLabel: '所属项目',
          projectVal: '-1',
          projectList: [],
          inquireLabel: '查询时间',
          inquireValS: 0,
          inquireValV: new Date(),
          iquireBtn: '查询',
          resetBtn: '重置',
          exportBtn: '导出记录'
        },
        dialogVisible: false,
        dialogTableType: '',
        renderDialogTableData: [],
        downloadDialogTableData: []
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
        this.dialogTableType = item.type
        let uuId = item.id

        if(item.type == '渲染消费'){
          consumptionSeeMore(uuId)
            .then(data => {

              this.renderDialogTableData = data.data.data
              this.dialogVisible = true

            })
        }
        if(item.type == '下载消费'){
          upTopSeeMore(uuId)
            .then(data => {

              this.downloadDialogTableData = data.data.data
              this.dialogVisible = true

            })
        }
      },
      // 获取 table 数据
      getList() {
        let t = `pageSize=${this.table.pageSize}&pageIndex=${this.table.currentPage}&layerNo=${this.filter.taskIdVal}&layerName=${this.filter.scenesVal}&projectUuid=${this.filter.projectVal}&beginTime=${this.filter.inquireValS == 0 ? 0 : this.filter.inquireValS.getTime()}&endTime=${this.filter.inquireValV.getTime()}`
        getConsumptionTable(t)
          .then(data => {
            this.table.rechargeData = data.data.data.map(curr => {
              let tableStatus = ''
              switch(curr.layerTaskStatus){
                case 1:
                  tableStatus = '等待'
                  break
                case 2:
                  tableStatus = '渲染中'
                  break
                case 3:
                  tableStatus = '渲染结束'
                  break
                case 4:
                  tableStatus = '渲染暂停'
                  break
                case 6:
                  tableStatus = '渲染放弃'
                  break

              }
              let tableType = ''
              switch(curr.patternOfConsumption){
                case 1:
                  tableType = '渲染消费'
                  break
                case 2:
                  tableType = '下载消费'
                  break
              }
              let {year, month, day, hour, minutes, seconds} = createCalendar(new Date(curr.updateTime))
              return {
                id: curr.layerTaskUuid,               //任务ID
                scenesName: curr.layerName,           //场景名
                status: tableStatus,                  //状态
                statusDefault: curr.layerTaskStatus,
                object: curr.projectName,             //所属项目
                // time: '',                          //渲染时长
                total: curr.totalFrame,               //总帧数
                type: tableType,                      //消费类型
                typeDefault: curr.patternOfConsumption,
                pay: curr.totalCost,                  //费用（金币）
                // actualPay: '',                     //实付金币
                user: curr.account,                   //创建人
                upDate: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,              //更新时间
                dateDefault: curr.updateTime,         //时间戳记录
              }
            })
            this.table.outPutTableTotal = data.data.total
          })
      },
      // 时间筛选条件修改
      changeFilterDate(val){
        [].forEach.call(val, (curr,index) => {
          let [year, month, day] = curr.split('-'),
            r = getDate(year, month, day)
          if(index == 0){
            this.filter.inquireValS = r
          }else{
            this.filter.inquireValV = r
          }
        })
      },
      // 重置
      reset(){
        Object.assign(this.filter,{
          taskIdVal: '',
          scenesVal: '',
          projectVal: '-1',
          inquireValS: 0,
          inquireValV: new Date(),
        })
        this.getList()
      },
      // 导出记录
      exportTable(){
        let t = `layerNo=${this.filter.taskIdVal}&layerName=${this.filter.scenesVal}&projectUuid=${this.filter.projectVal}&beginTime=${this.filter.inquireValS == 0 ? 0 : this.filter.inquireValS.getTime()}&endTime=${this.filter.inquireValV.getTime()}`
        exportConsumptionTable(t)
          .then(data => {
            // 导出下载
            exportDownloadFun(data, '消费记录','xlsx')
          })
      },
      //关闭消费详情
      closeDialog(){
        this.dialogVisible = false
      }
    },
    mounted() {
      this.getList()
      getConsumptionSelectList()
        .then(data => {
          this.filter.projectList = data.data.data.map(curr => {
            return {
              value: curr.taskProjectUuid,
              label: curr.projectName
            }
          })
        })
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
