<template>
  <div class="outPut-wrapper">
    <!--table-->
    <div class="outPut-table" ref="outPutTable">

      <!--面包屑-->
      <div class="bread">
        <span v-for="item,index in bread.list"
              :key="index"
              class="h">
          {{ item.text }}
          <img :src="item.img" alt="" v-if="item.img" class="img">
        </span>
        <span class="h k">
          {{ bread.currentText }}
        </span>
      </div>

      <el-table
        :data="table.outPutData"
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
        <!--已下载次数 -->
        <el-table-column
          prop="downLoadTime"
          label="已下载次数"
          sortable
          show-overflow-tooltip
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
        layout="prev, pager, next, jumper"
        :total="table.outPutTableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
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
            {
              id: '000001',
              fileName: '示例文件1',
              project: '同桌的你',
              fileSize: '370MB',
              fileType: '.iff',
              downLoadTime: '7',
              date: '54',
              upDate: '2020-03-22 18:22:34',
            },
            {
              id: '000002',
              fileName: '示例文件2',
              project: '同桌的你',
              fileSize: '370MB',
              fileType: '.iff',
              downLoadTime: '7',
              date: '54',
              upDate: '2020-03-22 18:22:34',
            },
          ],
          outPutTableTotal: 82,
          selectionList: [],            //渲染输出选中项
        },
        l: {
          x: '已加载全部，共',
          n: '2',
          p: '个'
        },
        bread: {
          list: [
            {
              text: '资产',
              img: require('@/icons/enter.png')
            },
            {
              text: '1001_CJ1',
              img: require('@/icons/enter.png')
            }
          ],
          currentText: '一层'
        }
      }
    },
    methods: {
      // 上传分析多选
      handleSelectionChange(val){
        this.table.selectionList = val
      },
      //筛选条件发生变化
      filterHandler(value, row, column){
        console.log(value, row, column)
      },
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
        &.k {
          color: rgba(255, 255, 255, 1);
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
