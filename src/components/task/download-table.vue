<template>
  <div class="download-table">
    <div ref="downLoadTable">
      <el-table
        :data="table.RenderDownloadData"
        @selection-change="RenderDownloadSelectionChange"
        class="r"
        :border=true
        @row-click="showDetails"
        row-key="id"
        :tree-props="{children: 'children'}"
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          width="92" />

        <el-table-column
          prop="id"
          label="任务ID"
          sortable
          show-overflow-tooltip
          width="100" />

        <el-table-column
          prop="sceneName"
          label="场景名"
          show-overflow-tooltip
          width="180" />

        <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip
          width="110"/>

        <el-table-column
          label="渲染进度"
          sortable
          show-overflow-tooltip
          width="230">
          <template slot-scope="scope">
            <div class="progressBar" />
            {{ scope.row.renderingProgress }}
          </template>
        </el-table-column>

        <el-table-column
          prop="viewProject"
          label="所属项目"
          show-overflow-tooltip
          width="180" />

        <el-table-column
          prop="rendering"
          sortable
          width="100"
          show-overflow-tooltip
          label="渲染中" />

        <el-table-column
          prop="wait"
          sortable
          width="100"
          show-overflow-tooltip
          label="等待" />

        <el-table-column
          prop="timeOut"
          sortable
          width="100"
          show-overflow-tooltip
          label="暂停" />

        <el-table-column
          prop="carryOut"
          sortable
          width="100"
          show-overflow-tooltip
          label="完成" />

        <el-table-column
          prop="failure"
          label="失败"
          width="100"
          show-overflow-tooltip
          sortable />

        <el-table-column
          prop="renderingTime"
          label="渲染时长"
          sortable
          show-overflow-tooltip
          width="180" />

        <el-table-column
          prop="renderingCost"
          label="渲染费用（金币）"
          sortable
          show-overflow-tooltip
          width="156"/>

        <el-table-column
          prop="frameRange"
          label="帧范围"
          sortable
          show-overflow-tooltip
          width="100" />

        <el-table-column
          prop="intervalFrame"
          label="间隔帧"
          sortable
          show-overflow-tooltip
          width="100" />

        <el-table-column
          prop="camera"
          width="100"
          sortable
          show-overflow-tooltip
          label="相机" />

        <el-table-column
          prop="layerName"
          label="层名"
          sortable
          show-overflow-tooltip
          width="100" />

        <el-table-column
          prop="downloadStatus"
          label="下载情况"
          show-overflow-tooltip
          width="110" />

        <el-table-column
          prop="renderingStartTime"
          label="渲染开始时间"
          sortable
          show-overflow-tooltip
          width="180"/>

        <el-table-column
          prop="renderingEndTime"
          label="渲染结束时间"
          sortable
          show-overflow-tooltip
          width="180" />

        <el-table-column
          prop="founder"
          label="创建人"
          show-overflow-tooltip
          width="100" />

        <el-table-column
          prop="creationTime"
          label="创建时间"
          sortable
          show-overflow-tooltip
          width="200"/>

      </el-table>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="table.renderTableTotal">
      </el-pagination>
    </div>
    <!--详情抽屉-->
    <farmDrawer :showDrawer="showDrawer" @closeDrawer="closeDrawer"/>
  </div>
</template>

<script>
  import farmDrawer from '@/components/task/farm-drawer'

  export default {
    name: 'download-table',
    data(){
      return {
        table: {
          RenderDownloadData: [
            // {
            //   id: '',                   //任务ID
            //   sceneName: '',           //场景名
            //   status: '',               //状态
            //   renderingProgress: '',    //渲染进度
            //   viewProject: '',          //所属项目
            //   rendering: '',            //渲染中
            //   wait: '',                 //等待
            //   timeOut: '',              //暂停
            //   carryOut: '',             //完成
            //   failure: '',              //失败
            //   renderingTime: '',        //渲染时长
            //   renderingCost: '',        //渲染费用（金币）
            //   frameRange: '',           //帧范围
            //   intervalFrame: '',        //间隔帧
            //   camera: '',               //相机
            //   layerName: '',            //层名
            //   downloadStatus: '',       //下载情况
            //   renderingStartTime: '',   //渲染开始时间
            //   renderingEndTime: '',     //渲染结束时间
            //   founder: '',              //创建人
            //   creationTime: ''          //创建时间
            // },
            {
              id: '10001',
              sceneName: '场景.ma',
              status: '渲染中',
              renderingProgress: '276/1286',
              viewProject: '少年的你项目组',
              rendering: '1',
              wait: '1',
              timeOut: '1',
              carryOut: '1',
              failure: '1',
              renderingTime: '2小时23分34秒',
              renderingCost: '239.25',
              frameRange: '1-24',
              intervalFrame: '1',
              camera: '摄像机一',
              layerName: '第一层',
              downloadStatus: '待下载',
              renderingStartTime: '2020-03-02 00:23:46',
              renderingEndTime: '2020-03-02 00:59:41',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:56'
            },
            {
              id: '10002',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              renderingProgress: '276/1286',
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
              camera: '摄像机一',
              layerName: '第一层',
              downloadStatus: '待下载',
              renderingStartTime: '2020-03-02 00:23:46',
              renderingEndTime: '2020-03-02 00:59:41',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:56',
              children: [
                {
                  id: '10432003',
                  sceneName: '场景.ma',
                  status: '渲染中',
                  renderingProgress: '276/1286',
                  viewProject: '少年的你项目组',
                  rendering: '1',
                  wait: '1',
                  timeOut: '1',
                  carryOut: '1',
                  failure: '1',
                  renderingTime: '2小时23分34秒',
                  renderingCost: '239.25',
                  frameRange: '1-24',
                  intervalFrame: '1',
                  camera: '摄像机一',
                  layerName: '第一层',
                  downloadStatus: '待下载',
                  renderingStartTime: '2020-03-02 00:23:46',
                  renderingEndTime: '2020-03-02 00:59:41',
                  founder: '管理员',
                  creationTime: '2020-01-01 00:01:56'
                },
                {
                  id: '12342003',
                  sceneName: '场景.ma',
                  status: '渲染中',
                  renderingProgress: '276/1286',
                  viewProject: '少年的你项目组',
                  rendering: '1',
                  wait: '1',
                  timeOut: '1',
                  carryOut: '1',
                  failure: '1',
                  renderingTime: '2小时23分34秒',
                  renderingCost: '239.25',
                  frameRange: '1-24',
                  intervalFrame: '1',
                  camera: '摄像机一',
                  layerName: '第一层',
                  downloadStatus: '待下载',
                  renderingStartTime: '2020-03-02 00:23:46',
                  renderingEndTime: '2020-03-02 00:59:41',
                  founder: '管理员',
                  creationTime: '2020-01-01 00:01:56'
                }
              ]
            },
            {
              id: '10004',
              sceneName: '场景场景场景场景场景场景场景.ma',
              status: '渲染中',
              renderingProgress: '276/1286',
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
              camera: '摄像机一',
              layerName: '第一层',
              downloadStatus: '待下载',
              renderingStartTime: '2020-03-02 00:23:46',
              renderingEndTime: '2020-03-02 00:59:41',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:56',
              children: [
                {
                  id: '56232233',
                  sceneName: '场景.ma',
                  status: '渲染中',
                  renderingProgress: '276/1286',
                  viewProject: '少年的你项目组',
                  rendering: '1',
                  wait: '1',
                  timeOut: '1',
                  carryOut: '1',
                  failure: '1',
                  renderingTime: '2小时23分34秒',
                  renderingCost: '239.25',
                  frameRange: '1-24',
                  intervalFrame: '1',
                  camera: '摄像机一',
                  layerName: '第一层',
                  downloadStatus: '待下载',
                  renderingStartTime: '2020-03-02 00:23:46',
                  renderingEndTime: '2020-03-02 00:59:41',
                  founder: '管理员',
                  creationTime: '2020-01-01 00:01:56'
                },
              ]
            }
          ],
          renderSelectionList: [],      //渲染下载选中项
          renderTableTotal: 67,
        },
        showDrawer: false
      }
    },
    methods: {
      // 渲染下载多选
      RenderDownloadSelectionChange(val){
        this.table.renderSelectionList = val
      },
      // 渲染下载详情查看
      showDetails(row, column, event){
        // 若事件承受者为项目组
        if(row.children) return false
        //打开抽屉
        this.showDrawer = true
        let tableDomList = this.$refs.downLoadTable.getElementsByClassName('el-table__row'),
            d = this.$refs.downLoadTable.getElementsByClassName('farmTableSelected')[0],
            index_ = this.table.RenderDownloadData.findIndex(curr_ => curr_.id == row.id )
        if(d) d.classList.remove('farmTableSelected')
        // 当选中行为children行
        if(index_ == -1){
          let n = 0
          this.table.RenderDownloadData.find((curr,inde) => {
            n ++
            if(curr.children){
              return -1 < curr.children.findIndex((c,i) => {
                n ++
                return c.id == row.id
              })
            }
          })
          index_ = -- n
        }
        tableDomList[index_].classList.add('farmTableSelected')
      },
      // 渲染下载关闭详情
      closeDrawer(){
        this.showDrawer = false
        let d = this.$refs.downLoadTable.getElementsByClassName('farmTableSelected')[0]
        d.classList.remove('farmTableSelected')
      }
    },
    components: {
      farmDrawer
    }
  }
</script>

<style lang="less" scoped>
  .download-table {
    position: relative;
    height: 100%;
    .page {
      position: absolute;
      left: 25px;
      bottom: 30px;
    }
  }
</style>
