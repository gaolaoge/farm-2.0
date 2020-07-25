<template>
  <div class="projectSetting">
    <div class="operating">
      <div class="btnGroup">
        <div class="farm-primary-form-btn"
             :class='[
               item.class,
               {notTriggerable: item.triggerable}
              ]'
             v-for="(item,index) in btnGroup"
             @click="uploadOperating(item['text'])"
             :key="index">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="rightOPerate">
        <div class="searchItem">
          <input type="text"
                 class="farm-form-input"
                 v-model="searchInputVal"
                 @keyup.enter="getData"
                 :placeholder="placeholder">
          <!--搜索按钮-->
          <img src="@/icons/global-search-icon.png"
               alt=""
               class="searchIcon"
               @click="getData">
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">

        <el-table-column
          type="selection"
          align="right"
          width="55"/>

        <el-table-column
          prop="projectName"
          label="项目名称"
          show-overflow-tooltip
          width="400"/>

        <el-table-column
          prop="projectStatus"
          label="项目状态"
          width="160"/>

        <el-table-column
          prop="isDefault"
          label="当前项目"
          width="168"/>

        <el-table-column
          prop="customerName"
          label="创建人"
          show-overflow-tooltip
          width="180"/>

        <el-table-column
          prop="createTime"
          label="创建时间"
          show-overflow-tooltip/>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <span class="operateBtn">{{ tableOperateBtn[0] }}</span>
            <span class="operateBtn">{{ tableOperateBtn[1] }}</span>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <el-pagination
      background
      layout="prev, pager, next, jumper"
      :current-page.sync="page.index"
      @current-change="jump"
      :total="page.total">
    </el-pagination>

    <!--新建项目dialog-->
    <div class="createProject" v-show="createBaseShow">
      <div class="createBase">
        <div class="tit">
          <span>{{ createProject.tit }}</span>
          <img src="@/icons/shutDialogIcon.png" alt="" @click="createCancelBtnFun">
        </div>
        <div class="con">
          <input type="text"
                 class="name"
                 v-model="createProject.name"
                 :placeholder="createProject.placeholder">
          <el-checkbox v-model="createProject.checked" label="设为当前项目"/>
          <div class="btn-group">
            <div class="farm-btn cancel" @click="createCancelBtnFun">
              <span>{{ createProject.btnCancel }}</span>
            </div>
            <div class="farm-btn save" @click="createSaveBtnFun">
              <span>{{ createProject.btnSave }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    getObjectList,
    createTask,
    deleteTask
  } from '@/api/setting-api.js'
  import {
    messageFun,
    createDateFun
  } from "@/assets/common"

  export default {
    name: 'projectSetting',
    data() {
      return {
        tableData: [
          // {
          //   'createTime'      创建时间
          //   'projectName'     项目名称
          //   'customerName'    创建人
          //   'isDefault':      当前项目 0否 1是
          //   'projectStatus'   项目状态 0不启用 1启用
          // },
        ],
        tableOperateBtn: ['编辑', '设为当前项目'],
        btnGroup: [
          {
            text: '新建项目',
            class: 'addMoreBtn',
            initialIcon: require('@/icons/addIcon-black.png'),
            selectedIcon: require('@/icons/addIcon-white.png')
          },
          {
            text: '删除',
            class: 'deleteBtn',
            initialIcon: require('@/icons/deleteIcon-black.png'),
            selectedIcon: require('@/icons/deleteIcon-white.png'),
            triggerable: true
          }
        ],
        searchInputVal: '',           // 检索关键字
        placeholder: '输入项目名称',
        createProject: {
          tit: '新建项目',
          name: '',
          checked: false,
          placeholder: '请输入项目名称',
          btnCancel: '取消',
          btnSave: '确定'
        },
        createBaseShow: false,
        selectionList: [],
        page: {
          index: 0,
          size: 10,
          total: 0
        }
      }
    },
    watch: {
      'selectionList': {
        handler: function (val) {
          if (!val.length) this.btnGroup[1]['triggerable'] = true
          else this.btnGroup[1]['triggerable'] = false
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectionList = val
      },
      // 关键字搜索
      getData() {
        this.getList(this.searchInputVal, 1, this.page.size)
      },
      // 获得list
      async getList(keyword, pageIndex, pageSize) {
        let data = await getObjectList(`keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
        if (data.data.code != 200) {
          messageFun('error', '获取数据失败')
          return false
        }
        this.page.total = data.data.total
        this.tableData = data.data.data.map(curr => {
          // {
          //   createBy: "1"
          //   createTime: 1586999761039
          //   customerUuid: "1"
          //   dataStatus: 1
          //   id: 1
          //   isDefault: 0
          //   projectName: "项目一"
          //   projectOverview: "这是一个测试项目"
          //   projectStatus: 1
          //   taskProjectUuid: "1"
          //   thumbnail: null
          //   updateBy: "1"
          //   updateTime: 1591689369051
          // }
          return {
            'id': curr.taskProjectUuid,
            'createTime': createDateFun(new Date(curr.createTime)),
            'projectName': curr.projectName,
            'customerName': curr.customerName,
            'isDefault': curr.isDefault == 0 ? '否' : '是',
            'projectStatus': curr.projectStatus == 0 ? '禁用' : '启用'
          }
        })
      },
      // 新建任务-关闭
      createCancelBtnFun() {
        this.createProject.name = ''
        this.createBaseShow = false
      },
      // 新建任务-保存
      async createSaveBtnFun() {
        let c = this.createProject
        if(!c.name) return false
        let data = await createTask({
          'projectName': c.name,
          'isDefault': c.checked
        })
      },
      // 操作按钮
      uploadOperating(name) {
        switch (name) {
          case '新建项目':
            this.createProjectFun()
            break
          case '删除':
            if (!this.selectionList.length) return false
            this.deleteFun()
        }
      },
      // 新建项目
      createProjectFun() {
        this.createBaseShow = true
      },
      // 删除
      async deleteFun() {
        let data = await deleteTask({'projectList': this.selectionList.map(curr => curr.id)})
        if(data.data.code == 201){
          messageFun('success', '操作成功')
          this.getList(this.searchInputVal, this.page.index + 1, this.page.size)
        }else if(data.data.code == 1000){
          messageFun('error', '操作失败')
        }
      },
      // 跳页
      jump(val) {
        this.getList(this.searchInputVal, val, this.page.size)
      },
    },
    mounted() {
      this.getList('', 1, this.page.size)
    }
  }
</script>

<style lang="less" scoped>
  .projectSetting {
    height: calc(100vh - 203px);

    .operating {
      padding: 30px 27px 10px;
      display: flex;
      justify-content: space-between;

      .btnGroup {
        display: flex;
        align-items: center;
      }
    }
  }

  .operateBtn {
    color: #0061ff;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
  }

  .createProject {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);

    .createBase {
      width: 588px;
      height: 273px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 30px 0px rgba(16, 20, 27, 1);
      border-radius: 8px;
      overflow: hidden;

      .tit {
        height: 36px;
        text-align: center;
        background-color: rgba(241, 244, 249, 1);
        box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
        padding: 0px 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 14px;
          font-weight: 600;
          color: rgba(22, 29, 37, 1);
        }

        img {
          cursor: pointer;
        }
      }

      .con {
        padding: 0px 80px;

        .name {
          width: 428px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(22, 29, 37, 0.4);
          background-color: transparent;
          outline: none;
          margin: 20px 0px;
          padding-left: 20px;
          box-sizing: border-box;
          color: rgba(22, 29, 37, 1);
        }

        .btn-group {
          margin-top: 50px;
          text-align: right;
        }
      }
    }
  }

  .notTriggerable,
  .notTriggerable:hover {
    cursor: no-drop;
    color: rgba(22, 29, 37, 0.29);
    background-color: rgba(255, 255, 255, 1);

    .default {
      display: inline-block;
      opacity: 0.29;
    }

    .hover {
      display: none;
    }
  }

  /deep/ .el-table .el-table__row:hover::after {
    display: none
  }
</style>
