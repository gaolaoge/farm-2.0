<template>
  <div class="upTop" ref="upTopDom">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == navListActiveIndex}]"
              v-for="item,index in form.navList"
              :key="index">
          {{ item.text }}
        </span>
      </div>
      <!--充值-->
      <div class="tableList">
        <div class="farm-form">
          <!--金币余额-->
          <div class="farm-form-item">
            <div class="farm-form-item-label">
              {{ form.balanceLabel }}:
            </div>
            <div class="farm-form-item-val">
              <span class="text">
                {{ user.balance }}
              </span>
            </div>
          </div>
          <!--充值金额-->
          <div class="farm-form-item">
            <div class="farm-form-item-label">
              {{ form.upTopLabel }}:
            </div>
            <div class="farm-form-item-val">
              <div class="g">
                <div class="up-top-item"
                     :class="[{'active': form.ChineseYuan == item.ChineseYuan}]"
                     v-for="item,index in form.list"
                     :key="index"
                     @click="form.ChineseYuan = item.ChineseYuan">
                  <div class="gold">
                    <span class="unit">
                      ￥
                    </span>
                      <span class="num">
                      {{ item.ChineseYuan }}
                    </span>
                  </div>
                  <div class="t">
                    <span class="remark">
                      {{ item.remark }}
                    </span>
                    <img src="@/icons/item-selected.png" alt="" class="v" v-show="form.ChineseYuan == item.ChineseYuan">
                  </div>
                </div>
              </div>
              <input type="text" class="farm-form-item-input in" placeholder="其他金额" v-model="form.ChineseYuan">
            </div>
          </div>
          <!--充值到账金币-->
          <div class="farm-form-item">
            <div class="farm-form-item-label">
              {{ form.realLabel }}:
            </div>
            <div class="farm-form-item-val">
              <span class="text">
                {{ form.realVal }}
              </span>
            </div>
          </div>
          <!--充值方式-->
          <div class="farm-form-item">
            <div class="farm-form-item-label">
              {{ form.modeLabel }}:
            </div>
            <div class="farm-form-item-val">
              <div class="pay-base"
                   @click="payMethods = 'zfb'"
                   :class="[{'active': payMethods == 'zfb'}]">
                <img src="@/icons/zfb-pay.png" alt="">
                <img src="@/icons/nike.png"
                     alt=""
                     class="nike"
                     v-show="payMethods == 'zfb'">
              </div>
              <div class="pay-base"
                   @click="payMethods = 'wx'"
                   :class="[{'active': payMethods == 'wx'}]">
                <img src="@/icons/wx-pay.png" alt="">
                <img src="@/icons/nike.png"
                     alt=""
                     class="nike"
                     v-show="payMethods == 'wx'">
              </div>
            </div>
          </div>
          <!--btn-->
          <div class="farm-form-item">
            <div class="farm-form-item-label">
            </div>
            <div class="farm-form-item-val">
              <div class="btn" @click="payFun">
                {{ btn.upTopNow }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--充值说明-->
      <div class="tableList">
        <div class="farm-form">
          <div class="farm-form-item">
            <div class="farm-form-item-label">
              {{ form.directions }}:
            </div>
            <div class="farm-form-item-val">
              <ol class="ll">
                <li v-for="item,index in form.directionsList" :key="index" class="l">
                  {{ item.r }}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--充值-->
    <el-dialog :visible.sync="rechargeIframe">
      <div ref="dom"></div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    ALiPay,
    computeGold,
    upTopDefault
  } from '@/api/api'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'upTop',
    data(){
      return {
        navListActiveIndex: 0,
        form: {
          navList: [
            {
              text: '充值'
            }
          ],
          balanceLabel: '金币余额',
          balanceVal: '210.137',
          upTopLabel: '充值金额',
          upTopVal: '',
          realLabel: '充值到账金币',
          realVal: '200.000',
          modeLabel: '充值方式',
          modeVal: '',
          listActive: 0,
          list: [
            {
              ChineseYuan: '100',
              remark: '充值100元到账200金币\n' + '资产总容量扩充至60G',
              gold: 200
            },
            {
              ChineseYuan: '200',
              remark: '充值200元到账500金币\n' + '资产总容量扩充至60G',
              gold: 500
            },
            {
              ChineseYuan: '500',
              remark: '充值500元到账1500金币\n' + '资产总容量扩充至70G',
              gold: 1500
            }
          ],
          directions: '充值说明',
          directionsList: [
            {
              r: '充值金额将以金币的形式发送到充值账户，只能按照实际充值金额开具发票，赠送金币不开具发票'
            },
            {
              r: '充值后不支持退款。'
            },
            {
              r: '充值其他问题，请联系客服：13176527028'
            }
          ],
          ChineseYuan: 100
        },
        payMethods: 'zfb',
        btn: {
          upTopNow: '立即充值'
        },
        rechargeIframe: false
      }
    },
    watch: {
      'form.ChineseYuan': function(val){
        if(val == 100){
          this.form.realVal = '200.000'
          return false
        }
        if(val == 200){
          this.form.realVal = '500.000'
          return false
        }
        if(val == 500){
          this.form.realVal = '1500.000'
          return false
        }
        this.computeFun()
      },
      '$route': function(val){
        console.log(val)
      }
    },
    methods: {
      // 计算金币
      async computeFun(){
        if(!this.form.ChineseYuan) return false
        let data = await computeGold(this.form.ChineseYuan)
        this.form.realVal = data.data.data.toFixed(3)
      },
      // 立即充值
      payFun(){
        if(this.payMethods == 'zfb') this.aLiPayFun()
        if(this.payMethods == 'wx') this.wxPayFun()
      },
      // 支付宝充值
      async aLiPayFun(){
        let data = await ALiPay(this.form.ChineseYuan)
        sessionStorage.setItem('aliPay',data.data.data)
        let routerData = this.$router.resolve({name: 'rechargePage'})
        window.open(routerData.href,'_blank')
      },
      // 微信充值
      wxPayFun(){

      }
    },
    computed: {
      ...mapState(['user'])
    },
    mounted() {
      if(/\?/.test(this.$route.fullPath))
        upTopDefault(this.$route.fullPath.split('?')[1])
    }
  }
</script>

<style lang="less" scoped>
  .upTop {
    overflow: hidden;
    .tableGroup {
      position: relative;
      margin: 20px 50px;
      .navList {
        position: relative;
        .navBtn {
          display: inline-block;
          font-size:16px;
          color:rgba(255,255,255,0.6);
          padding: 10px 30px;
          cursor: pointer;
          &.active {
            background-color: rgba(22, 29, 37, 1);
            border-radius: 8px 8px 0px 0px;
            font-weight:600;
            color:rgba(255, 255, 255, 0.9);
          }
        }
      }
      .tableList {
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;
        padding: 30px;
        margin-bottom: 20px;
        .g {
          display: flex;
          .up-top-item {
            position: relative;
            width: 260px;
            height: 174px;
            background: rgba(28,36,47,1);
            border-radius: 8px;
            margin-right: 30px;
            overflow: hidden;
            user-select: none;
            cursor: pointer;
            .gold {
              width: 260px;
              height: 100px;
              background: rgba(32, 41, 53, 1);
              .unit {
                display: inline-block;
                font-size: 16px;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.6);
                margin-left: 20px;
                margin-right: 5px;
              }
              .num {
                display: inline-block;
                margin-top: 11px;
                font-size: 60px;
                font-weight: 600;
                line-height: 84px;
                color: rgba(255, 255, 255, 1);
              }
            }
            .t {
              .remark {
                display: inline-block;
                padding: 15px 20px;
                width: 150px;
                font-size: 13px;
                font-weight: 400;
                color: rgba(255, 255, 255, 0.6);
                line-height: 22px;
              }
            }
            .v {
              position: absolute;
              width: 30px;
              bottom: 22px;
              right: 15px;
            }
            &.active {
              background-color: RGBA(13, 69, 160, 1);
              .gold {
                background-color: RGBA(7, 79, 207, 1);
              }
            }
          }
        }
        .in {
          width:460px;
          margin-top: 30px;
        }
        .pay-base {
          position: relative;
          width: 215px;
          height: 71px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.46);
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin-right: 30px;
          cursor: pointer;
          .nike {
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 42px;
          }
          &.active {
            border: 1px solid rgba(0, 97, 255, 0.46);
          }
        }
        .btn {
          margin-top: 10px;
          cursor: pointer;
          display: inline-block;
          background-color: rgba(0, 97, 255, 1);
          box-shadow: 0px 1px 10px 0px rgba(22, 29, 37, 0.2);
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          padding: 6px 30px;
          line-height: 20px;
          &:hover {
            background-color: rgba(53, 130, 254, 1);
          }
        }
        .ll {
          padding-left: 16px;
          .l {
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.6);
            line-height: 24px;
          }
        }
        &:nth-last-of-type(1) {
          margin-bottom: 0px;
          border-radius: 8px;
        }
      }
    }
  }
</style>
