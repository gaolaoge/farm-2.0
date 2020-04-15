<template>
  <div class="recharge-centre">
    <!--table-->
    <div class="recharge-table" ref="rechargeTable">

      <!--条件筛选-->
      <div class="filter">
        <!--交易状态-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.tradingtatusLabel }}：
          </span>
          <el-select v-model="filter.tradingtatusVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select filter-item-select-mini">
            <el-option
              v-for="item in filter.tradingtatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--支付方式-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.paymentMethodLabel }}：
          </span>
          <el-select v-model="filter.paymentMethodVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select filter-item-select-mini">
            <el-option
              v-for="item in filter.paymentMethodList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--开票标识-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.markLabel }}：
          </span>
          <el-select v-model="filter.markVal"
                     placeholder="-"
                     class="filter-item-i filter-item-select filter-item-select-mini">
            <el-option
              v-for="item in filter.markList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--支付账单-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.singleNumberLabel }}：
          </span>
          <input type="text"
                 class="filter-item-i filter-item-input"
                 placeholder="请输入"
                 v-model="filter.singleNumberVal">
        </div>
        <!--查询时间-->
        <div class="filter-item">
          <span class="filter-item-label">
            {{ filter.inquireLabel }}：
          </span>
          <model-calendar style="display: inline-block;" @changeSelectDate="changeFilterDate" />
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
        class="o"
        :border=true
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          show-overflow-tooltip
          min-width="58"
          width="58" />
        <!--交易ID-->
        <el-table-column
          prop="id"
          label="交易ID"
          sortable
          show-overflow-tooltip
          min-width="180" />
        <!--交易状态-->
        <el-table-column
          prop="state"
          label="交易状态"
          sortable
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <!--实际支付金额（元）-->
        <el-table-column
          prop="realPay"
          label="实际支付金额（元）"
          show-overflow-tooltip
          width="200" />
        <!--充值到账（金币）-->
        <el-table-column
          prop="realArrive"
          label="充值到账（金币）"
          sortable
          show-overflow-tooltip
          width="200" />
        <!--充值说明 -->
        <el-table-column
          prop="directions"
          label="充值说明"
          show-overflow-tooltip
          width="200" />
        <!--充值方式-->
        <el-table-column
          prop="paymentMethod"
          label="充值方式"
          show-overflow-tooltip
          width="120" />
        <!--支付单号-->
        <el-table-column
          prop="singleNumber"
          label="支付单号"
          show-overflow-tooltip
          width="180" />
        <!--交易时间-->
        <el-table-column
          prop="date"
          label="交易时间"
          show-overflow-tooltip
          width="180" />
        <!--操作-->
        <el-table-column
          label="操作"
          show-overflow-tooltip
          width="200">
          <template slot-scope="scope">
            <div class="download-tab" @click="operateFun(scope.row)" v-show="scope.row.operate != '-'">
              {{ scope.row.operate }}
            </div>
            <div class="download-tab-none" v-show="scope.row.operate == '-'">
              -
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
        @current-change="jump"
        :current-page.sync="table.currentPage"
        :total="table.outPutTableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import modelCalendar from '@/components/farm-model/farm-calendar'
  import {
    createCalendar,
    getDate,
    exportDownloadFun
  } from '@/assets/common.js'
  import {
    getUpTopTable,
    exportUpTopTable,
    downloadReceipt
  } from '@/api/api'

  export default {
    name: 'recharge-centre',
    data(){
      return {
        table: {
          rechargeData: [
            // {
            //   id: '',               //交易ID
            //   state: '',            //交易状态
            //   realPay: '',          //实际支付金额（元）
            //   realArrive: '',       //充值到账（金币）
            //   directions: '',       //充值说明
            //   paymentMethod: '',    //充值方式
            //   singleNumber: '',     //支付单号
            //   date: '',             //交易时间
            //   operate: ''           //操作
            // },
          ],
          outPutTableTotal: 82,
          currentPage: 1,
          pageSize: 10,
          selectionList: [],            //渲染输出选中项
        },
        filter: {
          tradingtatusLabel: '交易状态',
          tradingtatusVal: '-1',
          tradingtatusList: [
            {
              label: '全部',
              value: '-1'
            },
            {
              label: '待付款',
              value: '3'
            },
            {
              label: '成功',
              value: '1'
            },
            {
              label: '失败',
              value: '2'
            }
          ],
          paymentMethodLabel: '支付方式',
          paymentMethodVal: '-1',
          paymentMethodList: [
            {
              label: '全部',
              value: '-1'
            },
            {
              label: '支付宝',
              value: '1'
            },
            // {
            //   label: '微信',
            //   value: '2'
            // }
          ],
          markLabel: '开票标识',
          markVal: '-1',
          markList: [
            {
              label: '全部',
              value: '-1'
            },
            {
              label: '不可开票',
              value: '0'
            },
            {
              label: '未开票',
              value: '1'
            },
            {
              label: '已开票',
              value: '2'
            }
          ],
          singleNumberLabel: '支付单号',
          singleNumberVal: '',
          inquireLabel: '查询时间',
          inquireValS: 0,
          inquireValV: new Date(),
          iquireBtn: '查询',
          resetBtn: '重置',
          exportBtn: '导出记录'
        }
      }
    },
    components: {
      modelCalendar
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
      // 时间筛选条件修改
      changeFilterDate(val){
        [].forEach.call(val, (curr,index) => {
          let [year, month, day] = curr.split('-'),
              r = getDate(year, month, day)
          console.log(curr.split('-'))
          if(index == 0){
            this.filter.inquireValS = r
          }else{
            this.filter.inquireValV = r
          }
        })
      },
      // 获取table数据
      getList(){
        let t = `paymentStatus=${this.filter.tradingtatusVal}&paymentTitle=${this.filter.paymentMethodVal}&invoice=${this.filter.markVal}&outTradeNo=${this.filter.singleNumberVal}&beginTime=${this.filter.inquireValS == 0 ? 0 : this.filter.inquireValS.getTime()}&endTime=${this.filter.inquireValV.getTime()}&sortColumn=1&sortBy=1&pageIndex=${this.table.currentPage}&pageSize=${Number(this.table.pageSize)}`
        getUpTopTable(t)
          .then(data => {
            this.table.outPutTableTotal = data.data.total
            this.table.rechargeData = data.data.data.map(curr => {
              curr.operate = '-'
              switch(curr.paymentStatus){
                case 1:
                  curr.paymentStatus = '成功'
                  if(curr.actualPayment) curr.operate = '下载收据'
                  break
                case 2:
                  curr.paymentStatus = '失败'
                  break
                case 3:
                  curr.paymentStatus = '待付款'
                  if(curr.actualPayment) curr.operate = '待付款'
                  break
              }
              if(!curr.actualPayment) curr.actualPayment = '-'
              let {year, month, day, hour, minutes, seconds} = createCalendar(new Date(curr.updateTime)),
                t = `${year}-${month + 1 > 9 ? month + 1 : '0' + ( month + 1 )}-${day > 9 ? day : '0' + day} ${hour > 9 ? hour : '0' + hour}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
              return {
                  id: curr.rechargeUuid,                //交易ID
                  state: curr.paymentStatus,            //交易状态
                  realPay: curr.actualPayment,          //实际支付金额（元）
                  realArrive: curr.arrivalAmount,       //充值到账（金币）
                  directions: curr.rechargeExplain,     //充值说明
                  paymentMethod: curr.paymentTitle == '1' ? '支付宝' : '微信',     //充值方式
                  singleNumber: curr.outTradeNo,        //支付单号
                  date: t,                //交易时间
                  dateDefault: curr.updateTime,
                  invoice: curr.invoice,                //开票标识
                  operate: curr.operate                 //操作
              }
            })
          })
      },
      // table 筛选条件重置
      reset(){
        Object.assign(this.filter,{
          tradingtatusVal: '-1',
          paymentMethodVal: '-1',
          markVal: '-1',
          singleNumberVal: '',
          inquireValS: 0,
          inquireValV: new Date(),
        })
        this.getList()
      },
      // 翻页
      jump(val){
        this.table.currentPage = val
        this.getList()
      },
      // 导出记录
      exportTable(){
        let t = `paymentStatus=${this.filter.tradingtatusVal}&paymentTitle=${this.filter.paymentMethodVal}&invoice=${this.filter.markVal}&outTradeNo=${this.filter.singleNumberVal}&beginTime=${this.filter.inquireValS == 0 ? 0 : this.filter.inquireValS.getTime()}&endTime=${this.filter.inquireValV.getTime()}&sortColumn=1&sortBy=1&pageIndex=${this.table.currentPage}&pageSize=${Number(this.table.pageSize)}`
        exportUpTopTable(t)
          .then(data => {
            // 导出下载
            exportDownloadFun(data, '充值记录','xlsx')
          })
      },
      // 操作
      operateFun(item){
        let u = {
          outTradeNo: item.singleNumber,
          updateTime: item.dateDefault,
          actualPayment: item.realPay,
          paymentTitle: item.paymentMethod == '支付宝' ? '1' : '2',
          account: JSON.parse(sessionStorage.getItem('info'))['account']
        }
        let t =`outTradeNo=${u['outTradeNo']}&updateTime=${u['updateTime']}&actualPayment=${u['actualPayment']}&paymentTitle=${u['paymentTitle']}&account=${u['account']}`
        if(item.operate == "下载收据"){
          var a = document.createElement('a')
          a.href = `http://192.168.1.184/file/farmReceipt?${t}`
          a.setAttribute("id", "export")
          document.body.append(a)
          a.click()
          document.getElementById("export").remove()
        }
      }
    },
    mounted() {
      this.getList()
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
  .download-tab {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0,97,255,1);
    text-decoration: underline;
    cursor: pointer;
  }
  .download-tab-none {
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255 0.6);
  }
</style>
