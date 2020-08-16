<template>
  <div class="outPut-wrapper">
    <div class="outPut-table"
         ref="outPutTable">
      <!--面包屑-->
      <div class="bread">
        <span v-for="(item,index) in bread.list"
              :key="index"
              @click="navChange(item.name)"
              class="h">
          {{ item.text }}
          <img src="@/icons/enter.png" alt="" class="img">
        </span>
      </div>
      <!--table-->
      <el-table
        :data="table.tableData"
        @selection-change="handleSelectionChange"
        @filter-change="filterHandler"
        @row-click="seeRow"
        class="o"
        :border=true
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          show-overflow-tooltip
          min-width="58"
          width="58" />
        <!--文件名-->
        <el-table-column
          prop="fileName"
          label="文件名"
          sortable
          show-overflow-tooltip
          min-width="180" />
        <!--文件大小-->
        <el-table-column
          prop="fileSize"
          label="文件大小"
          sortable
          show-overflow-tooltip
          width="120" />
        <!--文件类型-->
        <el-table-column
          prop="fileType"
          label="文件类型"
          show-overflow-tooltip
          width="140" />
        <!--剩余有效期-->
        <el-table-column
          prop="remainingValidity"
          label="剩余有效期（天）"
          sortable
          show-overflow-tooltip
          width="220" />
        <!--更新时间-->
        <el-table-column
          prop="upDate"
          label="更新时间"
          sortable
          show-overflow-tooltip
          width="280" />

      </el-table>
    </div>
    <!--备注-->
    <div class="l">
      {{ l.x }} <span class="ll"> {{ l.n }} </span> {{ l.p }}
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        :current-page.sync="table.pageIndex"
        @current-change="handleCurrentChange"
        :page-size="table.pageSize"
        layout="prev, pager, next, jumper"
        :total="table.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    uploadTabGetList
  } from '@/api/assets-api'
  import {
    createDateFun,
    messageFun
  } from '@/assets/common.js'
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'outPut',
    data(){
      return {
        table: {
          tableData: [
            // {
            //   fileName: '',              //文件名
            //   fileSize: '',              //文件大小
            //   fileType: '',              //文件类型
            //   remainingValidity: '',     //剩余有效期（天）
            //   upDate: '',                //更新时间
            // },
             {
               fileName: '1001_CJ1_第一层',
               fileSize: '3kb',
               fileType: '文件夹',
               remainingValidity: '20',
               upDate: '2014-01-25 00:00:00'
             },
          ],
          total: 0,
          pageIndex: 1,
          selectionList: [],            // table选中项
          rowUuid: null,                // 选中行Uuid
          nextTbaleType: 'layer',
          objectName: null,             // 项目名
          layerObj: {},                 // 层名
          frameObj: {}                  // 帧名
        },
        projectList:[],
        l: {
          x: '已加载全部，共',
          n: '0',
          p: '个'
        },
        bread: {
          list: [
            {
              text: '资产',
              name: 'main'
            }
          ],
        },
        path: '/',        // 当前位置
      }
    },
    props: {
      searchInputVal: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 翻页
      handleCurrentChange(val){
        if(this.table.nextTbaleType == 'layer'){ this.getList() }
        else if(this.table.nextTbaleType == 'frame'){ this.getLayerList() }
        else { this.getFrameList() }
      },
      // 多选
      handleSelectionChange(val){
        this.table.selectionList = val
      },
      // 筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },

      // nav change
      navChange(name){
        switch(name){
          case 'main':
            this.table.nextTbaleType = 'layer'
            this.table.objectName = null
            this.table.layerObj = {}
            this.table.frameObj = {}
            this.bread.list.splice(1,2)
            this.getList()
            break
          case 'layer':
            this.table.nextTbaleType = 'frame'
            this.table.frameObj = {}
            this.bread.list.splice(2,1)
            this.table.rowUuid = this.table.layerObj.itemUuid
            this.getLayerList()
            break
          case 'frame':
            break
        }
      },
      // 获取列表
      async getList(){
        let val = `path=${this.path}&keyword=${this.searchInputVal}&pageIndex=${this.table.pageIndex}&pageSize=10`
        let data = await uploadTabGetList(val)
        if(data.data.code == 200){
          this.table.tableData = data.data.data.map(item => item)
          this.table.total = data.data.total
        }
      },
      // 上传
      uploadFun(type){
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          transferType: type == 'file' ? 0 : 1,
          userID: this.user.id,
          networkPath: '/'
        })
      },
      // 新建文件夹
      createFolder(){

      },
      // 下载
      downloadFile(){
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          'transferType': 2,
          'userID': this.user.id,
          'fileList': []
        })
      },
      // 移动到
      moveFile(){

      },
      // 复制到
      copyFile(){

      },
      // 重命名
      rename(){

      },
      // 解压
      unzip(){

      },
      // 删除
      deleteFile(){

      }
    },
    mounted() {
      this.getList()
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less" scoped>
  .l {
    position: absolute;
    right: 30px;
    bottom: 25px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(22, 29, 37, 0.6);
    line-height: 32px;
    .ll {
      color: rgba(0, 97, 255, 1);
    }
  }

  /deep/.el-table__body-wrapper {
    height: calc(100vh - 395px);
    tr {
      cursor: pointer;
    }
  }



  .page {
    margin: 4px 25px 30px;
  }
  .outPut-wrapper {
    overflow: hidden;
  }

  @media screen and (orientation: portrait) {
    /deep/.el-table__body-wrapper {
      height: calc(100vw - 395px);
    }
  }
</style>
