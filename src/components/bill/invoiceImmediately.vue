<template>
  <div class="invoiceImmediately">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="(item,index) in table.navList"
              :key="index">
          {{ item }}
        </span>
      </div>
      <div class="tableList t setScollBarStyle">
        <!--选择充值记录-->
        <div class="recording item">
          <span class="label">{{ recordingLabel }}：</span>
          <div class="valTable">
            <el-table
              :data="recordingTableData"
              height="260"
              style="width: 100%">

              <el-table-column
                type="selection"
                align="right"
                width="55"/>

              <el-table-column
                prop="id"
                label="交易ID"/>

              <el-table-column
                prop="amount"
                label="实际支付金额（元）"/>

              <el-table-column
                prop="type"
                label="支付方式"/>

              <el-table-column
                prop="singleNumber"
                label="支付单号"/>

              <el-table-column
                prop="date"
                label="支付时间"/>

            </el-table>
          </div>
        </div>
        <!--开票余额-->
        <div class="item">
          <span class="label">{{ blanceLabel }}：</span>
          <span class="val">￥{{ blanceVal }}</span>
        </div>
        <!--发票类型-->
        <div class="item">
          <span class="label">{{ typeLabel }}：</span>
          <el-radio-group v-model="typeVal" class="radio">
            <el-radio :label="typeValList[0]"/>
            <el-radio :label="typeValList[1]"/>
          </el-radio-group>
        </div>
        <!--发票抬头-->
        <div class="item">
          <span class="label">{{ invoiceLabel }}：</span>
          <div class="valTable">
            <el-table
              :data="invoiceTableData"
              height="220"
              style="width: 100%">

              <el-table-column
                type="selection"
                align="right"
                width="55"/>

              <el-table-column
                prop="invoice"
                width="400"
                show-overflow-tooltip
                label="发票抬头"/>

              <el-table-column
                prop="num"
                label="纳税人识别号"/>

              <el-table-column
                prop="email"
                label="邮箱"/>

              <el-table-column
                prop="default"
                width="140"
                label="是否默认"/>

              <el-table-column
                width="360"
                label="操作">
                <template slot-scope="scope">
                  <span class="table-btn">{{ operatingBtn[0] }}</span>
                  <span class="table-btn">{{ operatingBtn[1] }}</span>
                  <span class="table-btn">{{ operatingBtn[2] }}</span>
                </template>
              </el-table-column>

            </el-table>
            <!--按钮添加发票抬头-->
            <div class="addMore" @click="addNewHeader">
              <img src="@/icons/createIcon.png" alt="">
              <span>{{ addMoreBtn }}</span>
            </div>
          </div>
        </div>
        <!--按钮立即开票-->
        <div class="btn"><span>{{ btn }}</span></div>
      </div>
    </div>
    <!--添加发票抬头-->
    <el-dialog
      title="添加发票抬头"
      :visible.sync="dialogData.visible"
      :show-close="false"
      width="426px"
      :before-close="closeDialog">
      <img src="@/icons/shutDialogIcon.png" alt="" class="shutDialogIcon mini">
      <div class="farm-form">
        <div class="farm-form-item" v-for="(item,index) in dialogData.list">
          <label :for="item.id" class="farm-form-label">{{ item.Label }}：</label>
          <input type="text" :id="item.id" class="farm-form-input" v-model="item.Val"
                 :placeholder="item.Placeholder">
        </div>
        <div class="sw">
          <el-switch
            v-model="dialogData.switchVal"
            active-color="RGBA(18, 91, 243, 1)"
            inactive-color="RGBA(200, 202, 203, 1)"/>
          <span class="s" :class="[{'active': dialogData.switchVal}]">{{ dialogData.switchSpan }}</span>
        </div>
      </div>
      <div class="btnList">
        <div class="farm-form-btn cancel" @click="dialogData.visible = false"><span>取消</span></div>
        <div class="farm-form-btn" type="primary" @click="dialogData.visible = false"><span>确定</span></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        table: {
          navListActiveIndex: 0,
          navList: [
            '开票'
          ]
        },
        recordingLabel: '选择充值记录',
        blanceLabel: '开票余额',
        blanceVal: '210.13',
        typeLabel: '开票类型',
        typeVal: '',
        typeValList: ['增值税普票', '增值税专票'],
        invoiceLabel: '开票抬头',
        btn: '立即开票',
        recordingTableData: [
          {
            id: '1002748211241',
            amount: '100.00',
            type: '支付宝',
            singleNumber: '12988562306532',
            date: '2020-03-02 00:23:46'
          }
        ],
        invoiceTableData: [
          {
            invoice: '青岛市哩啦哩科技有限公司青岛市哩啦哩科技有限公司青岛市哩啦哩科技有限公司',
            num: '38726868486246873232',
            email: 'shdsasd@163.com',
            default: '是'
          },
        ],
        operatingBtn: ['设为默认', '编辑', '删除'],
        addMoreBtn: '添加发票抬头',
        dialogData: {
          visible: false,
          list: [
            {
              Label: '发票抬头',
              Val: '',
              Placeholder: '请输入发票抬头',
              id: 'header'
            },
            {
              Label: '纳税人识别号',
              Val: '',
              Placeholder: '请输入纳税人识别号',
              id: 'number'
            },
            {
              Label: '邮箱',
              Val: '',
              Placeholder: '请输入邮箱',
              id: 'email'
            },
            {
              Label: '注册地址',
              Val: '',
              Placeholder: '请输入公司地址',
              id: 'address'
            },
            {
              Label: '注册电话',
              Val: '',
              Placeholder: '请输入公司电话',
              id: 'phone'
            },
            {
              Label: '开户银行',
              Val: '',
              Placeholder: '请输入公司开户行',
              id: 'bank'
            },
            {
              Label: '开户账号',
              Val: '',
              Placeholder: '请输入开户行账号',
              id: 'account'
            }
          ],
          switchSpan: '设为默认',
          switchVal: false
        }
      }
    },
    methods: {
      // 添加发票抬头
      addNewHeader() {
        this.dialogData.visible = true
      },
      // 关闭【添加发票抬头】弹窗
      closeDialog() {

      },
    }
  }
</script>

<style lang="less" scoped>
  .invoiceImmediately {
    width: 100%;

    .t {
      height: calc(100vh - 163px);
      overflow-y: auto;
      padding: 46px 30px;
      box-sizing: border-box;
    }

    .item {
      display: flex;
      margin-bottom: 20px;

      .label {
        width: 112px;
        font-size: 16px;
        color: rgba(22, 29, 37, 0.8);
        margin-right: 10px;
      }

      .val {
        font-size: 20px;
        font-weight: 600;
        color: rgba(22, 29, 37, 0.8);
      }

      .valTable {
        flex-grow: 1;
        width: 1px;
        height: 280px;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid rgba(22, 29, 37, 0.1);
      }

      .radio {
        /deep/ .el-radio {
          line-height: 24px;
        }
      }
    }

    .btn {
      width: 116px;
      height: 32px;
      /*background-color: rgba(53, 130, 254, 1);*/
      background-color: rgba(0, 95, 255, 1);
      box-shadow: 0px 1px 10px 0px rgba(22, 29, 37, 0.2);
      border-radius: 6px;
      text-align: center;
      cursor: pointer;
      margin-left: 122px;
      margin-top: 30px;
      opacity: 0.8;

      span {
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 32px;
      }

      /*&:hover {*/
      /*  background-color: rgba(0, 95, 255, 1);*/
      /*}*/
    }

    .table-btn {
      font-size: 14px;
      color: rgba(0, 97, 255, 1);
      text-decoration: underline;
      margin-right: 30px;
      cursor: pointer;
    }

    .addMore {
      margin-top: 15px;
      cursor: pointer;

      img {
        width: 20px;
      }

      span {
        font-size: 14px;
        color: rgba(10, 98, 241, 1);
        vertical-align: top;
        margin-left: 6px;
      }
    }
  }

  .farm-form {
    .farm-form-item {
      margin-bottom: 10px;

      .farm-form-label {
        display: inline-block;
        width: 100px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(22, 29, 37, 0.8);
        line-height: 36px;
        text-align: right;
      }

      .farm-form-input {
        width: 260px;
        height: 36px;
        border-radius: 6px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        padding-left: 20px;
        box-sizing: border-box;
      }
    }
  }

  .btnList {
    margin-top: 60px;
    display: flex;
    justify-content: flex-end;

    .farm-form-btn {
      width: 76px;
      height: 32px;
      background-color: rgba(27, 83, 244, 1);
      border: 1px solid rgba(27, 83, 244, 1);
      border-radius: 6px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      margin-left: 20px;

      span {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }

      &.cancel {
        border: 1px solid rgba(22, 29, 37, 0.2);
        background-color: rgba(255, 255, 255, 1);

        span {
          color: rgba(22, 29, 37, 0.79);
        }
      }
    }
  }

  /deep/ .el-table th td .cell,
  /deep/ .el-table tr td .cell,
  /deep/ .el-table th th .cell,
  /deep/ .el-table tr th .cell {
    color: rgba(22, 29, 37, 0.6);
  }

  /deep/ .el-radio-group .el-radio .el-radio__label {
    color: rgba(22, 29, 37, 0.8);
  }

  /deep/ .el-dialog {
    .el-dialog__header {
      height: 36px;
      background: rgba(241, 244, 249, 1);
      box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
      border-radius: 8px 8px 0px 0px;

      .el-dialog__title {
        margin-left: 30px;
        line-height: 36px;
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(22, 29, 37, 1);
      }
    }

    .el-dialog__body {
      padding: 30px;
      background-color: rgba(255, 255, 255, 1);

      .shutDialogIcon {
        top: -24px;
      }
    }

    .sw {
      display: flex;
      align-items: center;
      margin-top: 12px;
      margin-left: 100px;

      .s {
        display: inline-block;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(22, 29, 37, 1);
        opacity: 0.6;
        line-height: 20px;
        margin-left: 5px;
        transition: 0.2s;

        &.active {
          opacity: 1;
        }
      }
    }

  }
</style>
