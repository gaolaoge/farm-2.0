<template>
  <div class="header-wrapper">
    <div class="wrapper">
      <div class="workbench">
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
        <!--问号-->
        <div class="problemE"  :class="[{'active': showProblemList}]" v-operating2>
          <img src="@/icons/problem.png"
               alt=""
               class="problemImg"
               @click="showProblemList = !showProblemList">
          <!--下拉框-->
          <div class="newsBase">
            <ul class="userOperate"  v-show="showProblemList">
              <!--渲染指引-->
              <li class="operateLi" @click="guide">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ problemOperateList[0]['text'] }}
                     </span>
                  </span>
                </span>
              </li>
              <!--帮助中心-->
              <li class="operateLi">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ problemOperateList[1]['text'] }}
                     </span>
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!--头像-->
        <div class="userInfo" :class="[{'active': showUserList}]" v-operating>
          <img :src="user.imgUrlMini"
               alt=""
               class="userImg"
               style="width: 28px;"
               @click="showUserList = !showUserList">
          <!--:class="[{'show': showUserList}]"-->
          <!--下拉框-->
          <div class="newsBase" :class="[{'show': showUserList}]">
            <ul class="userOperate" v-show="showUserList">

              <!--帐号-->
              <li class="operateLi userName">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ user.name }}
                     </span>
                      <img :src="userOperateList[0]['iconUrl']" alt="" class="iconUrl">
                  </span>
                </span>
              </li>
              <!--充值-->
              <li class="operateLi balance" @click="$router.push('/upTop')">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ userOperateList[1]['text'] }}
                     </span>
                     <span class="balanceNow" :title="userOperateList[1]['balance']">
                       <span class="unit">
                          {{ userOperateList[1]['balanceIcon'] }}
                       </span>
                       <span class="amount">
                          {{ user.balance }}
                       </span>
                     </span>
                  </span>
                </span>
              </li>
              <!--退出-->
              <li class="operateLi quit" @click="quitFun">
                <span class="con">
                  <span class="t">
                     <span class="sb">
                       {{ userOperateList[2]['text'] }}
                     </span>
                  </span>
                </span>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <!--渲染指引-->
      <div class="guide-wrapper" v-if="guideShow">
        <!--第一步-->
        <div class="guide-step step-one" v-show="guideShowStep == 1">
          <img src="@/icons/step-jump-over.png" alt="" class="jump-btn" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/step-one.png" alt="" class="welcome" @click="guideShowStep = 2">
          </div>
        </div>
        <!--第二步-->
        <div class="guide-step step-two" v-show="guideShowStep == 2">
          <img src="@/icons/step-jump-over.png" alt="" class="jump-btn" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/step-two.png" class="newTesk" alt="">
            <img src="@/assets/step-two2.png" class="newTaskIntroduction" alt="">
            <div class="step-btn">
              <img src="@/icons/step-previous.png" alt="" class="previous first">
              <img src="@/icons/step-next.png" alt="" class="next" @click="guideShowStep = 3">
            </div>
          </div>
        </div>
        <!--第三步-->
        <div class="guide-step step-three" v-show="guideShowStep == 3">
          <img src="@/icons/step-jump-over.png" alt="" class="jump-btn" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/step-three.png" alt="" class="newMode">
            <img src="@/assets/step-three2.png" alt="" class="step-threeDialogue">
            <div class="step-btn">
              <img src="@/icons/step-next.png" alt="" class="previous" style="transform: rotate(180deg)" @click="guideShowStep = 2">
              <img src="@/icons/step-next.png" alt="" class="next" @click="guideShowStep = 4">
            </div>
          </div>
        </div>
        <!--第四步-->
        <div class="guide-step step-four" v-show="guideShowStep == 4">
          <img src="@/icons/step-jump-over.png" alt="" class="jump-btn" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/step-four.png" alt="" class="set">
            <img src="@/assets/step-four2.png" alt="" class="set2">
            <div class="step-btn">
              <img src="@/icons/step-next.png" alt="" class="previous" style="transform: rotate(180deg)" @click="guideShowStep = 3">
              <img src="@/icons/step-next.png" alt="" class="next" @click="guideShowStep = 5">
            </div>
          </div>
        </div>
        <!--第五步-->
        <div class="guide-step step-five" v-show="guideShowStep == 5">
          <img src="@/icons/step-jump-over.png" alt="" class="jump-btn" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/step-five.png" alt="" class="down">
            <img src="@/assets/step-five2.png" alt="" class="down2">
            <div class="step-btn">
              <img src="@/icons/step-next.png" alt="" class="previous" style="transform: rotate(180deg)" @click="guideShowStep = 4">
              <img src="@/icons/step-next.png" alt="" class="next" @click="guideShowStep = 6">
            </div>
          </div>
        </div>
        <!--第六步-->
        <div class="guide-step step-six" v-show="guideShowStep == 6" @click="showGuide">
          <div class="step-content">
            <img src="@/assets/six-main.png" alt="" class="">
            <img src="@/assets/six-top-left.png" alt="" class="tl">
            <img src="@/assets/six-top-right.png" alt="" class="tr">
            <img src="@/assets/six-bottom-left.png" alt="" class="bl">
            <img src="@/assets/six-bottom-right.png" alt="" class="br">
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
    getInfo
  } from '@/api/api.js'
  import {
    setInfo
  } from '@/assets/common'

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
        // showNews: false                      // 展示消息
        showUserList: false,                    // 个人信息下拉
        showProblemList: false,                 // 问题下拉
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
            routerUrl: ''
          },
          {
            text: '退出',
            moreClass: 'quit'
          }
        ],
        problemOperateList: [
          {
            text: '渲染指引'
          },
          {
            text: '帮助中心'
          }
        ],
        guideShow: false,
        guideShowStep: 1
      }
    },
    computed: {
      ...mapState(['user','login']),
    },
    mounted() {
      this.getList()
      this.getUserInfo()
    },
    watch: {
      login: {
        handler: function(val){
          if(val) return false
          this.getList()
          this.userOperateList[0]['text'] = JSON.parse(sessionStorage.getItem('info'))['account']
          this.userOperateList[1]['balance'] = JSON.parse(sessionStorage.getItem('info'))['balance']
          // 新手教程
          setTimeout(() => {
            if(localStorage.getItem(this.user.name) == 'false'){
              this.guide(); localStorage.setItem(this.user.name, true) }
          }, 100)
        },
        // immediate: true
      },
      workBenchVal: {
        handler: function(val){
          this.$store.commit('changeZoneId', val)
          sessionStorage.setItem('zoneUuid',val)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      showGuide(){
        this.guideShow = false
        this.guideShowStep = 1
      },
      // 退出
      quitFun(){
        this.$confirm('确认退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            sessionStorage.setItem('token','')
            this.$router.push('/login')
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })

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
              sessionStorage.setItem('zoneUuid', this.workBenchList[0]['val'])
            }
          })
          .catch(error => console.log(`工作台下拉框获取报错，${error}`))
      },
      async getUserInfo(){
        let data = await getInfo(),
            d = data.data.data
        if(data.data.code != 200) return false
        setInfo(data.data.data)
        this.userOperateList[0]['text'] = d.account
        this.userOperateList[1]['balance'] = d.goldBalance
      },
      // 渲染指引
      guide(){
        this.guideShow = true
      }
    },
    directives: {
      operating: {
        bind(el,bindings,vnode){
          let handler = e => {
            if(el.contains(e.target)){
              // 点击事件触发在目标DOM内
            }else {
              // 点击事件触发在目标DOM外
              // 且DOM处于显示状态
              if(vnode.context.showUserList){
                vnode.context.showUserList = false
              }
            }
          }
          el.handler = handler
          document.addEventListener('click',handler)
        },
        unbind(el){
          document.removeEventListener('click',el.handler)
        }
      },
      operating2: {
        bind(el,bindings,vnode){
          let handler = e => {
            if(el.contains(e.target)){
              // 点击事件触发在目标DOM内
            }else {
              // 点击事件触发在目标DOM外
              // 且DOM处于显示状态
              if(vnode.context.showProblemList){
                vnode.context.showProblemList = false
              }
            }
          }
          el.handler = handler
          document.addEventListener('click',handler)
        },
        unbind(el){
          document.removeEventListener('click',el.handler)
        }
      }
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
        .userInfo,
        .problemE {
          position: relative;
          .newsBase {
            position: absolute;
            z-index: 9;
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
              padding-left: 0px;
              box-sizing: border-box;
              .operateLi {
                padding-left: 20px;
                list-style: none;
                width: 117px;
                text-align: left;
                cursor: pointer;
                line-height: 50px;
                /*padding: 8px 0px;*/
                border-bottom: 1px solid rgba(28, 36, 47, 1);
                height: 50px;
                .con {
                  .t {
                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,0.59);
                  }
                }
                &.userName {
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
                  .con {
                    .t {
                      .sb {}
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
                          vertical-align: text-bottom;
                        }
                        .amount {
                          font-size: 16px;
                          font-weight: 400;
                          color: rgba(229, 199, 138, 1);
                          text-shadow: 0px 0px 2px RGBA(198, 194, 188, 1);
                          width: 60px;
                          display: inline-block;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        }
                      }
                    }
                  }
                }
                &.quit {
                  .con {
                    .t {

                    }
                  }
                }
              }
            }
            li:hover {
              background: rgba(0, 97, 255, 0.2);
            }
          }
        }
        .userInfo {
          width: 70px;
          height: 80px;
          box-sizing: border-box;
          .userImg {
            margin: 26px auto;
            display: block!important;
            cursor: pointer;
          }
          &.active {
            background:linear-gradient(180deg,rgba(10,98,241,0) 0%,rgba(10,98,241,0.3) 50%,rgba(10,98,241,0.6) 100%);
            .newsBase {
              height: 153px;
            }
          }
        }
        .problemE {
          right: 40px;
          .problemImg {
            cursor: pointer;
            user-select: none;
          }
          .newsBase {
            top: 50px;
          }
          &.active {
            .newsBase {
              height: 103px;
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
        /*padding-left: 30px;*/
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
        /deep/.el-input__inner {
          padding-left: 30px;
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
      .guide-wrapper {
        position: fixed;
        z-index: 999;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(28, 36, 47, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        .guide-step {
          position: relative;
          width: 100%;
          max-width: 1920px;
          height: 100%;
          max-height: 1080px;
          img {
            user-select: none;
          }
          .step-content {
            height: 100%;
            width: 100%;
            /*border: 1px solid ;*/
            .welcome {
              display: block;
              max-width: 74%;
              margin: 160px auto;
            }
            .newTesk {
              margin: 140px 0px 0px 200px;
            }
            .newTaskIntroduction {
              vertical-align: top;
              margin: 220px 0px 0px 60px;
            }
            .newMode {
              display: block;
              max-width: 74%;
              margin: 90px auto;
            }
            .step-threeDialogue {
              position: absolute;
              top: 400px;
              left: 760px;
            }
            .set {
              position: absolute;
              right: 10px;
            }
            .set2 {
              position: absolute;
              right: 890px;
              top: 590px;
            }
            .down {
              position: absolute;
              right: 10px;
            }
            .down2 {
              position: absolute;
              left: 430px;
              top: 440px;
            }
            .step-btn {
              display: inline-block;
              vertical-align: top;
              img {
                cursor: pointer;
                &.first {
                  cursor: auto;
                }
                &:nth-of-type(1) {
                  margin-right: 30px;
                }
              }
            }
          }
          .jump-btn {  // 跳过
            position: absolute;
            z-index: 2;
            top: 40px;
            right: 40px;
            cursor: pointer;
          }
          .tl {
            position: absolute;
            top: 0px;
            left: 0px;
          }
          .tr {
            position: absolute;
            top: 0px;
            right: 0px;
          }
          .bl {
            position: absolute;
            bottom: 0px;
            left: 0px;
          }
          .br {
            position: absolute;
            bottom: 0px;
            right: 0px;
          }
          &.step-two {
            .step-btn {
              margin: 340px 0px 0px -200px;
            }
          }
          &.step-three {
            .step-btn {
              position: absolute;
              top: 500px;
              left: 1000px;
            }
          }
          &.step-four {
            .step-btn {
              position: absolute;
              top: 700px;
              right: 980px;
            }
          }
          &.step-five {
            .step-btn {
              position: absolute;
              top: 550px;
              left: 550px;
            }
          }
          &.step-six {
            cursor: pointer;
          }
        }
      }
    }

  }
</style>
