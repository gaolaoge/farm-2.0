<template>
  <div class="home-wrapper" ref="homeWrapper">
    <div class="firRow">
      <div class="taskStatus">
        <header class="label">
          {{ taskStatus.label }}
        </header>
        <div class="statusList">
          <div class="item" v-for="item,index in taskStatus.list" :key="index">
            <div class="cir">
              <span class="n">
                {{ item.num }}
              </span>
            </div>
            <span class="name">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
      <div class="statistics">
        <header class="label">
          {{ statistics.label }}
        </header>
        <section class="s">
          <div class="sw" v-for="item,index in statistics.list" :key="index">
            <div class="f">
              <img :src="item.iconImg" alt="">
              <span class="n">
              {{ item.num }}
            </span>
            </div>
            <span class="d">
              {{ item.text }}
            </span>
          </div>
        </section>
      </div>
    </div>
    <div class="secRow">
      <!--新建任务-->
      <div class="addBtn" @click="createTaskFun">
        <img src="@/icons/addIcon-black.png" alt="" class="im">
        <span class="te">
          {{ addBtn.t }}
        </span>
      </div>
      <!--echarts-->
      <div class="pastWeek">
        <header class="label">
          {{ pastWeek.label }}
        </header>
        <HomeCharts class="HomeCharts" :cData="chartsData" :cDate="chartsDate"/>
      </div>
      <!--会员中心-->
      <div class="vip">
        <header class="label">
          {{ vip.label }}
        </header>
        <div class="s">
          <img src="@/assets/userImg.png" alt="">
          <div class="t">
            <!--帐号-->
            <p class="name">
              {{ user.name }}
            </p>
            <!--等级-->
            <p class="grade">
              <img src="@/icons/vipIcon.png" alt="">
              <span class="gradeT">
                {{ vip.grade }}
              </span>
            </p>
          </div>
        </div>
        <div class="q">
          <img src="@/icons/warnIcon.png" alt="">
          <span class="y">
            {{ vip.te }}
          </span>
          <span class="y">
            {{ vip.unit }}
          </span>
          <span class="vipBalance" :title="user.balance">
            {{ user.balance }}
          </span>
        </div>
      </div>
      <!--立即充值-->
      <div class="Recharge">
        <img src="@/assets/ad.png" alt="" class="ad">
        <div class="t">
          <span class="desc">
            {{ Recharge.desc }}
          </span>
          <span class="tit">
            {{ Recharge.tit }}
          </span>
          <span class="l">
            {{ Recharge.l }}
          </span>
          <span class="btn" @click="$router.push('/upTop')">
            {{ Recharge.btn }}
          </span>
        </div>
      </div>
    </div>
    <div class="thiRow">
      <div class="upLoad" ref="dragWindow">
        <!--标签-->
        <p class="label">
          {{ upLoad.label }}
          <br>
          <span class="mini-label">
            {{ upLoad.miniLabel }}
          </span>
        </p>
      </div>
    </div>
    <el-dialog :visible.sync="showNewTask"
               :show-close=false
               top="8vh"
               width="1100px">
      <newTask @closeDialogFun="closeDialogFun" :filelist="fileList" />
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeCharts from '@/components/home/home-charts'
  import newTask from '@/components/home/new-task'
  import {
    homeT,
    echartsData,
    getInfo
  } from '@/api/api.js'

export default {
  name: 'home',
  data () {
    return {
      taskStatus: {
        label: '任务状态',
        list: [
          {
            name: '渲染中',
            num: 0
          },
          {
            name: '渲染暂停',
            num: 0
          },
          {
            name: '渲染完成',
            num: 0
          },
          {
            name: '待全部渲染',
            num: 0
          },
          {
            name: '已归档',
            num: 0
          }

        ]
      },
      statistics: {
        label: '数据统计',
        list: [
          {
            text: '累计消费（金币）',
            num: '0',
            iconImg: require('@/icons/gold.png')
          },
          {
            text: '累计渲染用时（小时）',
            num: '0',
            iconImg: require('@/icons/time.png')
          }
        ]
      },
      pastWeek: {
        label: '近七天任务',
      },
      vip: {
        label: '会员中心',
        te: '用户余额 :',
        unit: '￥',
        name: '',
        grade: '铂金会员',
        balance: ''
      },
      Recharge: {
        desc: '现在充值可享升级超级会员',
        tit: '31天超级会员',
        l: '——— 还有机会赢渲染劵 ———',
        btn: '立即充值'
      },
      addBtn: {
        t: '新建任务'
      },
      upLoad: {
        label: '将场景文件拖拽至此区域',
        miniLabel: '暂支持扩展名：.ma .mb'
      },
      showNewTask: false,
      chartsData: [],
      chartsDate: [],
      // 工程文件
      fileList: []
    }
  },
  computed: {
    ...mapState(['zoneId','user'])
  },
  watch: {
    zoneId: {
      handler: function(val){
        if(!val) return false
        this.getHomeTData(val)
        this.getEchartsData(val)
      },
      immediate: true
    }
  },
  components: {
    HomeCharts,
    newTask
  },
  mounted(){
    setTimeout(() => {

      this.$refs.dragWindow.addEventListener('drop', function (e) {
        e.preventDefault()
      }, false)
      this.$refs.dragWindow.addEventListener('dragover', function (e) {
        e.preventDefault()
      }, false)

      let self = this

      this.$refs.dragWindow.ondrop = function(ev) {
        let oFile = ev.dataTransfer.files[0],
            oFileType = oFile.name.split('.').pop()
        if(oFileType == 'ma' || oFileType == 'mb'){

          self.fileList = [{
            sceneFile: oFile,
            projectFileList: null,
            projectFileName: '',
            inputStatus: false,
            path: '',
            id: Math.floor(Math.random() * 100000000000000)
          }]
          self.showNewTask = true
        }
      }

    },0)
  },
  methods: {
    // 关闭
    closeDialogFun(){
      this.showNewTask = false
    },
    // 获取任务状态数据统计
    async getHomeTData(val){
      let data = await homeT(val),
          d = data.data.data
      this.taskStatus['list'][0]['num'] = d.ing        //任务状态-渲染中
      this.taskStatus['list'][1]['num'] = d.stop       //任务状态-渲染暂停
      this.taskStatus['list'][2]['num'] = d.finish     //任务状态-渲染完成
      this.taskStatus['list'][3]['num'] = d.wait       //任务状态-待全部渲染
      this.taskStatus['list'][4]['num'] = d.history    //任务状态-已归档
      this.statistics['list'][0]['num'] = d.cost == null ? 0 : d.cost.toFixed(2)                     //数据统计-累计消费
      this.statistics['list'][1]['num'] = d.useTime == null ? 0 : (d.useTime / 3600000).toFixed(2)     //数据统计-累计渲染用时
    },
    // 获取曲线图数据
    async getEchartsData(val){
      let data = await echartsData(val)
      this.chartsDate = []
      this.chartsData = []
      data.data.data.forEach(curr => {
        let month = new Date(curr.date).getMonth() + 1,
            month_ = month > 9 ? month : '0' + month,
            day = new Date(curr.date).getDate(),
            day_ = day > 9 ? day : '0' + day
        this.chartsDate.push(month_ + '.' + day_)
        this.chartsData.push(curr.sum)
      })
    },
    // 触发新建任务
    createTaskFun(){
      let inputDom = document.createElement('INPUT')
      inputDom.type='file'
      inputDom.accept='.ma,.mb'
      inputDom.click()
      inputDom.addEventListener('change',() => {

        if(inputDom.files.length == 1){
          this.fileList= [{
            sceneFile: inputDom.files[0],
            projectFileList: null,
            projectFileName: '',
            inputStatus: false,
            path: '',
            id: Math.floor(Math.random() * 100000000000000)
          }]
          this.showNewTask = true
        }

      })
    },
  }
}
</script>

<style scoped lang="less">
  .home-wrapper {
    padding: 20px 50px;
    .firRow {
      height: 248px;
      display: flex;
      flex-wrap: nowrap;
      .taskStatus,
      .statistics {
        height: 100%;
        background:rgba(22,29,37,1);
        border-radius:15px;
        flex-shrink: 1;
        flex-grow: 1;
        padding: 20px 30px;
        box-sizing: border-box;
      }
      .taskStatus {
        width: 900px;
        margin-right: 30px;
        .statusList {
          display: flex;
          justify-content: space-around;
          flex-wrap: nowrap;
          .item {
            text-align: center;
            .cir {
              position: relative;
              width: 100px;
              height: 100px;
              background-image: linear-gradient(45deg, rgba(80,134,218,1), rgba(94,203,232,1));
              border-radius: 50%;
              .n {
                position: absolute;
                left: 0px;
                width: 100px;
                /*font-family: 'PingFangSCRegular';*/
                font-family: 'MicrosoftYaHei';
                font-size: 30px;
                font-weight: 400;
                color: rgba(114,189,210,1);
                text-shadow: 0px 0px 4px rgba(114,189,210,0.4);
                line-height: 100px;
              }
              &::before {
                position: absolute;
                top: 6px;
                left: 6px;
                content: '';
                width: 88px;
                height: 88px;
                border-radius: 50%;
                background-color: RGBA(23, 28, 40, 1);
              }
              &::after {
                position: absolute;
                top: -12px;
                left: -12px;
                content: '';
                width: 116px;
                height: 116px;
                border-radius: 50%;
                border: 4px solid rgba(35,41,49,1);
              }
            }
            .name {
              display: inline-block;
              margin-top: 26px;
              font-size:12px;
              font-weight:400;
              color:rgba(255,255,255,0.59);
            }
            &:nth-of-type(2) {
              .cir {
                background-image: linear-gradient(45deg, rgba(8,99,247,1), rgba(41,140,253,1));
              }
              .n {
                color:rgba(16,85,204,1)
              }
            }
            &:nth-of-type(3) {
              .cir {
                background-image: linear-gradient(45deg, rgba(83,108,255,1), rgba(144,121,255,1));
              }
              .n {
                color:rgba(162,149,221,1);
              }
            }
            &:nth-of-type(4) {
              .cir {
                background-image: linear-gradient(45deg, rgba(75,167,156,1), rgba(143,236,222,1));
              }
              .n {
                color:rgba(84,233,221,1);
              }
            }
            &:nth-of-type(5) {
              .cir {
                background-image: linear-gradient(45deg, rgba(77,78,179,1), rgba(97,110,212,1));
              }
              .n {
                color:rgba(117,131,255,1);
              }
            }
          }
        }
      }
      .statistics {
        width: 713px;
        .s {
          display: flex;
          flex-wrap: nowrap;
          .sw {
            width:1px;
            height:153px;
            background:rgba(26,34,44,1);
            border-radius:18px;
            flex-shrink: 1;
            flex-grow: 1;
            padding: 35px 30px;
            box-sizing: border-box;
            .f {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .n {
                font-size:34px;
                font-weight:600;
                color:rgba(27,99,226,1);
                line-height:48px;
                vertical-align: middle;
                /*font-family: 'PingFangSCRegular';*/
                font-family: 'MicrosoftYaHei';
              }
            }
            .d {
              display: inline-block;
              margin-top: 23px;
              font-size: 14px;
              /*font-family: 'PingFangSCRegular';*/
              font-family: 'MicrosoftYaHei';
              font-weight: 400;
              color: rgba(27,99,226,1);
            }
            &:nth-of-type(1) {
              margin-right: 31px;
              .f {
                .n {
                  color: rgba(23, 205, 227, 1);
                }
              }
              .d {
                color: rgba(23, 205, 227, 1);
              }
            }
          }
        }
      }
    }
    .secRow {
      height:229px;
      display: flex;
      flex-wrap: nowrap;
      margin-top: 30px;
      .addBtn,
      .pastWeek,
      .vip,
      .Recharge {
        height: 100%;
        border-radius:15px;
        flex-shrink: 1;
        flex-grow: 1;
        padding: 20px 30px;
        box-sizing: border-box;
      }
      .pastWeek,
      .vip,
      .Recharge {
        background-color: rgba(22,29,37,1);
      }
      .addBtn {
        width: 240px;
        background:linear-gradient(135deg,rgba(82,206,229,1) 0%,rgba(35,96,190,1) 100%);
        margin-right: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        cursor: pointer;
        .im {
          margin-top: 40px;
          margin-bottom: 21px;
          width: 60px;
        }
        .te {
          font-size:20px;
          font-weight:600;
          color:rgba(33,41,51,1);
          text-shadow: 0px 0px 4px rgba(33,41,51,0.4);
        }
      }
      .pastWeek {
        position: relative;
        width: 630px;
        margin-right: 30px;
        .HomeCharts {
          position: absolute;
          bottom: 36px;
          width: calc(100% - 60px);
        }
      }
      .vip {
        width: 259px;
        margin-right: 30px;
        .s {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          .t {
            margin-left: 10px;
            flex-grow: 1;
            .name {
              font-size:16px;
              font-weight:500;
              color:rgba(255,255,255,0.8);
              margin-top: 10px;
              margin-bottom: 6px;
              line-height: 22px;
            }
            .grade {
              .gradeT {
                font-size:12px;
                font-weight:400;
                color:rgba(229,199,138,0.7);
                line-height:17px;
                vertical-align: top;
                margin-left: 2px;
              }
            }
          }
        }
        .q {
          margin-top: 28px;
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          img {
            margin-right: 4px;
          }
          .y {
            display: inline-block;
            /*margin-left: 3px;*/
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,0.6);
          }
          .vipBalance {
            margin-left: 3px;
            /*font-family: 'PingFangSCRegular';*/
            font-family: 'MicrosoftYaHei';
            font-size:26px;
            font-weight:600;
            color:rgba(0,97,255,1);
            margin-bottom: 10px;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
      .Recharge {
        position: relative;
        width: 426px;
        box-shadow:0px 2px 24px 0px rgba(229,199,138,0.2);
        .ad {
          position: absolute;
          bottom: 0px;
          right: 0px;
        }
        .t {
          position: relative;
          width: 192px;
          text-align: center;
          .desc {
            font-size: 16px;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            text-shadow: 0px 0px 4px rgba(255,255,255,0.4);
            margin-bottom: 5px;
          }
          .tit {
            font-size: 30px;
            font-weight: 400;
            color: rgba(255,255,255,0.8);
            text-shadow: 0px 0px 4px rgba(255,255,255,0.4);
            margin-bottom: 5px;
          }
          .l {
            display: inline-block;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255,255,255,0.6);
            margin-bottom: 38px;
          }
          .btn {
            display: inline-block;
            width:124px;
            height:38px;
            background:rgba(229,199,138,1);
            border-radius:28px;
            font-size:16px;
            font-weight:500;
            line-height: 38px;
            color:rgba(178,96,17,1);
            cursor: pointer;
          }
        }
      }
    }
    .thiRow {
      height: calc(100vh - 80px - 20px - 248px - 30px - 30px - 229px - 20px );
      min-height: 140px;
      display: flex;
      margin-top: 30px;
      padding: 30px;
      box-sizing: border-box;
      background-color: rgba(22,29,37,1);
      border-radius:15px;
      .upLoad {
        position: relative;
        height: 100%;
        min-height: 80px;
        width: 1px;
        flex-shrink: 1;
        flex-grow: 1;
        border:2px dashed rgba(68,74,80,1);
        border-radius:8px;
        .label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          font-size:16px;
          font-weight:400;
          color:rgba(255,255,255,0.49);
          pointer-events: none;
          text-align: center;
          .mini-label {
            font-size:14px;
            font-weight:400;
            color:rgba(255,255,255,0.29);
            /*font-family: 'PingFangSCRegular';*/
            font-family: 'MicrosoftYaHei';
            line-height:20px;
            margin-top: 4px;
            display: inline-block;
          }
        }
      }
    }
    .firRow,
    .secRow {
      .taskStatus,
      .statistics,
      .pastWeek,
      .vip {
        .label {
          font-size:18px;
          font-weight:600;
          color:rgba(255,255,255,1);
          margin-bottom: 23px;
        }
      }
    }
  }
</style>
