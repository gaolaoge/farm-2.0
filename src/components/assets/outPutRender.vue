<template>
  <div class="outPut-wrapper">
    <div class="outPut-table" ref="outPutTable">
      <!--面包屑-->
      <div class="bread">
        <span v-for="item,index in bread.list"
              :key="index"
              @click="navChange(item.name)"
              class="h">
          {{ item.text }}
          <img src="@/icons/enter.png" alt="" class="img">
        </span>
      </div>
      <!--table-->
      <el-table
        :data="table.outPutData"
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
        <!--所属项目-->
        <el-table-column
          label="所属项目"
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
          width="200">
          <template slot-scope="scope">
                  <span>
                    {{ scope.row.project }}
                  </span>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column
          prop="fileSize"
          label="文件大小"
          sortable
          show-overflow-tooltip
          width="140" />
        <!--文件类型-->
        <el-table-column
          prop="fileType"
          label="文件类型"
          show-overflow-tooltip
          width="140" />
        <!--下载情况 -->
        <el-table-column
          prop="downLoadTime"
          label="下载情况"
          sortable
          show-overflow-tooltip
          v-if="table.nextTbaleType == 'layer'"
          width="140" />
        <!--下载次数 -->
        <el-table-column
          prop="downLoadTime"
          label="下载次数"
          sortable
          show-overflow-tooltip
          v-if="table.nextTbaleType != 'layer'"
          width="140" />
        <!--剩余有效期-->
        <el-table-column
          prop="date"
          label="剩余有效期（天）"
          sortable
          show-overflow-tooltip
          width="180" />
        <!--更新时间-->
        <el-table-column
          prop="upDate"
          label="更新时间"
          sortable
          show-overflow-tooltip
          width="240" />

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
        :page-size="table.pageSize"
        layout="prev, pager, next, jumper"
        :total="table.outPutTableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {
    assetsExportMain,
    assetsExportLayer,
    assetsExportFrame
  } from '@/api/api'
  import {
    consum,
    createDateFun
  } from '@/assets/common.js'

  export default {
    name: 'outPut',
    data(){
      return {
        table: {
          outPutData: [
            // {
            //   id: '',               //任务ID
            //   fileName: '',         //文件名
            //   project: '',          //所属项目
            //   fileSize: '',         //文件大小
            //   fileType: '',         //文件类型
            //   downLoadTime: '',     //已下载次数
            //   date: '',             //剩余有效期（天）
            //   upDate: '',           //更新时间
            // },
          ],
          outPutTableTotal: 0,
          pageIndex: 1,
          pageSize: 10,
          selectionList: [],            // 渲染输出选中项
          rowUuid: null,                // 选中行Uuid
          nextTbaleType: 'layer',
          objectName: null,             // 项目名
          layerObj: {},                 // 层名
          frameObj: {}                  // 帧名
        },
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
        }
      }
    },
    props: {
      searchInputVal: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 上传分析多选
      handleSelectionChange(val){
        this.table.selectionList = val
      },
      // 筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },
      // 主任务table 查看层任务
      seeRow(row){
        this.$emit('clearInput')
        this.table.rowUuid = row.itemUuid
        if(this.table.nextTbaleType == 'layer') {
          this.getLayerList()
          this.table.objectName = row.project
          this.table.layerObj = row
          this.bread.list.push({
            text: row.fileName,
            name: 'layer'
          })
        }
        if(this.table.nextTbaleType == 'frame') {
          this.getFrameList()
          this.table.frameObj = row
          this.bread.list.push({
            text: row.fileName,
            name: 'frame'
          })
        }
      },
      // 查询主任务
      async getList(){
        this.$emit('clearInput')
        // {
        //   keyword: '',         // 关键字
        //   pageIndex: '',
        //   pageSize: '',
        //   projectUuid: ''      // 选中项Uuid
        // }
        let t = `keyword=${this.searchInputVal}&pageIndex=${this.table.pageIndex}&pageSize=${this.table.pageSize}`,
            data = await assetsExportMain(t)
        this.table.main = true
        this.table.outPutData = data.data.data.map(curr => {
          return {
            id: curr.taskNo,                    // 任务ID
            fileName: curr.fileName,            // 文件名
            project: curr.projectName,          // 所属项目
            fileSize: '-',                      // 文件大小
            fileType: '文件夹',                      // 文件类型
            downLoadTime: '-',                   // 下载次数
            date: '-',                           // 剩余有效期（天）
            upDate: createDateFun(new Date(curr.updateTime)),                         // 更新时间,
            itemUuid: curr.taskUuid
          }
        })
        this.l.n = data.data.total
        this.table.outPutTableTotal = data.data.total
      },
      // 查询层任务
      async getLayerList(){
        // {
        //   keyword: '',         // 关键字
        //   pageIndex: '',
        //   pageSize: '',
        //   taskUuid: ''      // 选中项Uuid
        // }
        let t = `taskUuid=${this.table.rowUuid}&keyword=${this.searchInputVal}&pageIndex=${this.table.pageIndex}&pageSize=${this.table.pageSize}`,
            data = await assetsExportLayer(t)
        this.table.nextTbaleType = 'frame'
        this.table.outPutData = data.data.data.map(curr => {
          return {
            id: curr.layerNo,                    // 任务ID
            fileName: curr.layerName,            // 文件名
            project: this.table.objectName,      // 所属项目
            fileSize: curr.fileSize,             // 文件大小
            fileType: '文件夹',                   // 文件类型
            downLoadTime: '-',                   // 下载次数
            date: '',                            // 剩余有效期（天）
            upDate: createDateFun(new Date(curr.updateTime)),                          // 更新时间,
            itemUuid: curr.layerTaskUuid
          }
        })
        this.table.outPutTableTotal = data.data.total
      },
      // 查询帧任务
      async getFrameList(){
        // {
        //   keyword: '',           // 关键字
        //   pageIndex: '',
        //   pageSize: '',
        //   layerTaskUuid: ''      // 选中项Uuid
        // }
        let t = `layerTaskUuid=${this.table.rowUuid}&keyword=${this.searchInputVal}&pageIndex=${this.table.pageIndex}&pageSize=${this.table.pageSize}`,
            data = await assetsExportFrame(t)
        this.table.nextTbaleType = 'null'
        this.table.outPutData = data.data.data.map(curr => {
          return {
            fileName: curr.fileName,                        // 文件名
            project: this.table.objectName,                 // 所属项目
            fileSize: curr.fileSize,                        // 文件大小
            fileType: curr.fileName.split('.')[1],          // 文件类型
            downLoadTime: curr.downloadCount,               // 下载次数
            date: curr.date == 0 ? '-' : consum(new Date().getTime() - curr.indate),                            // 剩余有效期（天）
            upDate: createDateFun(new Date(curr.updateTime)),                        // 更新时间,
          }
        })
        this.table.outPutTableTotal = data.data.total
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
      }
    },
    mounted() {
      this.getList()
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
    color: rgba(255, 255, 255, 0.6);
    line-height: 32px;
    .ll {
      color: rgba(0, 97, 255, 1);
    }
  }

  /deep/.el-table__body-wrapper {
    height: calc(100vh - 329px);
  }

  .outPut-table {
    overflow: hidden;
    .bread {
      height: 27px;
      background: rgba(33, 41, 51, 0.59);
      border-radius: 4px;
      margin: 20px 10px 0px;
      width: calc(100% - 20px);
      padding: 0px 20px;
      box-sizing: border-box;
      .h {
        display: inline-block;
        font-size: 12px;
        line-height: 27px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 2px;
        cursor: pointer;
        .img {
          vertical-align: middle;
          margin-left: 2px;
        }
        &:nth-last-of-type(1) {
          color: rgba(255, 255, 255, 1);
          .img {
            display: none;
          }
        }
      }
    }
  }

  .page {
    position: absolute;
    bottom: 30px;
    left: 25px;
  }
</style>
