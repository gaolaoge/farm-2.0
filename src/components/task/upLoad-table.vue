<template>
  <div class="upload-table" ref="uploadTable">
    <el-table
      :data="table.UploadAnalysisData"
      @selection-change="handleSelectionChange"
      @filter-change="filterHandler"
      @row-click="showDetails"
      class="u"
      :border=true
      style="width: 100%">

      <el-table-column
        type="selection"
        align="right"
        show-overflow-tooltip
        min-width="58"
        width="58" />

      <el-table-column
        prop="id"
        label="任务ID"
        sortable
        show-overflow-tooltip
        width="100" />

      <el-table-column
        prop="scenesName"
        label="场景名"
        show-overflow-tooltip
        min-width="180" />

      <el-table-column
        label="状态"
        show-overflow-tooltip
        :filters="[
                  {text: '全选', value: '上传中'},
                  {text: '待设置参数', value: '待设置参数'},
                  {text: '上传中', value: '上传暂停'},
                  {text: '上传失败', value: '上传失败'},
                  {text: '分析中', value: '分析警告'},
                  {text: '分析警告', value: '上传中...'},
                  {text: '上传失败', value: '上中'},
                 ]"
        width="120">
        <template slot-scope="scope">
                  <span style="color: tomato;">
                    {{ scope.row.status }}
                  </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="project"
        label="所属项目"
        show-overflow-tooltip
        :filters="[
                  {text: '少年的你项目组', value: '少年的你项目组'},
                 ]"
        width="200" />

      <el-table-column
        prop="startingTime"
        label="分析开始时间"
        sortable
        show-overflow-tooltip
        width="180" />

      <el-table-column
        prop="endTime"
        label="分析结束时间"
        sortable
        show-overflow-tooltip
        width="180" />

      <el-table-column
        prop="founder"
        label="创建人"
        show-overflow-tooltip
        :filters="[
                  {text: '管理员', value: '管理员'},
                 ]"
        width="100" />

      <el-table-column
        prop="creationTime"
        label="创建时间"
        sortable
        show-overflow-tooltip
        width="180" />

    </el-table>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        :total="table.uploadTableTotal">
      </el-pagination>
    </div>
    <!--详情抽屉-->
    <farmDrawer :showDrawer="showDrawer" @closeDrawer="closeDrawer"/>
  </div>
</template>

<script>
  import farmDrawer from '@/components/task/farm-drawer'

  export default {
    name: 'upload-table',
    data(){
      return {
        table: {
          UploadAnalysisData: [
            // {
            //   id: '',               //任务ID
            //   scenesName: '',       //场景名
            //   status: '',           //状态
            //   project: '',          //所属项目
            //   startingTime: '',     //分析开始时间
            //   endTime: '',          //分析结果时间
            //   founder: '',          //创建人
            //   creationTime: '',     //创建时间
            //   source: '',           //来源
            //   taskMode: '',         //任务模式
            //   wayOfAdding: ''       //添加方式
            // },
            {
              id: '10001',
              scenesName: 'CJ1CJ1CJ1CJ1CJ1CJ1CJ1CJ1CJ1CJ1CJ1.ma',
              status: '上传中...',
              project: '少年的你项目组少年的你项目组少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10002',
              scenesName: 'CJ1.ma',
              status: '上传暂停',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10003',
              scenesName: 'CJ1.ma',
              status: '分析中...',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10004',
              scenesName: 'CJ1.ma',
              status: '上传失败',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10005',
              scenesName: 'CJ1.ma',
              status: '分析警告',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10006',
              scenesName: 'CJ1.ma',
              status: '分析失败',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10007',
              scenesName: 'CJ1.ma',
              status: '待设置参数',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10008',
              scenesName: 'CJ1.ma',
              status: '上传中',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10009',
              scenesName: 'CJ1.ma',
              status: '上传中',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
            {
              id: '10010',
              scenesName: 'CJ1.ma',
              status: '上传中',
              project: '少年的你项目组',
              startingTime: '2020-03-02 00:23:46',
              endTime: '2020-04-04 00:56:23',
              founder: '管理员',
              creationTime: '2020-01-01 00:01:02',
              source: '网页端',
              taskMode: '专业渲染',
              wayOfAdding: '本地文件选择'
            },
          ],
          uploadTableTotal: 82,
          selectionList: [],            //上传分析选中项
        },
        showDrawer: false,

      }
    },
    methods: {
      // 上传分析多选
      handleSelectionChange(val){
        this.table.selectionList = val
        this.closeDrawer()
      },
      //筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },
      // 上传分析详情查看
      showDetails(row, column, event){
        this.showDrawer = true
        let tableDomList = this.$refs.uploadTable.getElementsByClassName('el-table__row'),
          d = this.$refs.uploadTable.getElementsByClassName('farmTableSelected')[0],
          index_ = this.table.UploadAnalysisData.findIndex(curr_ => curr_.id == row.id )
        if(d) d.classList.remove('farmTableSelected')
        tableDomList[index_].classList.add('farmTableSelected')
      },
      // 关闭抽屉
      closeDrawer(){
        this.showDrawer = false
        let d = this.$refs.uploadTable.getElementsByClassName('farmTableSelected')[0]
        d.classList.remove('farmTableSelected')
      }
    },
    watch: {

    },
    components: {
      farmDrawer
    }
  }
</script>

<style lang="less" scoped>
  .upload-table {
    position: relative;
    height: 100%;
    .page {
      position: absolute;
      left: 25px;
      bottom: 30px;
    }
  }
</style>
