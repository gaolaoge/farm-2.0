<template>
  <div class="download-table">
    <div ref="downLoadTable">
      <el-table
        :data="table.RenderDownloadData"
        @select="tableSelect"
        @selection-change="RenderDownloadSelectionChange"
        @select-all="selectAll"
        @row-click="showDetails"
        :row-class-name="tableRowStyle"
        class="r"
        :border=true
        row-key="rowId"
        :tree-props="{children: 'children'}"
        ref="renderTableImportant"
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
          show-overflow-tooltip
          width="100" />
        <!--场景名-->
        <el-table-column
          prop="sceneName"
          label="场景名"
          show-overflow-tooltip
          width="200" />
        <!--状态-->
        <el-table-column
          label="状态"
          show-overflow-tooltip
          width="110">
          <template slot-scope="scope">
            <span v-if="scope.row.status == '等待' || scope.row.status == '渲染放弃' || scope.row.status == '渲染中'">
              {{ scope.row.status }}
            </span>
            <span v-if="scope.row.status == '渲染结束'" style="color: rgba(0, 227, 255, 1)">
              {{ scope.row.status }}
            </span>
            <span v-if="scope.row.status == '渲染暂停'" style="color: rgba(229, 199, 138, 1)">
              {{ scope.row.status }}
            </span>
          </template>
        </el-table-column>
        <!--渲染进度-->
        <el-table-column
          label="渲染进度"
          sortable
          show-overflow-tooltip
          width="230">
          <template slot-scope="scope">
            <el-progress :percentage="isNaN(scope.row.percent) ? 0 : scope.row.percent"
                         :show-text="false"
                         class="progressL" />
            <span clas="progressS">
              {{ scope.row.renderingProgress }}
            </span>
          </template>
        </el-table-column>
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
          show-overflow-tooltip
          label="渲染中" />
        <!--等待-->
        <el-table-column
          prop="wait"
          sortable
          width="100"
          show-overflow-tooltip
          label="等待" />
        <!--暂停-->
        <el-table-column
          prop="timeOut"
          sortable
          width="100"
          show-overflow-tooltip
          label="暂停" />
        <!--完成-->
        <el-table-column
          prop="carryOut"
          sortable
          width="100"
          show-overflow-tooltip
          label="完成" />
        <!--失败-->
        <el-table-column
          prop="failure"
          label="失败"
          width="100"
          show-overflow-tooltip
          sortable />
        <!--渲染时长-->
        <el-table-column
          prop="renderingTime"
          label="渲染时长"
          sortable
          show-overflow-tooltip
          width="180" />
        <!--渲染费用（金币）-->
        <el-table-column
          prop="renderingCost"
          label="渲染费用（金币）"
          sortable
          show-overflow-tooltip
          width="156"/>
        <!--帧范围-->
        <el-table-column
          prop="frameRange"
          label="帧范围"
          sortable
          show-overflow-tooltip
          width="100" />
        <!--间隔帧-->
        <el-table-column
          prop="intervalFrame"
          label="间隔帧"
          sortable
          show-overflow-tooltip
          width="100" />
        <!--相机-->
        <el-table-column
          prop="camera"
          width="100"
          sortable
          show-overflow-tooltip
          label="相机" />
        <!--层名-->
        <el-table-column
          prop="layerName"
          label="层名"
          sortable
          show-overflow-tooltip
          width="100" />
        <!--下载情况-->
        <el-table-column
          label="下载情况"
          show-overflow-tooltip
          width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.downloadStatus == '待下载'" style="color: #F90023">
              {{ scope.row.downloadStatus }}
            </span>
            <span v-if="scope.row.downloadStatus == '已下载'" style="color: rgba(0, 97, 255, 1)">
              {{ scope.row.downloadStatus }}
            </span>
            <span v-if="scope.row.downloadStatus == '部分下载'" style="color: #E5C78A">
              {{ scope.row.downloadStatus }}
            </span>
          </template>
        </el-table-column>
        <!--渲染开始时间-->
        <el-table-column
          prop="renderingStartTime"
          label="渲染开始时间"
          sortable
          show-overflow-tooltip
          width="180"/>
        <!--渲染结束时间-->
        <el-table-column
          prop="renderingEndTime"
          label="渲染结束时间"
          sortable
          show-overflow-tooltip
          width="180" />
        <!--创建人-->
        <el-table-column
          prop="founder"
          label="创建人"
          show-overflow-tooltip
          width="100" />
        <!--创建时间-->
        <el-table-column
          prop="creationTime"
          label="创建时间"
          sortable
          show-overflow-tooltip
          width="200"/>

      </el-table>
    </div>
    <!--暂无数据-->
    <div class="nullTableData" v-if="!table.RenderDownloadData.length">
      <img src="@/icons/tableDataNull.png" alt="">
      <span>
        暂无数据
      </span>
    </div>
    <!--分页-->
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        :current-page.sync="table.current"
        :total="table.renderTableTotal">
      </el-pagination>
    </div>
    <!--详情抽屉-->
    <farmDrawer :showDrawer="showDrawer"
                :typeInfo="itemName"
                :taskData="drawerTaskData"
                @closeDrawer="closeDrawer"/>
  </div>
</template>

<script>
  import farmDrawer from '@/components/task/farm-drawer'
  import {
    getRenderTableList,
    itemStart,
    itemArchive,
    itemDelete
  } from '@/api/api'
  import {
    mapState
  } from 'vuex'
  import {
    createDateFun,
    consum,
    messageFun,
    itemDownloadStatus
  } from '@/assets/common.js'

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
            //   children: [
            //   {
            //     id: '56232233',
            //     sceneName: '场景.ma',
            //     status: '渲染中',
            //     renderingProgress: '276/1286',
            //     viewProject: '少年的你项目组',
            //     rendering: '1',
            //     wait: '1',
            //     timeOut: '1',
            //     carryOut: '1',
            //     failure: '1',
            //     renderingTime: '2小时23分34秒',
            //     renderingCost: '239.25',
            //     frameRange: '1-24',
            //     intervalFrame: '1',
            //     camera: '摄像机一',
            //     layerName: '第一层',
            //     downloadStatus: '待下载',
            //     renderingStartTime: '2020-03-02 00:23:46',
            //     renderingEndTime: '2020-03-02 00:59:41',
            //     founder: '管理员',
            //     creationTime: '2020-01-01 00:01:56'
            //   },
            //   ]
            // },
          ],
          renderSelectionList: [],      // 渲染下载选中项
          renderTableTotal: 0,          // 总数
          current: 1,                   // 当前页数
          pageSize: 10,
          unfoldList: []                // 展开项
        },
        showDrawer: false,
        itemName: 'result',
        drawerTaskData: null,
        searchInput: ''
      }
    },
    methods: {
      // table 行样式
      tableRowStyle({row, rowIndex}){
        switch(row.status){
          case '渲染暂停':
          case '等待':
            return 'warning-row style-row'
            break
          // case '分析失败':
          //   return 'error-row style-row'
            break
          case '渲染结束':
            return 'wait-row style-row'
            break
        }
      },
      // 关键字检索
      searchFun(val){
        this.searchInput = val
        this.getList()
      },
      // 翻页
      handleCurrentChange(val){
        this.table.current = val
        this.getList()
      },
      // 【非业务逻辑】手动勾选数据行 Checkbox 时触发
      tableSelect(selection, row){
        let result = selection.some(curr => curr.rowId == row.rowId),     // 【选中事件】or【取消事件】
            tableData = this.table.RenderDownloadData,
            allSonSelected = false,
            fatherSelected = false

        // 事件触发在子项
        if('FatherId' in row && result){
          this.table.renderSelectionList.push(row)
          // 判断该组子项是否已全部选中进而选中父项
          allSonSelected = tableData[row.FatherIndex]['children'].every(son => selection.some(item => item.rowId == son.rowId))
          if(allSonSelected){ fatherSelected = selection.some(item => tableData[row.FatherIndex].rowId == item.rowId ) }
          // 将父级推入选中项
          if(allSonSelected && !fatherSelected) {
            this.$refs.renderTableImportant.toggleRowSelection(tableData[row.FatherIndex],true)
            this.table.renderSelectionList.push(tableData[row.FatherIndex])
          }
        }
        if('FatherId' in row && !result){
          this.table.renderSelectionList.splice(selection.findIndex(curr => curr.rowId == row.rowId),1)
          // 父项是否被选中 取消选中
          fatherSelected = selection.findIndex(item => tableData[row.FatherIndex].rowId == item.rowId )
          // 取消父级选中状态
          if(fatherSelected != -1) {
            this.$refs.renderTableImportant.toggleRowSelection(tableData[row.FatherIndex],false)
            this.table.renderSelectionList.splice(fatherSelected,1)
          }
        }

        // 事件触发在父项
        if(!('FatherId' in row) && result){
          this.table.renderSelectionList.push(row)
          // 勾选全部子项
          tableData[row.selfIndex]['children'].forEach(son => {
            // 将此子项勾选
            if(!selection.some(item => item.rowId == son.rowId)) {
              this.$refs.renderTableImportant.toggleRowSelection(son,true)
              this.table.renderSelectionList.push(son)
            }
          })
        }
        if(!('FatherId' in row) && !result){
          this.table.renderSelectionList.splice(selection.findIndex(curr => curr.rowId == row.rowId),1)
          // 取消勾选全部子项
          tableData[row.selfIndex]['children'].forEach(son => {
            // 将此子项取消勾选
            let sonDefault = selection.some(item => item.rowId == son.rowId)
            if(sonDefault != -1) {
              this.$refs.renderTableImportant.toggleRowSelection(son,false)
              this.table.renderSelectionList.splice(sonDefault,1)
            }
          })
        }
      },
      // 渲染下载多选
      RenderDownloadSelectionChange(val){},
      // 【非业务逻辑】全选
      selectAll(selection){
        if(!('children' in selection[0])){
          this.table.renderSelectionList = []
          this.table.RenderDownloadData.forEach(curr => curr.children.forEach(item => this.$refs.renderTableImportant.toggleRowSelection(item,false) ))
          return false
        }
        let data = []
        this.table.RenderDownloadData.forEach(curr => {
          data.push(curr)
          curr.children.forEach(item => {
            data.push(item)
            this.$refs.renderTableImportant.toggleRowSelection(item,true)
          })
        })
        this.table.renderSelectionList = data
      },
      // 渲染下载详情查看
      showDetails(row, column, event){
        // 若事件承受者为项目组
        if(row.children){ this.unfoldFun(row); return false}
        //打开抽屉
        this.showDrawer = true
        this.drawerTaskData = row
        // debugger
        let tableDomList = this.$refs.downLoadTable.getElementsByClassName('el-table__row'),
            d = this.$refs.downLoadTable.getElementsByClassName('farmTableSelected')[0]
        if(d) d.classList.remove('farmTableSelected')
        // 计算选中行
        let n = 0
        this.table.RenderDownloadData.find((curr,inde) => {
          n ++
          return -1 < curr.children.findIndex((c,i) => {
            n ++
            return c.taskUuid == row.taskUuid
          })
        })
        tableDomList[--n].classList.add('farmTableSelected')
      },
      // 渲染下载关闭详情
      closeDrawer(){
        this.showDrawer = false
        let d = this.$refs.downLoadTable.getElementsByClassName('farmTableSelected')[0]
        d.classList.remove('farmTableSelected')
      },
      // 获取列表
      async getList(){
        // {
        //   zoneUuid: '',            // 分区ID
        //   keyword: '',             // 关键字
        //   pageIndex: '',           // 当前页码
        //   pageSize: '',            // 页大小
        //   uploadStatus '',         // 渲染状态
        //   renderStatus: ''         // 工程ID
        // }
        let t = `zoneUuid=${sessionStorage.getItem('zoneUuid')}&keyword=${this.searchInput}&pageIndex=${this.table.current}&pageSize=${this.table.pageSize}&renderStatus=&projectUuid=`
        let data = await getRenderTableList(t)
        this.table.renderTableTotal = data.data.total
        this.$emit('renderTbaleTotalItem', data.data.total)
        this.table.RenderDownloadData = data.data.data.map((curr,fatherIndex) => {
          let children = []
          // 兼容数据结构错误 生产时删除判断
          if(curr.renderLayerTaskDTOList[0]){
            children = curr.renderLayerTaskDTOList.map((item,sonIndex) => {
              // let status
              // switch(item.layerTaskStatus){
              //   case 1:
              //     status = '等待'
              //     break
              //   case 2:
              //     status = '渲染中'
              //     break
              //   case 3:
              //     status = '渲染结束'
              //     break
              //   case 4:
              //     status = '渲染暂停'
              //     break
              //   case 6:
              //     status = '渲染放弃'
              //     break
              // }
              return {
                id: '-',                                                // 任务ID
                sceneName: curr.fileName + '-' + item.layerName,        // 场景名
                status: itemDownloadStatus(item.layerTaskStatus),                           // 状态
                renderingProgress: item.frameCount.done + '/' + item.frameCount.total,    //渲染进度
                percent: curr.frameCount.total == null ? 0 : Math.floor(item.frameCount.done / item.frameCount.total * 100),
                viewProject: curr.projectName,                         // 所属项目
                rendering: item.frameCount.running,                    // 渲染中
                wait: item.frameCount.wait,                            // 等待
                timeOut: item.frameCount.pause,                        // 暂停
                carryOut: item.frameCount.done,                        // 完成
                failure: item.frameCount.fail,                         // 失败
                renderingTime: consum(item.useTime),                   // 渲染时长
                renderingCost: item.cost,                              // 渲染费用（金币）
                frameRange: item.frameStart + '-' + item.frameEnd,     // 帧范围
                intervalFrame: item.frameInterval,                     // 间隔帧
                camera: item.camera,                                   // 相机
                layerName: item.layerName,                             // 层名
                downloadStatus: '待下载',                              // 下载情况
                renderingStartTime: createDateFun(new Date(item.startTime)),                    // 渲染开始时间
                renderingEndTime: createDateFun(new Date(item.endTime)),                        // 渲染结束时间
                founder: curr.account,                                 // 创建人
                creationTime: createDateFun(new Date(curr.createTime)),                         // 创建时间
                rowId: curr.taskNo + '-' + sonIndex,                   // 唯一值
                resolutionVal: item.width + '*' + item.height,         // 分辨率
                formatName: item.formatName,                           // 输出格式
                modeVal: curr.core + '核' + '-' + curr.memory + 'G' + '（' + curr.patternName + '）',   // 渲染模式
                softwareVal: curr.softName + ' ' + curr.softVer,                                // 软件+版本
                pluginVal: curr.pluginName + ' ' + curr.pluginVersion,                          // 插件+版本
                taskUuid: item.layerTaskUuid,                          // 子项目ID 查看详情用
                FatherId: curr.taskNo,
                FatherTaskUuId: curr.taskUuid,
                FatherIndex: fatherIndex
              }
            })
          }
          return {
            taskUuid: curr.taskUuid,
            id: curr.taskNo,                                       // 任务ID
            sceneName: curr.fileName,                              // 场景名
            status: itemDownloadStatus(curr.renderStatus),         // 状态
            renderingProgress: curr.frameCount.done + '/' + curr.frameCount.total,          //渲染进度
            percent: curr.frameCount.total == null ? 0 : Math.floor(curr.frameCount.done / curr.frameCount.total * 100),
            viewProject: curr.projectName,                         // 所属项目
            rendering: curr.frameCount.running,                    // 渲染中
            wait: curr.frameCount.wait,                            // 等待
            timeOut: curr.frameCount.pause,                        // 暂停
            carryOut: curr.frameCount.done,                        // 完成
            failure: curr.frameCount.fail,                         // 失败
            renderingTime: consum(curr.useTime),                   // 渲染时长
            renderingCost: curr.cost,                              // 渲染费用（金币）
            frameRange: '-',                                       // 帧范围
            intervalFrame: '-',                                    // 间隔帧
            camera: '-',                                           // 相机
            layerName: '-',                                        // 层名
            downloadStatus: '待下载',                              // 下载情况
            renderingStartTime: createDateFun(new Date(curr.startTime)),                    // 渲染开始时间
            renderingEndTime: createDateFun(new Date(curr.endTime)),                        // 渲染结束时间
            founder: curr.account,                                 // 创建人
            creationTime: createDateFun(new Date(curr.createTime)),// 创建时间
            children,
            rowId: curr.taskNo,                                    // 唯一值
            selfIndex: fatherIndex
          }
        })
        this.$emit('archiveNum',data.data.other)
      },
      // 操作 - 开始
      startFun(){
        this.$confirm('选中项将开始渲染, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let dataList = []
              this.table.renderSelectionList.forEach(curr => {
                if('selfIndex' in curr) return false
                let dataListIndex = dataList.findIndex(item => item.taskUuid == curr.FatherTaskUuId)
                if(dataListIndex == -1){
                  dataList.push({
                    taskUuid: curr.FatherTaskUuId,
                    layerUuidList: [curr.taskUuid]
                  })
                }else{
                  dataList[dataListIndex]['layerUuidList'].push(curr.taskUuid)
                }
              })
              let data = await itemStart({
                "instructType": 1,
                "instructTaskList": dataList
              })
              if(data.data.code == 200) messageFun('success','操作成功')
            },
            () => messageFun('info','已取消操作')
          )
          .catch(() => messageFun('error','报错，操作失败'))
      },
      // 操作 - 归档
      archiveFun(){
        this.$confirm('确认归档选中项目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let taskUuidList = []
              this.table.renderSelectionList.forEach(curr => {
                if('FatherIndex' in curr) return false
                taskUuidList.push(curr.taskUuid)
              })
              let data = await itemArchive({
                zoneUuid: this.zoneId,
                taskUuids: taskUuidList
              })
              if(data.data.code == 200){ this.getList(); messageFun('success','操作成功') }
            },
            () => messageFun('info','已取消归档')
          )
          .catch(() => messageFun('error','报错，操作失败') )


      },
      // 操作 - 全部渲染
      renderAllFun(){
        this.$confirm('选中项将开始全部渲染, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let dataList = []
              this.table.renderSelectionList.forEach(curr => {
                if('selfIndex' in curr) return false
                let dataListIndex = dataList.findIndex(item => item.taskUuid == curr.FatherTaskUuId)
                if(dataListIndex == -1){
                  dataList.push({
                    taskUuid: curr.FatherTaskUuId,
                    layerUuidList: [curr.taskUuid]
                  })
                }else{
                  dataList[dataListIndex]['layerUuidList'].push(curr.taskUuid)
                }
              })
              let data = await itemStart({
                "instructType": 111,
                "instructTaskList": dataList
              })
              if(data.data.code == 200) messageFun('success','操作成功')
            },
            () => messageFun('info','已取消操作')
          )
          .catch(() => messageFun('error','报错，操作失败') )
      },
      // 操作 - 删除
      deleteFun(){
        this.$confirm('将删除选中选, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let dataList = [],
                  fat = []
              this.table.renderSelectionList.forEach(curr => {
                if('selfIndex' in curr) { fat.push(curr['taskUuid']); return false }
                let dataListIndex = dataList.findIndex(item => item.taskUuid == curr.FatherTaskUuId)
                if(dataListIndex == -1){
                  dataList.push({
                    taskUuid: curr.FatherTaskUuId,
                    layerUuidList: [curr.taskUuid]
                  })
                }else{
                  dataList[dataListIndex]['layerUuidList'].push(curr.taskUuid)
                }
              })
              dataList.forEach(curr => {
                if(!fat.some(item => {
                  return item == curr.taskUuid
                })) curr.taskUuid = ''
              })
              let data = await itemDelete({
                "instructType": 4,
                "instructTaskList": dataList
              })
              if(data.data.code == 204){ messageFun('success','操作成功'); this.getList() }else {throw ''}
            },
            () => messageFun('info','已取消删除')
          )
          .catch(() => messageFun('error','报错，操作失败') )
      },
      // 操作 - 暂停
      pauseFun(){
        this.$confirm('将暂停选中选, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(
            async () => {
              let dataList = []
              this.table.renderSelectionList.forEach(curr => {
                if('selfIndex' in curr) return false
                let dataListIndex = dataList.findIndex(item => item.taskUuid == curr.FatherTaskUuId)
                if(dataListIndex == -1){
                  dataList.push({
                    taskUuid: curr.FatherTaskUuId,
                    layerUuidList: [curr.taskUuid]
                  })
                }else{
                  dataList[dataListIndex]['layerUuidList'].push(curr.taskUuid)
                }
              })
              let data = await itemStart({
                "instructType": 2,
                "instructTaskList": dataList
              })
              if(data.data.code == 200) messageFun('success','操作成功')
            },
            () => messageFun('info','已取消暂停')
          )
          .catch(() => messageFun('error','报错，操作失败') )
      },
      // 操作 - 重新渲染
      renderAgainFun(){
        this.$prompt('请输入val', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
          .then(
            async ({ value }) => {
              let dataList = []
              this.table.renderSelectionList.forEach(curr => {
                if('selfIndex' in curr) return false
                let dataListIndex = dataList.findIndex(item => item.taskUuid == curr.FatherTaskUuId)
                if(dataListIndex == -1){
                  dataList.push({
                    taskUuid: curr.FatherTaskUuId,
                    layerUuidList: [curr.taskUuid]
                  })
                }else{
                  dataList[dataListIndex]['layerUuidList'].push(curr.taskUuid)
                }
              })
              let data = await itemStart({
                "instructType": 3,
                "instructCode": [value],
                "instructTaskList": dataList
              })
              if(data.data.code == 200) messageFun('success','操作成功')
          },
            () => messageFun('info','已取消操作')
          )
          // .catch(() => messageFun('error','报错，操作失败'))
      },
      // 展开项目组
      unfoldFun(row){
        let r = this.table.unfoldList.findIndex(curr => curr == row.rowId)
        if(r >= 0){
          this.table.unfoldList.splice(r,1)
          this.$refs.renderTableImportant.toggleRowExpansion(row,false)
        } else{
          this.table.unfoldList.push(row.rowId)
          this.$refs.renderTableImportant.toggleRowExpansion(row)
        }
      }
    },
    components: {
      farmDrawer
    },
    mounted() {
      this.getList()
    },
    computed: {
      ...mapState(['zoneId']),
    },
    watch: {
      'table.renderSelectionList': {
        handler: function(val){
          let r = new Set()
          val.forEach(curr => {
            if('children' in curr) curr['children'].forEach(item => r.add(item.status))
            r.add(curr.status)
          })
          this.$emit('j',[...r])
        },
        deep: true
      }
    }
    // props: {
    //   searchInput: {
    //     type: String,
    //   }
    // }
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
    .progressL {
      display: inline-block;
      width: 110px;
      vertical-align: middle;
      padding-right: 8px;
    }
    .progressS {
      color: rgba(255, 255, 255, 0.6);
    }
  }
</style>
