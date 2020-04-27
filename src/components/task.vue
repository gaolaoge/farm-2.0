<template>
  <div class="task-wrapper">
    <!--操作-->
    <div class="btnGroup">
      <!--上传分析操作-->
      <div class="uploadBtnGroup"
           v-show="table.navListActiveIndex == 0">
        <div class="farm-primary-form-btn"
             v-for="item,index in btnGroup.uploadBtnGroup"
             @click="uploadOperating(item['text'])"
             :key="index">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="rightOPerate"
           v-show="table.navListActiveIndex == 0">
        <div class="searchItem">
          <input type="text"
                 class="farm-form-input"
                 v-model="btnGroup.searchInputUpload"
                 @keyup.enter="searchUploadInput"
                 placeholder="输入场景名、任务ID">
          <!--搜索按钮-->
          <img src="@/icons/searchIcon.png"
               alt=""
               class="searchIcon"
               @click="searchUploadInput">
        </div>
      </div>
      <!--渲染下载操作-->
      <div class="renderBtnGroup"
           v-show="table.navListActiveIndex == 1">
        <div class="farm-primary-form-btn"
             @click="renderOperating(item['text'])"
             v-for="item,index in btnGroup.renderBtnGroup"
             :key="index">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="rightOPerate"
           v-show="table.navListActiveIndex == 1">
        <div class="farm-primary-form-btn" @click="dialogTable.status = true">
          {{ btnGroup.archiveRecords }}（{{ btnGroup.archiveRecordsNum }}）
        </div>
        <div class="searchItem">
          <input type="text"
                 class="farm-form-input"
                 v-model="btnGroup.searchInputDownload"
                 @keyup.enter="searchRenderInput"
                 placeholder="输入场景名、任务ID">
          <!--搜索按钮-->
          <img src="@/icons/searchIcon.png"
               alt=""
               class="searchIcon"
               @click="searchRenderInput">
        </div>
      </div>
    </div>
    <!--table-->
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="item,index in table.navList"
              :key="index">
          {{ item.text }} ( {{ item.num }} )
        </span>
      </div>
      <div class="tableList"
           ref="UploadAnalysisTable">
        <!--上传分析-->
        <div ref="uploadTable"
             class="uploadTable"
             v-show="table.navListActiveIndex == 0">
          <!--上传分析 table-->
          <upload-table @uploadTbaleTotalItem="uploadTbaleTotalItem"
                        ref="uploadMode" />
        </div>
        <!--渲染下载-->
        <div ref="renderTable"
             class="renderTable"
             v-show="table.navListActiveIndex == 1">
          <!--渲染下载表格-->
          <download-table @renderTbaleTotalItem="renderTbaleTotalItem" ref="renderMode"/>
        </div>
      </div>
    </div>
    <!--弹窗 归档记录-->
    <el-dialog :visible.sync="dialogTable.status"
               :show-close="false"
               top="5vh"
               width="80%">
      <!--关闭窗口-->
      <img src="@/icons/shutDialogIcon.png"
           alt=""
           @click="dialogTable.status = false"
           class="shutDialogIcon">
      <!--窗口主体-->
      <archive-records />
    </el-dialog>
    <!--弹窗 新建任务-->
    <el-dialog :visible.sync="createTaskDialog"
               :show-close=false
               top="8vh"
               width="1100px">
      <newTask @closeDialogFun="closeDialogFun" :filelist="fileList"/>
    </el-dialog>
  </div>
</template>

<script>
  import '@/assets/fonticon/iconfont.css'
  import uploadTable from '@/components/task/upload-table'
  import downloadTable from '@/components/task/download-table'
  import archiveRecords from '@/components/task/archive-records'
  import newTask from '@/components/home/new-task'
  import {
    createTableIconList
  } from '@/assets/common.js'

  export default {
    name: 'task',
    data(){
      return {
        table: {
          navList: [
            {
              text: '上传分析',
              num: 0
            },
            {
              text: '渲染下载',
              num: 0
            }
          ],
          navListActiveIndex: 0,
        },
        btnGroup: {
          uploadBtnGroup: [
            {
              text: '新建任务',
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png')
            },
            {
              text: '删除',
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png')
            },
            {
              text: '重新分析'
            }
          ],
          renderBtnGroup: [
            {
              text: '新建任务',
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png')
            },
            {
              text: '开始',
              initialIcon: require('@/icons/playIcon-blue.png'),
              selectedIcon: require('@/icons/playIcon-white.png')
            },
            {
              text: '暂停',
              initialIcon: require('@/icons/pauseIcon-blue.png'),
              selectedIcon: require('@/icons/pauseIcon-white.png')
            },
            {
              text: '删除',
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png')
            },
            {
              text: '下载完成帧',
            },
            {
              text: '全部渲染',
            },
            {
              text: '重新渲染',
            },
            {
              text: '归档',
            }
          ],
          archiveRecords: '归档记录',
          archiveRecordsNum: '68',
          searchInputUpload: '',       //上传分析 关键字检索
          searchInputDownload: ''      //渲染下载 关键字检索
        },
        dialogTable: {
          status: false,
        },
        createTaskDialog: false,
        fileList: []
      }
    },
    components: {
      uploadTable,
      downloadTable,
      archiveRecords,
      newTask
    },
    methods: {
      uploadTbaleTotalItem(val){
        this.table.navList[0]['num'] = val
      },
      renderTbaleTotalItem(val){
        this.table.navList[1]['num'] = val
      },
      // 关闭新建任务弹窗
      closeDialogFun(){
        this.createTaskDialog = false
      },
      // 上传分析 - 操作台
      uploadOperating(ing){
        switch(ing){
          case '新建任务':
            this.createTask()
            break
          case '删除':
            this.deleteTaskUpload()
            break
          case '重新分析':
            this.againTaskUpload()
            break
        }
      },
      // 渲染下载 - 操作台
      renderOperating(ing){
        switch(ing){
          case '新建任务':
            this.createTask()
            break
          case '开始':
            this.beginTaskDownload()
            break
          case '暂停':
            this.pauseTaskDownload()
            break
          case '删除':
            this.deleteTaskDownload()
            break
          case '下载完成帧':
            this.completeTaskDownload()
            break
          case '全部渲染':
            this.allTaskDownload()
            break
          case '重新渲染':
            this.againTaskDownload()
            break
          case '归档':
            this.archiveTaskDownload()
            break
        }
      },
      // 新建任务
      createTask(){
        let inputDom = document.createElement('INPUT')
        inputDom.type = 'file'
        inputDom.accept = '.ma,.mb'
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
            this.createTaskDialog = true
          }

        })
        // this.createTaskDialog = true
      },
      // 删除 - 上传分析
      deleteTaskUpload(){
        this.$refs.uploadMode.deleteItem()
      },
      // 重新分配 - 上传分析
      againTaskUpload(){
        this.$refs.uploadMode.analyseAgainFun()
      },
      // 开始 - 渲染下载
      beginTaskDownload(){

      },
      // 暂停 - 渲染下载
      pauseTaskDownload(){

      },
      // 删除 - 渲染下载
      deleteTaskDownload(){

      },
      // 下载完成帧 - 渲染下载
      completeTaskDownload(){

      },
      // 全部渲染 - 渲染下载
      allTaskDownload(){

      },
      // 重新渲染 - 渲染下载
      againTaskDownload(){

      },
      // 归档 - 渲染下载
      archiveTaskDownload(){

      },
      // 关键字检索 - 上传分析
      searchUploadInput(){
        // this.btnGroup.searchInputUpload
        this.$refs.uploadMode.searchFun(this.btnGroup.searchInputUpload)
      },
      // 关键字检索 - 渲染下载
      searchRenderInput(){
        this.$refs.renderMode.searchFun(this.btnGroup.searchInputDownload)
      },
    },
    watch: {

    },
    mounted() {
      createTableIconList()
    }
  }
</script>

<style lang="less" scoped>
  .task-wrapper {
    overflow: hidden;
    .btnGroup {
      display: flex;
      justify-content: space-between;
      height:52px;
      margin: 20px 50px;
      padding: 0px 30px;
      background-color: rgba(22,29,37,1);
      border-radius:8px;
      .uploadBtnGroup,
      .renderBtnGroup,
      .rightOPerate {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    .tableGroup {
      margin: 20px 50px;
      .navList {
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
        min-height: 700px;
        height: calc(100vh - 80px - 73px - 42px - 40px);
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;
        /*渲染下载*/
        .progressBar {
          vertical-align: middle;
          margin-right: 10px;
          display: inline-block;
          position: relative;
          width:110px;
          height:6px;
          background:rgba(255,255,255,0.5);
          border-radius:3px;
          &::after {
            content: '';
            position: absolute;
            width: 40px;
            height: 6px;
            background: RGBA(0, 100, 252, 1);
            border-radius: 3px;
          }
        }
        .uploadTable,
        .renderTable {
          position: relative;
          min-height: 700px;
          height: 100%;
        }
      }
    }
  }
</style>
