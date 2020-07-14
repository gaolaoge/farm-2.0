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
          prop="name"
          label="项目名称"
          show-overflow-tooltip
          width="400"/>

        <el-table-column
          prop="state"
          label="项目状态"
          width="160"/>

        <el-table-column
          prop="now"
          label="当前项目"
          width="168"/>

        <el-table-column
          prop="user"
          label="创建人"
          show-overflow-tooltip
          width="180"/>

        <el-table-column
          prop="date"
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
          <el-checkbox v-model="checked" label="设为当前项目"/>
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
  export default {
    name: 'projectSetting',
    data() {
      return {
        tableData: [
          {
            name: '默认项目认项认项认项认项认项一',
            state: '启用',
            now: '是',
            user: '系统默认创建',
            date: '2020-03-03 00:00:00'
          }
        ],
        tableOperateBtn: ['编辑', '设为当前项目'],
        btnGroup: [
          {
            text: '新建任务',
            class: 'addMoreBtn',
            initialIcon: require('@/icons/addIcon-Blue.png'),
            selectedIcon: require('@/icons/addIcon-Whit.png')
          },
          {
            text: '删除',
            class: 'deleteBtn',
            initialIcon: require('@/icons/deleteIcon-blue.png'),
            selectedIcon: require('@/icons/deleteIcon-white.png'),
            triggerable: true
          }
        ],
        searchInputVal: '',
        placeholder: '输入项目名称',
        createProject: {
          tit: '新建项目',
          name: '',
          placeholder: '请输入项目名称',
          btnCancel: '取消',
          btnSave: '确定'
        },
        createBaseShow: false,
        selectionList: []
      }
    },
    watch: {
      'selectionList': {
        handler: function (val) {
          if (!val.length) this.btnGroup[2]['triggerable'] = true
          else this.btnGroup[2]['triggerable'] = false
        }
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.selectionList = val
      },
      getData() {

      },
      createCancelBtnFun() {
        this.createProject.name = ''
        this.createBaseShow = false
      },
      createSaveBtnFun() {
      },
      // 操作按钮
      uploadOperating(name) {
        switch (name) {
          case '新建任务':
            this.createProjectFun()
            break
          case '删除':
            if (!this.selectionList.length) return false
            this.deleteFun()
        }
      },
      // 新建任务
      createProjectFun() {
        this.createBaseShow = true
      },
      // 删除
      deleteFun() {

      }
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
      background-color: rgba(28, 36, 47, 1);
      box-shadow: 0px 1px 30px 0px rgba(16, 20, 27, 1);
      border-radius: 8px;

      .tit {
        position: relative;
        padding: 20px 0px;
        text-align: center;

        span {
          font-size: 18px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 25px;
          letter-spacing: 2px;
        }

        img {
          position: absolute;
          right: 20px;
          width: 18px;
          cursor: pointer;
        }
      }

      .con {
        padding: 0px 80px;

        .name {
          width: 428px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          background-color: transparent;
          outline: none;
          margin: 20px 0px;
          padding-left: 20px;
          box-sizing: border-box;
          color: rgba(255, 255, 255, 1);
        }

        .btn-group {
          margin-top: 50px;
          text-align: right;
        }
      }
    }
  }

  .notTriggerable {
    cursor: not-allowed;
    color: rgba(22, 29, 37, 0.29);

    img {
      opacity: 0;
    }
  }

  /deep/ .el-checkbox__label {
    color: rgba(255, 255, 255, 0.6) !important;
  }

  /deep/ .el-table .el-table__row:hover::after {
    display: none
  }
</style>
