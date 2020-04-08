<template>
  <div class="task-wrapper">
    <!--操作-->
    <div class="btnGroup">
      <!--上传分析操作-->
      <div class="uploadBtnGroup"
           v-show="table.navListActiveIndex == 0">
        <div class="farm-primary-form-btn" v-for="item,index in btnGroup.uploadBtnGroup" :key="index">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <!--渲染下载操作-->
      <div class="renderBtnGroup"
           v-show="table.navListActiveIndex == 1">
        <div class="farm-primary-form-btn" v-for="item,index in btnGroup.renderBtnGroup" :key="index">
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
          <input type="text" class="farm-form-input" placeholder="输入场景名、任务ID">
          <img src="@/icons/searchIcon.png" alt="" class="searchIcon">
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
          <!--上传分析表格-->
          <upload-table />
        </div>
        <!--渲染下载-->
        <div ref="renderTable"
             class="renderTable"
             v-show="table.navListActiveIndex == 1">
          <!--渲染下载表格-->
          <download-table/>
        </div>
      </div>
    </div>
    <!--弹窗-->
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
  </div>
</template>

<script>

  import '@/assets/fonticon/iconfont.css'
  import uploadTable from '@/components/task/upload-table'
  import downloadTable from '@/components/task/download-table'
  import archiveRecords from '@/components/task/archive-records'

  export default {
    name: 'task',
    data(){
      return {
        table: {
          navList: [
            {
              text: '上传分析',
              num: 23
            },
            {
              text: '渲染下载',
              num: 36
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
              text: '开始渲染',
            },
            {
              text: '归档',
            }
          ],
          archiveRecords: '归档记录',
          archiveRecordsNum: '68'
        },
        dialogTable: {
          status: false,
        },
      }
    },
    components: {
      uploadTable,
      downloadTable,
      archiveRecords
    },
    methods: {

    },
    watch: {

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
