<template>
  <div class="bill-wrapper">
    <div class="personInfo">
      <div class="info">
        <img :src="info.img" alt="" class="avatar">
        <div class="name">
          {{ user.name }}
        </div>
        <div class="level">
          <img :src="info.levelIcon" alt="" class="i">
          <span>
            {{ info.levelText }}
          </span>
        </div>
      </div>
      <div class="data">
        <div class="label">
          {{ info.balanceLabel }}
        </div>
        <div class="balance">
          {{ user.balance }}
        </div>
        <div class="btn" @click="$router.push('/upTop')">
          {{ info.btn }}
        </div>
      </div>
    </div>

    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="item,index in table.navList"
              :key="index">
          {{ item.text }}
        </span>
      </div>
      <div class="remind">
        <span v-show="table.navListActiveIndex == 0" class="t">
          <span class="it">
            <span class="label">
              {{ remind.payLabel }}：
            </span>
            <span class="val">
              {{ remind.payVal }}
            </span>
          </span>
          <span class="it">
            <span class="label">
              {{ remind.gainLabel }}：
            </span>
            <span class="val">
              {{ remind.gainVal }}
            </span>
          </span>
        </span>
        <span v-show="table.navListActiveIndex == 1" class="t">
          <span class="it">
            <span class="label">
              {{ remind.consumptionLabel }}：
            </span>
            <span class="val">
              {{ remind.consumptionVal }}
            </span>
          </span>
        </span>
      </div>
      <div class="tableList">
        <!--充值中心-->
        <div ref="rechargeTable"
             class="rechargeTable"
             v-show="table.navListActiveIndex == 0">
          <!--充值中心表格-->
          <recharge-centre />
        </div>
        <!--消费记录-->
        <div ref="consumptionTable"
             class="consumptionTable"
             v-show="table.navListActiveIndex == 1">
          <!--消费记录表格-->
          <consumption />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import rechargeCentre from '@/components/bill/recharge-centre.vue'
  import consumption from '@/components/bill/consumption.vue'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'bill',
    data(){
      return {
        info: {
          img: require('@/icons/n.png'),
          name: 'Terry Brewer',
          levelIcon: require('@/icons/vipIcon2.png'),
          levelText: '铂金会员',
          balanceLabel: '账户余额(金币)：',
          balanceVal: '256.872',
          btn: '立即充值'
        },
        remind: {
          payLabel: '累计支付金额',
          payVal: '126.520',
          gainLabel: '累计到账金币',
          gainVal: '300.000',
          consumptionLabel: '累计消费金币',
          consumptionVal: '300.000'
        },
        table: {
          navListActiveIndex: 0,
          navList: [
            {
              text: '充值记录'
            },
            {
              text: '消费记录'
            }
          ]
        }
      }
    },
    mounted() {
      setTimeout(() => {
        // 筛选图标
        let t = [...document.getElementsByClassName('el-icon-arrow-down')]
        t.forEach(curr => {
          let i = document.createElement('I'),
            ii = document.createElement('I')
          i.classList.add('iconfont')
          i.classList.add('iconshaixuan')
          ii.classList.add('iconfont')
          ii.classList.add('iconshaixuan1')
          curr.appendChild(i)
          curr.appendChild(ii)
        })
        // 排序图标
        let q = [...document.getElementsByClassName('ascending')]
        q.forEach(curr => {
          let i = document.createElement('I')
          i.classList.add('el-icon-arrow-up')
          i.classList.add('k')
          curr.appendChild(i)
        })
        let w = [...document.getElementsByClassName('descending')]
        w.forEach(curr => {
          let i = document.createElement('I')
          i.classList.add('el-icon-arrow-up')
          i.classList.add('k')
          curr.appendChild(i)
        })
      },0)
    },
    components: {
      rechargeCentre,
      consumption
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less" scoped>
  .bill-wrapper {
    overflow: hidden;
    .personInfo {
      margin: 20px 50px;
      width: 600px;
      height: 191px;
      background-image: linear-gradient(-90deg, rgba(10,98,241,0) 0%, rgba(10,98,241,0.5) 95%, rgba(10,98,241,1) 100%);
      display: flex;
      align-items: center;
      justify-content: space-around;
      .info {
        width: 100px;
        .avatar {
          margin-bottom: 10px;
        }
        .name {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
        }
        .level {
          margin-top: 5px;
          .i {
            width: 12px;
            margin-right: 3px;
          }
          span {
            font-size: 11px;
            font-weight: 400;
            color: rgba(229, 199, 138, 0.7);
          }
        }
      }
      .data {
        .label {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 4px;
        }
        .balance {
          font-size: 28px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 40px;
          margin-bottom: 24px;
        }
        .btn {
          width: 116px;
          height: 32px;
          background: rgba(0, 97, 255, 1);
          box-shadow: 0px 1px 10px 0px rgba(22,29,37,0.2);
          text-align: center;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 32px;
          cursor: pointer;
        }
      }
    }
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
      .remind {
        position: absolute;
        top: 0px;
        right: 0px;
        .t {
          .it {
            font-size: 13px;
            font-weight: 400;
            color: rgba(229, 199, 138, 0.79);
            margin-right: 30px;
            line-height: 36px;
          }
        }
      }
      .tableList {
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;

      }
    }
  }
</style>
