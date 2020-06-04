<template>
  <div class="task-wrapper">
    <!--操作-->
    <div class="btnGroup">
      <!--上传分析操作-->
      <div class="uploadBtnGroup"
           :class="[
            {'cannotDelete': !btnGroup.uploadTableBtnDelete},
            {'cannotAgain': !btnGroup.uploadTableBtnAgain}
           ]"
           v-show="table.navListActiveIndex == 0">
        <div class="farm-primary-form-btn"
             :class=item.class
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
           :class="[
            {'cannotState': !btnGroup.downloadTableBtnStart},
            {'cannotPause': !btnGroup.downloadTableBtnPause},
            {'cannotDelete': !btnGroup.downloadTableBtnDelete},
            {'cannotDownload': !btnGroup.downloadTableBtnDownload},
            {'cannotRenderAll': !btnGroup.downloadTableBtnRenderAll},
            {'cannotRenderAgain': !btnGroup.downloadTableBtnRenderAgain},
            {'cannotArchive': !btnGroup.downloadTableBtnArchive}
           ]"
           v-show="table.navListActiveIndex == 1">
        <div class="farm-primary-form-btn"
             :class="item.class"
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
                        @upLoadSeletedList="upLoadSeletedList"
                        @toRenderTable="table.navListActiveIndex = 1"
                        ref="uploadMode" />
        </div>
        <!--渲染下载-->
        <div ref="renderTable"
             class="renderTable"
             v-show="table.navListActiveIndex == 1">
          <!--渲染下载表格-->
          <download-table @renderTbaleTotalItem="renderTbaleTotalItem"
                          @j="j"
                          @archiveNum="getArchiveNum"
                          ref="renderMode"/>
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
      <archive-records @refreshTaskBase="x" ref="archiveTable" />
    </el-dialog>
    <!--弹窗 新建任务-->
    <el-dialog :visible.sync="createTaskDialog"
               :show-close=false
               top="8vh"
               width="1100px">
      <newTask @closeDialogFun="closeDialogFun"
               @getListAgain="$refs.uploadMode.getList()"
               :filelist="fileList"/>
    </el-dialog>
  </div>
</template>

<script>
  import '@/assets/fonticon/iconfont.css'
  import uploadTable from '@/components/task/upLoad-table'
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
              class: 'addMoreBtn',
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png')
            },
            {
              text: '删除',
              class: 'deleteBtn',
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png')
            },
            {
              text: '重新分析',
              class: 'againBtn'
            },
            {
              text: '刷新',
              class: 'refresh'
            }
          ],
          renderBtnGroup: [
            {
              text: '新建任务',
              class: 'addMoreBtn',
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png')
            },
            {
              text: '开始',
              class: 'startBtn',
              initialIcon: require('@/icons/playIcon-blue.png'),
              selectedIcon: require('@/icons/playIcon-white.png')
            },
            {
              text: '暂停',
              class: 'pauseBtn',
              initialIcon: require('@/icons/pauseIcon-blue.png'),
              selectedIcon: require('@/icons/pauseIcon-white.png')
            },
            {
              text: '删除',
              class: 'deleteBtn',
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png')
            },
            {
              text: '下载完成帧',
              class: 'downloadBtn',
            },
            {
              text: '全部渲染',
              class: 'renderAllBtn',
            },
            {
              text: '重新渲染',
              class: 'renderAgainBtn',
            },
            {
              text: '归档',
              class: 'archiveBtn',
            },
            {
              text: '刷新',
              class: 'refresh'
            }
          ],
          archiveRecords: '归档记录',
          archiveRecordsNum: 0,
          searchInputUpload: '',                   // 上传分析 关键字检索
          searchInputDownload: '',                 // 渲染下载 关键字检索
          uploadTableBtnDelete: false,             // 上传分析 - 删除按钮 - 可用状态
          uploadTableBtnAgain: false,              // 上传分析 - 重新分析按钮 - 可用状态
          downloadTableBtnStart: false,            // 渲染下载 - 开始 - 可用状态
          downloadTableBtnPause: false,            // 渲染下载 - 暂停 - 可用状态
          downloadTableBtnDelete: false,           // 渲染下载 - 删除 - 可用状态
          downloadTableBtnDownload: false,         // 渲染下载 - 下载完成帧 - 可用状态
          downloadTableBtnRenderAll: false,        // 渲染下载 - 全部渲染 - 可用状态
          downloadTableBtnRenderAgain: false,      // 渲染下载 - 重新渲染 - 可用状态
          downloadTableBtnArchive: false           // 渲染下载 - 归档 - 可用状态
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
      // 上传分析 多选结果
      upLoadSeletedList(val){
        let t = this.btnGroup
        t.uploadTableBtnDelete = true       // 上传分析 - 删除
        t.uploadTableBtnAgain = true        // 上传分析 - 重新分析
        if(val.includes('上传中...')){ t.uploadTableBtnDelete = false; t.uploadTableBtnAgain = false }
        if(val.includes('分析中')){ t.uploadTableBtnDelete = false; t.uploadTableBtnAgain = false }
        if(val.includes('上传暂停')) t.uploadTableBtnAgain = false
        if(val.includes('上传失败')) t.uploadTableBtnAgain = false
        if(val.includes('已取消')) t.uploadTableBtnAgain = false
        if(val.includes('已放弃')) t.uploadTableBtnAgain = false
        // if(val.includes('分析警告')) ''
        // if(val.includes('待设置参数')) ''
        // if(val.includes('分析失败')) ''
        if(!val.length){
          t.uploadTableBtnDelete = false       // 上传分析 - 删除
          t.uploadTableBtnAgain = false        // 上传分析 - 重新分析
        }
      },
      // 渲染下载 多选结果
      j(val){
        let t = this.btnGroup
        t.downloadTableBtnStart = true       // 渲染下载 - 开始
        t.downloadTableBtnPause = true       // 渲染下载 - 暂停
        t.downloadTableBtnDelete = true      // 渲染下载 - 删除
        t.downloadTableBtnDownload = true    // 渲染下载 - 下载完成帧
        t.downloadTableBtnRenderAll = true   // 渲染下载 - 全部渲染
        t.downloadTableBtnRenderAgain = true // 渲染下载 - 重新渲染
        t.downloadTableBtnArchive = true     // 渲染下载 - 归档
        if(val.includes('渲染中')){
          t.downloadTableBtnDelete = false
          t.downloadTableBtnStart = false
          // t.downloadTableBtnRenderAll = false
          t.downloadTableBtnArchive = false
        }
        if(val.includes('渲染暂停')){
          t.downloadTableBtnPause = false
          t.downloadTableBtnRenderAll = false
          t.downloadTableBtnArchive = false
        }
        if(val.includes('待全部渲染')){
          t.downloadTableBtnStart = false
          t.downloadTableBtnPause = false
          t.downloadTableBtnArchive = false
        }
        if(val.includes('渲染完成')){
          t.downloadTableBtnStart = false
          t.downloadTableBtnPause = false
          t.downloadTableBtnRenderAll = false
        }
        if(!val.length){
          t.downloadTableBtnStart = false        // 渲染下载 - 开始
          t.downloadTableBtnPause = false       // 渲染下载 - 暂停
          t.downloadTableBtnDelete = false      // 渲染下载 - 删除
          t.downloadTableBtnDownload = false    // 渲染下载 - 下载完成帧
          t.downloadTableBtnRenderAll = false   // 渲染下载 - 全部渲染
          t.downloadTableBtnRenderAgain = false // 渲染下载 - 重新渲染
          t.downloadTableBtnArchive = false     // 渲染下载 - 归档
        }
      },
      // 【归档记录】触发重新获取数据
      x(){
        this.$refs.renderMode.getList()
      },
      // 获取归档记录长度
      getArchiveNum(val){
        this.btnGroup.archiveRecordsNum = val
        this.$refs.archiveTable.getList()
      },
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
            if(!this.btnGroup.uploadTableBtnDelete) return false
            this.$refs.uploadMode.deleteItem()
            break
          case '重新分析':
            if(!this.btnGroup.uploadTableBtnAgain) return false
            this.$refs.uploadMode.analyseAgainFun()
            break
          case '刷新':
            this.$refs.uploadMode.getList()
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
            if(!this.btnGroup.downloadTableBtnStart) return false
            this.$refs.renderMode.startFun()
            break
          case '暂停':
            if(!this.btnGroup.downloadTableBtnPause) return false
            this.$refs.renderMode.pauseFun()
            break
          case '删除':
            if(!this.btnGroup.downloadTableBtnDelete) return false
            this.$refs.renderMode.deleteFun()
            break
          case '下载完成帧':
            this.$refs.renderMode.downloadFils()
            break
          case '全部渲染':
            if(!this.btnGroup.downloadTableBtnRenderAll) return false
            this.$refs.renderMode.renderAllFun()
            break
          case '重新渲染':
            if(!this.btnGroup.downloadTableBtnRenderAgain) return false
            this.$refs.renderMode.renderAgainFun()
            break
          case '归档':
            if(!this.btnGroup.downloadTableBtnArchive) return false
            this.$refs.renderMode.archiveFun()
            break
          case '刷新':
            this.$refs.renderMode.getList()
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
        // this.$refs.uploadMode.getList()
        // this.$refs.renderMode.getList()
      },
      // 上传分析 - 关键字检索
      searchUploadInput(){
        this.$refs.uploadMode.searchFun(this.btnGroup.searchInputUpload)
      },
      // 渲染下载 - 关键字检索
      searchRenderInput(){
        this.$refs.renderMode.searchFun(this.btnGroup.searchInputDownload)
      },
    },
    watch: {
      'table.navListActiveIndex': {
        handler: function(val){
          sessionStorage.setItem('taskListActive', val)
        },
      }
    },
    mounted() {
      if(sessionStorage.getItem('taskListActive') == '1') this.table.navListActiveIndex = 1
      createTableIconList()
      let name = this.$route.params.name ? this.$route.params.name : null
      if(!name) return false
      switch(name){
        case '待设置参数':
          sessionStorage.setItem('taskListActive','0')
          this.table.navListActiveIndex = 0
          this.$refs.uploadMode.getList(true)
          break
        case '渲染中':
          sessionStorage.setItem('taskListActive','1')
          this.table.navListActiveIndex = 1
          this.$refs.renderMode.getList(2)
          break
        case '待全部渲染':
          sessionStorage.setItem('taskListActive','1')
          this.table.navListActiveIndex = 1
          this.$refs.renderMode.getList(5)
          break
        case '渲染暂停':
          sessionStorage.setItem('taskListActive','1')
          this.table.navListActiveIndex = 1
          this.$refs.renderMode.getList(4)
          break
        case '渲染完成':
          sessionStorage.setItem('taskListActive','1')
          this.table.navListActiveIndex = 1
          this.$refs.renderMode.getList(3)
          break
      }
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
      .uploadBtnGroup {
        &.cannotDelete {
          .deleteBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotAgain {
          .againBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
          }
        }
      }
      .renderBtnGroup {
        &.cannotState {
          .startBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotPause {
          .pauseBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotDelete {
          .deleteBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotDownload {
          .downloadBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotRenderAll {
          .renderAllBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotRenderAgain {
          .renderAgainBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
            img {
              opacity: 0;
            }
          }
        }
        &.cannotArchive {
          .archiveBtn {
            cursor: no-drop;
            color: rgba(256, 256, 256, 0.1);
            &:hover {
              background-color: #212933;
              color: rgba(256, 256, 256, 0.1);
            }
          }
        }
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

  @media screen and (orientation: portrait) {
    .task-wrapper .tableGroup .tableList {
      min-height: 0px;
      height: calc(100vw - 80px - 73px - 42px - 40px);
    }
  }
</style>
