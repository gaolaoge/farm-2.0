<template>
  <div class="outPut-wrapper">
    <div class="outPut-table"
         ref="outPutTable">
      <!--面包屑-->
      <div class="bread">
        <span v-for="(item,index) in nav"
              :key="index"
              class="h">
          {{ item }}
          <img src="@/icons/enter.png" alt="" class="img">
        </span>
      </div>
      <!--table-->
      <el-table
        :data="table.tableData"
        @selection-change="handleSelectionChange"
        @filter-change="filterHandler"
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
          prop="size"
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
          prop="validPeriod"
          label="剩余有效期（天）"
          sortable
          show-overflow-tooltip
          width="220" />
        <!--更新时间-->
        <el-table-column
          prop="updateTime"
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
          tableData: [],
          total: 0,
          pageIndex: 1,
          selectionList: [],            // table选中项
          rowUuid: null,                // 选中行Uuid
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
        nav: ['资产'],
        path: '/',        // 当前位置
      }
    },
    props: {
      searchInputVal: {
        type: String,
        default: ''
      }
    },
    watch: {
      'socket_backS_msg': {
        handler: function(e){
          let data = JSON.parse(e.data)
          if (data.code != 208) return false
          if (data.msg == '601') {
            // completedTime: 1597815711001  // 完成时间  => 为0修改名字
            // fileName: "Makefile.Release"
            // fileType: "Release"
            // size: 351602
            // updateTime: 1597815708850     // 更新时间
            // validPeriod: 1727777014       // 有效期
            this.table.tableData = data.data.map(item => {
              return Object.assign(item, {
                'updateTime': item.updateTime,
                'completedTime': item.completedTime,
                'validPeriod': item.validPeriod
              })
            })
          }else if (data.msg == '6031') {
            // 新建文件夹 创建成功
            messageFun('success', '创建成功')
            this.getAssetsCatalog(this.path, this.searchInputVal)
          }else if (data.msg == '6032') {
            // 新建文件夹 文件夹名已存在
            messageFun('info', '文件名已存在，无法创建')
          }
        },
      }
    },
    methods: {
      // 翻页
      handleCurrentChange(val){

      },
      // 多选
      handleSelectionChange(val){
        this.table.selectionList = val
      },
      // 筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },

      // 上传
      uploadFun(type){
        this.$store.commit('WEBSOCKET_PLUGIN_SEND', {
          transferType: type == 'file' ? 0 : 1,
          userID: this.user.id,
          networkPath: this.path
        })
      },
      // 新建文件夹
      createFolder(){
        this.$prompt('请输入新文件夹名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
          .then(({ value }) => {
            this.$store.commit('WEBSOCKET_BACKS_SEND', {
              'code': 603,
              'customerUuid': this.user.id,
              filePath: this.path,
              newFileName: value
            })
          })
          .catch(() => null)
      },
      // 下载
      downloadFile(){

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
        if(!this.table.selectionList.length) return false
        this.$store.commit('WEBSOCKET_BACKS_SEND', {
          'code': 604,
          'customerUuid': this.user.id,
          filePathList: this.table.selectionList.map(item => this.path + item.fileName)
        })
      },
      // 获取各级目录
      getAssetsCatalog(filePath, keyword){
        if(!this.socket_backS) setTimeout(() => this.getAssetsCatalog(filePath, keyword), 1000)
        else this.$store.commit('WEBSOCKET_BACKS_SEND', {
          'code': 601,
          'customerUuid': this.user.id,
          keyword,
          filePath
        })
      }
    },
    mounted() {
      this.getAssetsCatalog('', this.searchInputVal)
    },
    computed: {
      ...mapState(['user', 'socket_backS', 'socket_backS_msg'])
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
