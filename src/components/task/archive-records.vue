<template>
  <div class="archive-records">
    <div class="tableBox">
      <!--标签-->
      <div class="btn">
        {{ dialogTable.text }}（{{ dialogTable.total }}）
      </div>
      <!--表格主体-->
      <div class="table">
        <!--表格操作-->
        <div class="dialogOperate">
          <div class="dialogBtnGroup">
            <div class="farm-primary-form-btn"
                 v-for="item,index in dialogTable.btnGroup"
                 @click="operatFun(item['text'])"
                 :key="index">
            <span>
              {{ item['text'] }}
            </span>
            </div>
          </div>
          <div class="searchItem">
            <input type="text"
                   v-model="dialogTable.searchInputVal"
                   class="farm-form-input"
                   @keyup.enter="getList"
                   placeholder="输入场景名、任务ID">
            <img src="@/icons/searchIcon.png"
                 alt=""
                 class="searchIcon"
                 @click="getList">
          </div>
        </div>
        <!--表格-->
        <div class="dialogTable" ref="dialogTable">
          <el-table
            class="gd"
            :data="dialogTable.tableData"
            :tree-props="{'children': 'children2'}"
            @selection-change="dialogTableChange"
            @row-click="showDetails"
            row-key="rowId"
            style="width: 100%">

            <el-table-column
              type="selection"
              align="right"
              width="92" />
            <!--任务ID-->
            <el-table-column
              prop="id"
              label="任务ID"
              sortable
              width="100" />
            <!--场景名-->
            <el-table-column
              prop="sceneName"
              label="场景名"
              show-overflow-tooltip
              width="180" />
            <!--状态-->
            <el-table-column
              prop="status"
              label="状态"
              width="110"/>
            <!--所属项目-->
            <el-table-column
              prop="viewProject"
              label="所属项目"
              show-overflow-tooltip
              width="180" />
            <!--渲染中-->
            <el-table-column
              prop="rendering"
              sortable
              width="100"
              label="渲染中" />
            <!--等待-->
            <el-table-column
              prop="wait"
              sortable
              width="100"
              label="等待" />
            <!--暂停-->
            <el-table-column
              prop="timeOut"
              sortable
              width="100"
              label="暂停" />
            <!--完成-->
            <el-table-column
              prop="carryOut"
              sortable
              width="100"
              label="完成" />
            <!--失败-->
            <el-table-column
              prop="failure"
              label="失败"
              width="100"
              sortable />
            <!--渲染时长-->
            <el-table-column
              prop="renderingTime"
              label="渲染时长"
              sortable
              width="180" />
            <!--渲染费用（金币）-->
            <el-table-column
              prop="renderingCost"
              label="渲染费用（金币）"
              sortable
              width="156"/>
            <!--帧范围-->
            <el-table-column
              prop="frameRange"
              label="帧范围"
              sortable
              width="100" />
            <!--间隔帧-->
            <el-table-column
              prop="intervalFrame"
              label="间隔帧"
              sortable
              width="100" />
            <!--相机-->
            <el-table-column
              prop="camera"
              label="相机"
              sortable
              show-overflow-tooltip
              width="120" />
            <!--层名-->
            <el-table-column
              prop="layerName"
              label="层名"
              sortable
              show-overflow-tooltip
              width="140" />
            <!--下载情况-->
            <el-table-column
              prop="downloadStatus"
              label="下载情况"
              sortable
              width="110" />
            <!--渲染开始时间-->
            <el-table-column
              prop="renderDateStart"
              label="渲染开始时间"
              sortable
              width="180" />
            <!--渲染结束时间-->
            <el-table-column
              prop="renderDateEnd"
              label="渲染结束时间"
              sortable
              width="180" />
            <!--创建人-->
            <el-table-column
              prop="person"
              label="创建人"
              sortable
              width="120" />
            <!--创建时间-->
            <el-table-column
              prop="createDate"
              label="创建时间"
              sortable
              width="180" />

          </el-table>
          <!--分页-->
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next, jumper"
              :current-page.sync="dialogTable.pageIndex"
              :total="dialogTable.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    createTableIconList,
    createDateFun,
    consum,
    itemDownloadStatus,
    messageFun
  } from '@/assets/common.js'
  import {
    getRecordList,
    reductionDownloadList
  } from '@/api/api'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'archive-records',
    data(){
      return {
        dialogTable: {
          text: '归档记录',
          total: 0,
          pageSize: 10,
          pageIndex: 1,
          btnGroup: [
            {
              text: '下载完成帧'
            },
            {
              text: '还原到渲染下载'
            }
          ],
          tableData: [],
          dialogTableSelection: [],
          searchInputVal: ''
        },
        attribution: 'drawer'
      }
    },
    computed: {
      ...mapState(['zoneId'])
    },
    methods: {
      // 操作触发
      operatFun(val){
        switch(val){
          case '下载完成帧':
            this.downloadLayerFun()
            break
          case '还原到渲染下载':
            this.reductionFUn()
        }
      },
      // 下载完成帧
      downloadLayerFun(){
        if(!this.dialogTable.dialogTableSelection.length) return false


      },
      // 还原到渲染下载
      reductionFUn(){
        if(!this.dialogTable.dialogTableSelection.length) return false

        this.$confirm('将选中项还原到渲染下载列表, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let data = await reductionDownloadList({
                taskUuids: this.dialogTable.dialogTableSelection.map(curr => {
                  if('children2' in curr) return curr.rowId
                }),
                zoneUuid: this.zoneId
              })
              if(data.data.code == 200){
                messageFun('success','还原成功')
                this.getList()
                this.$emit('refreshTaskBase','')
              }
            },
            () => messageFun('info','已取消还原')
          )
          .catch(() => { })
      },
      //归档记录多选
      dialogTableChange(val){
        this.dialogTable.dialogTableSelection = val
      },
      // 上传分析详情查看
      showDetails(row, column, event){

      },
      // 获取列表
      async getList(){
        // {
        //   projectIds: '',    // 项目id数组
        //   zoneUuid: '',      // 分区id
        //   queryStr: '',      // 用户输入的查询字符
        //   pageSize: '',      // 分页尺寸
        //   pageIndex: ''      // 当前页
        // }
        let t = `projectIds=&zoneUuid=${this.zoneId}&queryStr=${this.dialogTable.searchInputVal}&pageSize=${this.dialogTable.pageSize}&pageIndex=${this.dialogTable.pageIndex}`,
            data = await getRecordList(t)
        this.dialogTable.total = data.data.total
        this.dialogTable.tableData = data.data.data.map(curr => {
          let children2 = curr.historyLayerTaskDTOList.map(item => {
            let downloadStatus = ''
            switch(item.downloadStatus){
              case 0:
                downloadStatus = '待下载'
                break
              case 1:
                downloadStatus = '部分下载'
                break
              case 2:
                downloadStatus = '全部下载'
                break
            }
            return {
              id: '-',
              sceneName: '-',
              status: itemDownloadStatus(item.downloadStatus),
              viewProject: item.projectName,
              rendering: item.renderRunning,
              wait: item.renderWaiting,
              timeOut: item.renderPause,
              carryOut: item.renderFinished,
              failure: item.renderFailed,
              renderingTime: consum(item.useTime),
              renderingCost: item.cost,
              frameRange: item.frameStart + '-' + item.frameEnd,
              intervalFrame: item.frameInterval,
              rowId: item.taskUuid + '-' + item.layerTaskUuid,
              camera: item.camera,
              layerName: item.layerName,
              downloadStatus,
              renderDateStart: createDateFun(new Date(item.startTime)),
              renderDateEnd: createDateFun(new Date(item.endTime)),
              person: item.createByAccount,
              createDate: createDateFun(new Date(item.createTime))
            }
          })
          return {
            id: curr.taskNo,
            sceneName: curr.taskName,
            status: itemDownloadStatus(curr.renderStatus),
            viewProject: curr.projectName,
            rendering: curr.renderRunning,
            wait: curr.renderWaiting,
            timeOut: curr.renderPause,
            carryOut: curr.renderFinished,
            failure: curr.renderFailed,
            renderingTime: consum(curr.useTime),
            renderingCost: curr.cost,
            frameRange: '-',
            intervalFrame: '-',
            children2,
            rowId: curr.taskUuid,
            camera: '-',
            layerName: '-',
            downloadStatus: '-',
            renderDateStart: createDateFun(new Date(curr.startTime)),
            renderDateEnd: createDateFun(new Date(curr.endTime)),
            person: curr.createByAccount,
            createDate: createDateFun(new Date(curr.createTime)),
          }
        })
      }
    },
    mounted() {
      createTableIconList()
      this.getList()
    }
  }
</script>

<style lang="less" scoped>
  .archive-records {
    .tableBox {
      height: 87vh;
      .btn {
        font-size:16px;
        color:rgba(255, 255, 255, 0.9);
        font-family: 'PingFangSCRegular';
        padding: 10px 30px;
        width: 116px;
        text-shadow: 0px 0px 6px rgba(256,256,256,0.4);
        background-color: rgba(rgba(16, 20, 27, 1));
        border-radius: 8px 8px 0px 0px;
      }
      .table {
        height: calc(87vh - 42px);
        border-radius: 0px 8px 8px 8px;
        background-color: rgba(rgba(16, 20, 27, 1));
        .dialogOperate {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
        }
        .dialogTable {
          position: relative;
          height: calc(87vh - 114px);
          .page {
            position: absolute;
            left: 8px;
            bottom: 14px;
          }
        }
      }
    }
  }
</style>
