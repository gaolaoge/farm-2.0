<template>
  <div class="messageSetting">
    <el-table
      :data="tableData"
      style="width: 100%">

      <el-table-column
        prop="name"
        label="通知名称"
        show-overflow-tooltip
        width="220" />

      <el-table-column
        prop="desc"
        label="通知描述"
        show-overflow-tooltip
        width="600" />

      <el-table-column
        label="通知方式">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkList">
            <el-checkbox label="站内信" />
            <el-checkbox label="邮件" />
            <el-checkbox label="短信" />
          </el-checkbox-group>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'messageSetting',
    data(){
      return {
        tableData: [
          {
            name: '添加任务通知',
            desc: '任务[任务ID_场景名]已添加到渲染任务列表。',
            checkList: ['邮件']
          },
          {
            name: '渲染染完成通知',
            desc: '任务[任务ID_场景名]渲染完成，渲染结果将保留20天，请您及时登录系统下载。',
            checkList: ['邮件']
          },
          {
            name: '单帧超时提醒通知',
            desc: '任务[任务ID_场景名]第[X]帧已渲染超[X]小时，请您及时登录系统查看。',
            checkList: ['邮件']
          },
          {
            name: '单帧超时停止通知',
            desc: '任务[任务ID_场景名]第[X]帧在因渲染超时已自动暂停渲染，请您及时登录系统查看。',
            checkList: ['邮件']
          },
          {
            name: '单帧渲染失败通知',
            desc: '任务[任务ID_场景名]第[X]帧渲染失败，请您及时登录系统查看。',
            checkList: ['邮件']
          },
          {
            name: '单个任务渲染预警',
            desc: '任务[任务ID_场景名]累计渲染费用已达到[X]金币，请您及时登录系统查看。',
            checkList: ['邮件']
          },
        ],
      }
    },

  }
</script>

<style lang="less" scoped>
  .messageSetting {
    height: calc(100vh - 203px);
    padding: 10px;
    box-sizing: border-box;
  }
  /deep/.el-table .el-table__row:hover::after { display: none }
</style>
