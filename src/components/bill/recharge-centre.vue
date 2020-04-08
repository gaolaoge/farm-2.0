<template>
  <div class="recharge-centre">
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
          <model-calendar :val="filter.inquireVal" style="display: inline-block;"/>
        </div>
        <!--查询-->
        <div class="filter-btn primary">
          {{ filter.iquireBtn }}
        </div>
        <!--重置-->
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
          width="240">
          <template slot-scope="scope">
            <div class="download-tab" @click="scope.row.operate">
              下载数据
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
  </div>
</template>

<script>
  import modelCalendar from '@/components/farm-model/farm-calendar'

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
            {
              id: '1002748211241',
              state: '成功',
              realPay: '100.00',
              realArrive: '100.00',
              directions: '注册赠送100金币',
              paymentMethod: '支付宝',
              singleNumber: '12988562306532',
              date: '2020-03-02 00:23:46',
              operate: '下载数据'
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
          inquireVal: new Date(),
          projectList: [],
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
    },
    mounted() {

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
</style>
