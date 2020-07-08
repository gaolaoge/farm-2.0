<template>
  <div class="home-wrapper" ref="homeWrapper">
    <div class="l">
      <div class="firRow">
        <!--任务状态-->
        <div class="taskStatus">
          <header class="label">
            {{ taskStatus.label }}
          </header>
          <div class="statusList">
            <div class="item"
                 v-for="(item,index) in taskStatus.list"
                 :key="index"
                 @click="$router.push({name: 'task',params: {'name': item.name}})">
              <span class="n">{{ item.num }}</span>
              <span class="name">{{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="secRow">
        <!--echarts-->
        <div class="pastWeek">
          <header class="label">
            {{ pastWeek.label }}
          </header>
          <HomeCharts class="HomeCharts" :cData="chartsData" :cDate="chartsDate"/>
        </div>
<!--        &lt;!&ndash;存储统计&ndash;&gt;-->
<!--        <div class="vip">-->
<!--          <header class="label">-->
<!--            <span>{{ vip.label }}</span>-->
<!--          </header>-->
<!--          <storageCharts class="storage-charts"/>-->
<!--        </div>-->
        <!--数据统计-->
        <div class="statistics">
          <header class="label">
            {{ statistics.label }}
          </header>
          <section class="s">
            <div class="sw" v-for="(item,index) in statistics.list" :key="index">
              <div class="f">
                <img :src="item.iconImg" alt="">
                <span class="n">
                {{ item.num }}
              </span>
                <span class="k">
                ( {{ item.unit }} )
              </span>
              </div>
              <span class="d">
              {{ item.text }}
            </span>
            </div>
          </section>
        </div>
      </div>
      <div class="thiRow">

      </div>
    </div>
    <div class="r">

    </div>

    <el-dialog :visible.sync="showNewTask"
               :show-close=false
               :close-on-click-modal=false
               top="8vh"
               width="1100px">
      <newTask @closeDialogFun="closeDialogFun" :filelist="fileList" />
    </el-dialog>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HomeCharts from '@/components/home/home-charts'
  import storageCharts from '@/components/home/storage-charts'
  import newTask from '@/components/home/new-task'
  import {
    homeT,
    echartsData,
    getInfo
  } from '@/api/api.js'
  import {
    messageFun,
    IEVersion
  } from "../assets/common"

  export default {
  name: 'home',
  data () {
    return {
      taskStatus: {
        label: '任务状态',
        list: [
          {
            name: '待设置参数',
            num: 0
          },
          {
            name: '渲染中',
            num: 0
          },
          {
            name: '待全部渲染',
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
          // {
          //   name: 'null',
          //   num: 0
          // }
        ],
        messageText: '您有待设置参数任务，请尽快完成哦~',
        haveNewItem: false
      },
      statistics: {
        label: '数据统计',
        list: [
          {
            text: '累计消费',
            num: '0',
            unit: '金币',
            iconImg: require('@/icons/gold.png')
          },
          {
            text: '累计渲染用时',
            num: '0',
            unit: '小时',
            iconImg: require('@/icons/time.png')
          }
        ]
      },
      pastWeek: {
        label: '近七天任务',
      },
      vip: {
        label: '存储统计'
      },
      showNewTask: false,
      chartsData: [],
      chartsDate: [],
      // 工程文件
      fileList: [],
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
    },
    'user': {
      handler: function(val){
        this.statistics['list'][0]['num'] = val.consumption   //数据统计-累计消费
      },
      immediate: true,
      deep: true
    },
    'taskStatus.list': {
      handler: function(val){
        if(val[0].num != 0) this.taskStatus.haveNewItem = true
      },
      immediate: true
    }
  },
  components: {
    HomeCharts,
    newTask,
    storageCharts
  },
  mounted(){

  },
  methods: {
    // 关闭
    closeDialogFun(){
      this.showNewTask = false
    },
    // 获取任务状态数据统计
    async getHomeTData(val){
      let data = await homeT(val),
          d = data.data.data,
          m
      this.taskStatus['list'][1]['num'] = d.ing                 // 任务状态-渲染中
      this.taskStatus['list'][3]['num'] = d.stop                // 任务状态-渲染暂停
      this.taskStatus['list'][4]['num'] = d.finish              // 任务状态-渲染完成
      this.taskStatus['list'][2]['num'] = d.wait                // 任务状态-待全部渲染
      this.taskStatus['list'][0]['num'] = d.finishAnalyse       // 任务状态-待设置参数
      if(d.useTime == null){ m = 0; this.statistics.list[1]['unit'] = '秒钟' }
      if(d.useTime / 3600000 >= 1){ m = d.useTime / 3600000; this.statistics.list[1]['unit'] = '小时' }
      else if(d.useTime / 3600000 / 60 >= 1){ m = d.useTime / 3600000 / 60; this.statistics.list[1]['unit'] = '分钟' }
      else{ m = d.useTime / 3600000 / 60 / 60; this.statistics.list[1]['unit'] = '秒钟' }
      this.statistics['list'][1]['num'] = m.toFixed(2)          // 数据统计-累计渲染用时
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
      let inputDom = document.createElement('INPUT'),
          Fun = function(){
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
          }.bind(this)
      inputDom.type='file'
      inputDom.accept='.ma,.mb'

      if(IEVersion() == -1) inputDom.addEventListener('change', Fun)
      else if(IEVersion() == 'edge') inputDom.onchange = Fun
      else inputDom.onpropertychange = Fun

      inputDom.click()
    },
  }
}
</script>

<style scoped lang="less">
  .home-wrapper {
    display: flex;
    flex-wrap: nowrap;
    padding: 20px 50px;
    .l {
      flex-grow: 1;
      margin-right: 50px;
      .firRow {
        height: 210px;
        display: flex;
        flex-wrap: nowrap;
        .taskStatus {
          height: 100%;
          flex-shrink: 1;
          flex-grow: 1;
          box-sizing: border-box;
          .statusList {
            display: flex;
            justify-content: space-around;
            flex-wrap: nowrap;
            .item {
              position: relative;
              width: 250px;
              height: 148px;
              background: rgba(255, 255, 255, 1);
              box-shadow: 0px 2px 20px 0px rgba(27, 83, 244, 0.05);
              border-radius: 14px;
              .n {
                font-size: 40px;
                font-family: Helvetica;
                color: rgba(22, 29, 37, 1);
                line-height: 48px;
              }
              .name {
                font-size:14px;
                font-family: SourceHanSansCN-Regular,SourceHanSansCN;
                font-weight: 400;
                color: rgba(22, 29, 37, 0.6);
                line-height: 21px;
              }
            }
          }
        }

      }
      .secRow {
        height: calc(262px + 62px);
        display: flex;
        flex-wrap: nowrap;
        .addBtn,
        .pastWeek,
        .statistics {
          background-color: rgba(255, 255, 255, 1);
        }
        .pastWeek {
          position: relative;
          width: 630px;
          margin-right: 30px;
          flex-grow: 1;
          flex-shrink: 1;
          border-radius: 14px;
          .HomeCharts {
            position: absolute;
            bottom: 36px;
            width: calc(100% - 60px);
          }
        }
        .vip {
          position: relative;
          width: 259px;
          margin-right: 30px;
          .label {
            margin-bottom: 0px!important;
          }
          .storage-charts {
            position: absolute;
            width: calc(100% - 60px);
            /*bottom:36px;*/
          }
        }
        .statistics {
          width: 516px;
          border-radius: 14px;
          .s {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-around;
            .sw {
              width:150px;
              height:153px;
              background:rgba(26,34,44,1);
              border-radius:18px;
              /*flex-shrink: 1;*/
              /*flex-grow: 1;*/
              /*padding: 35px 30px;*/
              box-sizing: border-box;
              .f {
                position: relative;
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
                  margin-right: 54px;
                }
                .k {
                  position: absolute;
                  right: 0px;
                  bottom: 10px;
                  font-size: 14px;
                  font-weight: 600;
                  color: rgba(27,99,226,1);
                  line-height: 1em;
                  vertical-align: bottom;
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
                  .n,
                  .k {
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
      .thiRow {
        height: calc(100vh - 697px);
        min-height: 140px;
        display: flex;
        margin-top: 30px;
        padding: 10px;
        box-sizing: border-box;
        background-color: rgba(22,29,37,1);
        border-radius:15px;

      }
      .firRow,
      .secRow {
        padding-top: 62px;
        box-sizing: border-box;
        .taskStatus,
        .statistics,
        .pastWeek,
        .vip {
          position: relative;
          .label {
            position: absolute;
            top: -42px;
            right: 20px;
            font-size:18px;
            font-weight:600;
            color: rgba(22, 29, 37, 1);
          }
        }
      }
    }
    .r {
      width: 366px;
      flex-shrink: 0;
      background-color: red;
    }

  }


  @media screen and (orientation: portrait) {
    .home-wrapper .thiRow {
      height: calc(100vw - 80px - 20px - 248px - 30px - 30px - 229px - 20px);
    }
  }
</style>
