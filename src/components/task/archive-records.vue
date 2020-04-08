<template>
  <div class="archive-records">
    <div class="tableBox">
      <!--标签-->
      <div class="btn">
        {{ dialogTable.text }}（{{ dialogTable.num }}）
      </div>
      <!--表格主体-->
      <div class="table">
        <!--表格操作-->
        <div class="dialogOperate">
          <div class="dialogBtnGroup">
            <div class="farm-primary-form-btn"
                 v-for="item,index in dialogTable.btnGroup"
                 :key="index">
            <span>
              {{ item['text'] }}
            </span>
            </div>
          </div>
          <div class="searchItem">
            <input type="text" class="farm-form-input" placeholder="输入场景名、任务ID">
            <img src="@/icons/searchIcon.png" alt="" class="searchIcon">
          </div>
        </div>
        <!--表格-->
        <div class="dialogTable" ref="dialogTable">
          <el-table
            :data="dialogTable.tableData"
            :tree-props="{'children': 'children'}"
            @selection-change="dialogTableChange"
            @row-click="showDetails"
            row-key="id"
            style="width: 100%">

            <el-table-column
              type="selection"
              align="right"
              width="92" />

            <el-table-column
              prop="id"
              label="任务ID"
              sortable
              width="100" />

            <el-table-column
              prop="sceneName"
              label="场景名"
              show-overflow-tooltip
              width="180" />

            <el-table-column
              prop="status"
              label="状态"
              width="110"/>

            <el-table-column
              prop="viewProject"
              label="所属项目"
              show-overflow-tooltip
              width="180" />

            <el-table-column
              prop="rendering"
              sortable
              width="100"
              label="渲染中" />

            <el-table-column
              prop="wait"
              sortable
              width="100"
              label="等待" />

            <el-table-column
              prop="timeOut"
              sortable
              width="100"
              label="暂停" />

            <el-table-column
              prop="carryOut"
              sortable
              width="100"
              label="完成" />

            <el-table-column
              prop="failure"
              label="失败"
              width="100"
              sortable />

            <el-table-column
              prop="renderingTime"
              label="渲染时长"
              sortable
              width="180" />

            <el-table-column
              prop="renderingCost"
              label="渲染费用（金币）"
              sortable
              width="156"/>

            <el-table-column
              prop="frameRange"
              label="帧范围"
              sortable
              width="100" />

            <el-table-column
              prop="intervalFrame"
              label="间隔帧"
              sortable
              width="100" />

          </el-table>
          <!--分页-->
          <div class="page">
            <el-pagination
              background
              layout="prev, pager, next, jumper"
              :total="dialogTable.num">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'archive-records',
    data(){
      return {
        dialogTable: {
          text: '归档记录',
          num: 26,
          btnGroup: [
            {
              text: '下载完成帧'
            },
            {
              text: '还原到渲染下载'
            }
          ],
          tableData: [
            {
              id: '10001',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10002',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10003',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10004',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10005',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10006',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10007',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10008',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10009',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
            },
            {
              id: '10010',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              viewProject: '少年的你少年的你少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
              children: [
                {
                  id: '100110',
                  sceneName: '场景场景场景场景场景场景场景.ma',
                  status: '渲染中',
                  viewProject: '少年的你少年的你少年的你项目组',
                  rendering: '1',
                  wait: '1',
                  timeOut: '1',
                  carryOut: '1',
                  failure: '1',
                  renderingTime: '2小时23分34秒',
                  renderingCost: '239.25',
                  frameRange: '1-24',
                  intervalFrame: '1',
                },
                {
                  id: '100101',
                  sceneName: '场景场景场景场景场景场景场景.ma',
                  status: '渲染中',
                  viewProject: '少年的你少年的你少年的你项目组',
                  rendering: '1',
                  wait: '1',
                  timeOut: '1',
                  carryOut: '1',
                  failure: '1',
                  renderingTime: '2小时23分34秒',
                  renderingCost: '239.25',
                  frameRange: '1-24',
                  intervalFrame: '1',
                }
              ]
            },
          ],
          dialogTableSelection: []
        },
        attribution: 'drawer'
      }
    },
    methods: {
      //归档记录多选
      dialogTableChange(val){
        this.dialogTable.dialogTableSelection = val
      },
      // 上传分析详情查看
      showDetails(row, column, event){

      }
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
