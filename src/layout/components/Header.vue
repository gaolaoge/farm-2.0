<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <div class="workbench">
        <!--<span class="workBench-label">-->
          <!--{{ workBenchName }}-->
        <!--</span>-->
        <el-select v-model="workBenchVal" class="workBench-optionBase">
          <el-option
            v-for="item,index in workBenchList"
            :key="index"
            :label="item.name"
            :value="item.val">
          </el-option>
        </el-select>
        <img src="@/icons/questionMark.png" alt="" class="workBench-icon">
      </div>
      <div class="r">
        <!--<div class="recharge">-->
          <!--<span class="t">-->
            <!--{{ recharge.info }}-->
          <!--</span>-->
            <!--<span class="rechargeBtn">-->
            <!--{{ recharge.btn }}-->
          <!--</span>-->
        <!--</div>-->
        <!--<div class="news" @click="showNews = !showNews">-->
          <!--<img src="@/icons/news.png" alt="">-->
        <!--</div>-->
        <div class="problem">
          <img src="@/icons/problem.png" alt="">
        </div>
        <div class="userInfo" :class="[{'active': showUserList}]">
        <!--<span class="name">-->
          <!--{{user.name}}-->
        <!--</span>-->
          <img :src="user.imgUrlMini"
               alt=""
               class="userImg"
               @click="showUserList = !showUserList">
          <div class="newsBase" :class="[{'show': showUserList}]">
            <ul class="userOperate" v-show="showUserList">
              <li v-for="item,index in userOperateList"
                  :key="index"
                  class="operateLi"
                  @click="routerPush(item.routerUrl)"
                  :class="[{
                    'userName': item.moreClass == 'userName',
                    'balance': item.moreClass == 'balance',
                    'data': item.moreClass == 'data',
                    'quit': item.moreClass == 'quit'
                  }]">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ item.text }}
                     </span>
                      <img :src="item.iconUrl" alt="" v-if="item.iconUrl" class="iconUrl">
                      <span class="balanceNow" v-if="item.balanceIcon" :title="item.balance">
                        <span class="unit">
                          {{ item.balanceIcon }}
                        </span>
                        <span class="amount">
                          {{ item.balance }}
                        </span>
                      </span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  import {
    homeSelect,
  } from '@/api/api.js'

  export default {
    name: 'headerM',
    data(){
      return {
        recharge: {
          info: '您当前余额不足，可能导致渲染失败，请尽快充值！',
          btn: '充值'
        },
        workBenchList: [
          // {
          //   name: '影视版CPU 1区',
          //   val: '影视版CPU 1区'
          // }
        ],
        // workBenchName: '当前工作台',
        workBenchVal: '',
        // showNews: false                      //展示消息
        showUserList: false,                  //个人信息下拉
        userOperateList: [
          {
            text: '',
            moreClass: 'userName',
            iconUrl: require('@/icons/vipIcon.png')
          },
          {
            text: '充值',
            moreClass: 'balance',
            balance: 0,
            balanceIcon: '￥',
            routerUrl: '/upTop'
          },
          // {
          //   text: '消费账单',
          // },
          // {
          //   text: '充值记录',
          // },
          // {
          //   text: '导出清单',
          // },
          // {
          //   text: '渲染扣费规则',
          // },
          // {
          //   text: '基本资料',
          //   moreClass: 'data'
          // },
          {
            text: '退出',
            moreClass: 'quit'
          }
        ]
      }
    },
    computed: {
      ...mapState(['user','login']),
    },
    mounted() {
      this.getList()
    },
    watch: {
      login: {
        handler: function(val){
          if(val) return false
          this.getList()
          this.userOperateList[0]['text'] = JSON.parse(sessionStorage.getItem('info'))['account']
          this.userOperateList[1]['balance'] = JSON.parse(sessionStorage.getItem('info'))['balance']
        },
        // immediate: true
      },
    },
    methods: {
      routerPush(url){
        if(url == '/upTop')
          this.$router.push('/upTop')
      },
      // 工作台 下拉框
      getList(){
        homeSelect()
          .then(data => {
            let d= data.data
            if(d.code == 200){
              d.data.forEach(curr => {
                this.workBenchList.push({
                  name: curr.zoneName,
                  val: curr.zoneUuid
                })
              })
              this.workBenchVal = this.workBenchList[0]['val']
              this.$store.commit('changeZoneId', this.workBenchList[0]['val'])
            }
          })
          .catch(error => {
            console.log('...........')
            console.log(error)
            // 没有授权
            if(error.code == 401){
              this.$message.error('授权失效，需要重新登录')
              sessionStorage.setItem('token','')
              this.$router.push('/login')
            }
          })
      },
    }
  }
</script>

<style scoped lang="less">
  .header-wrapper {
    position: relative;
    z-index: 2;
    height:80px;
    width: calc(100vw - 175px);
    min-width: 1625px;
    background:rgba(33,41,51,1);
    box-shadow:0px 2px 20px 0px rgba(33,41,51,1);
    .wrapper {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0px 50px;
      box-sizing: border-box;
      justify-content: space-between;
      .r {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .userInfo {
          position: relative;
          width: 70px;
          height: 80px;
          box-sizing: border-box;
          .userImg {
            margin: 26px auto;
            display: block!important;
            cursor: pointer;
          }
          .newsBase {
            position: absolute;
            right: 0px;
            width:137px;
            height:0px;
            background:rgba(33,41,51,1);
            box-shadow:0px 2px 20px 0px rgba(28,36,47,1);
            transition: height 0.2s ease-out;
            .userOperate {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding-left: 20px;
              box-sizing: border-box;
              .operateLi {
                list-style: none;
                width: 100%;
                text-align: left;
                cursor: pointer;
                padding: 8px 0px;
                .con {
                  .t {
                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,0.59);
                  }
                }
                &.userName {
                  padding: 15px 0px;
                  .con {
                    .t {
                      font-size:14px;
                      font-weight:500;
                      color:rgba(255,255,255,1);
                      line-height:20px;

                      .iconUrl {
                        vertical-align: middle;
                        margin-left: 4px;
                      }
                    }
                  }
                }
                &.balance {
                  padding: 8px 0px;
                  .con {
                    .t {
                      .sb {
                        vertical-align: text-top;
                      }
                      .balanceNow {
                        float: right;
                        width: 82px;
                        text-align: center;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        .unit {
                          font-size: 14px;
                          margin-right: -4px;
                        }
                        .amount {
                          font-family: 'PingFangSCRegular';
                          font-size: 16px;
                          font-weight: 400;
                          color: RGBA(198, 194, 188, 1);
                          text-shadow: 0px 0px 2px RGBA(198, 194, 188, 1);
                        }
                      }
                    }
                  }
                }
                &.data,
                &.quit {
                  padding: 18px 0px;
                  .con {
                    .t {

                    }
                  }
                }
              }
            }
          }
          &.active {
            background:linear-gradient(180deg,rgba(10,98,241,0) 0%,rgba(10,98,241,0.3) 50%,rgba(10,98,241,0.6) 100%);
            .newsBase {
              height:143px;
            }
          }
        }
        .problem,
        .news {
          margin-right: 14px;
          cursor: pointer;
        }
        .recharge {
          margin-right: 81px;
          .t {
            font-size:14px;
            font-weight:500;
            color:rgba(255,255,255,0.59);
            display: inline-block;
            margin-right: 10px;
            user-select: none;
          }
        }
      }
      .workbench {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        width:219px;
        height:40px;
        border-radius:15px;
        border:2px solid rgba(47,55,66,1);
        padding-left: 30px;
        box-sizing: border-box;
        /*.workBench-label {*/
          /*font-size:14px;*/
          /*font-weight:500;*/
          /*color:rgba(74,88,104,1);*/
          /*line-height:20px;*/
          /*user-select: none;*/
        /*}*/
        .workBench-icon {
          cursor: pointer;
        }
        //.workBench-optionBase
      }
      /*.newsBase {*/
        /*position: absolute;*/
        /*top: 80px;*/
        /*right: -282px;*/
        /*width: 282px;*/
        /*height: calc(100vh - 80px);*/
        /*background:rgba(33,41,51,1);*/
        /*box-shadow:0px 2px 20px 0px rgba(28,36,47,1);*/
        /*transition: right 0.2s ease-out;*/
        /*&.show {*/
          /*right: 0px;*/
        /*}*/
      /*}*/

    }
  }
</style>
