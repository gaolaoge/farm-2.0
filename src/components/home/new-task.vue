<template>
  <div class="newTask">
    <header class="header">
      <span class="title">
        {{ title }}
      </span>
      <img src="@/icons/shutDialogIcon.png"
           alt=""
           @click="closeDialogFun"
           class="closeBtn">
    </header>
    <section class="stepGroup">
      <!--导航-->
      <div class="stepBtn">
        <div class="step-btn"
             :class="[{'active': stepBtnActive == 1}]"
             @click="stepBtnActive = 1">
          {{ stepBtnOne }}
        </div>
        <div class="step-btn"
             :class="[{'active': stepBtnActive == 2}]"
             @click="stepBtnActive = 2">
          {{ stepBtnTwo }}
        </div>
      </div>
      <!--主体-->
      <div class="stepBody">
        <div class="stepBody-item"
             v-show="stepBtnActive == 1">
          <!--选择场景文件-->
          <div class="operateBtnGroup">
            <div class="farm-primary-form-btn"
                 v-for="item,index in stepOneBase.operateBtnGroup"
                 :key="index">
              <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
              <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
              <span>
                {{ item['text'] }}
              </span>
            </div>
          </div>
          <div class="table">
            <el-table
              :data="stepOneBase.tableData"
              @selection-change="handleSelectionChange"
              style="width: 100%">
              <el-table-column
                type="selection"
                align="center"
                width="55" />

              <el-table-column
                prop="fileName"
                label="场景名"
                width="220" />

              <el-table-column
                label="工程文件名">
                <template slot-scope="scope">
                  <div class="addressNameBase">
                    <span class="addressNameText">
                    {{ scope.row.addressName }}
                  </span>
                    <input type="file"
                           class="addressNameInput"
                           webkitdirectory
                           @change="inputFileChange($event,scope.row)">
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="stepBody-item"
             v-show="stepBtnActive == 2">
        <!--设置渲染模板-->
          <div class="set-renderTemplate">
            <div class="set-renderTemplate-item addMore" @click="innerVisible = true">
              <img src="@/icons/addIcon.png" alt="" class="addMoreIcon">
              <span class="addMoreText">
                {{ stepTwoBase.addMoreText }}
              </span>
            </div>
            <div class="set-renderTemplate-item ed"
                 :class="[{'active': item.renderTemplate.isDefault != 0}]"
                 @click="item.renderTemplate.isDefault == 0 ? item.renderTemplate.isDefault = 1 : item.renderTemplate.isDefault = 0"
                 v-for="item,index in stepTwoBase.renderList"
                 :key="index">
              <div class="headerB">
                <span class="headerText">
                  {{ item.renderTemplate.templateName }}
                </span>
                <span class="opacityBtnGroup">
                  <img src="@/icons/set-renderTemplate-item-edit.png"
                       alt=""
                       class="item-icon">
                  <img src="@/icons/set-renderTemplate-item-delete.png"
                       alt=""
                       class="item-icon">
                </span>
              </div>
              <div class="bodyB">
                <span class="hardware">
                  {{ item.renderTemplate.softUuid }}
                </span>
                <span class="software">
                  {{ item.renderTemplate.softName }}
                </span>
                <span class="plugin">
                  {{ item.renderTemplate.softVer }}
                </span>
                <img src="@/icons/item-selected.png" alt="" class="item-selected">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="btnGroup">
      <div class="btnGroup-btn confirm" v-show="stepBtnActive == 1" @click="stepBtnActive = 2">
        <span class="nextStep">
          {{ btn.next }}
        </span>
      </div>
      <div class="btnGroup-btn confirm" v-show="stepBtnActive == 2">
        <span>
          {{ btn.confirm }}
        </span>
      </div>
      <div class="btnGroup-btn previous" v-show="stepBtnActive == 2" @click="stepBtnActive = 1">
        <span>
          {{ btn.previous }}
        </span>
      </div>
    </div>
    <!--添加模板-->
    <el-dialog
      width="641px"
      :show-close=false
      :visible.sync="innerVisible"
      append-to-body>
      <div class="wrapper">
        <header class="header">
          <span class="title">
            {{ dialogAdd.title }}
          </span>
          <img src="@/icons/shutDialogIcon.png"
               alt=""
               @click="innerVisible = false"
               class="closeBtn">
        </header>
        <div class="farm-form">
          <!--模板名称-->
          <div class="farm-form-item">
            <label for="templateName" class="farm-form-item-label">
              {{ dialogAdd.form.labelName }}：
            </label>
            <input type="text"
                   id="templateName"
                   class="farm-form-item-input"
                   :placeholder="dialogAdd.namePlaceholder"
                   v-model="dialogAdd.form.valName">
          </div>
          <!--渲染软件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">
              {{ dialogAdd.form.labelSoftware }}：
            </label>
            <el-select v-model="dialogAdd.form.valSoftware" class="i">
              <el-option
                v-for="item,index in dialogAdd.softwareList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--渲染插件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">
              {{ dialogAdd.form.labelPlugin }}：
            </label>
            <el-select v-model="dialogAdd.form.valPlugin" class="i">
              <el-option
                v-for="item,index in dialogAdd.pluginList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--选择插件-->
          <div class="transferBase">
            <div class="o">
              <div class="label">
                {{ dialogAdd.o }}
              </div>
              <div class="list">
                <div v-for="item,index in dialogAdd.oList"
                     :key="index"
                     @click="changeOIndex(index)"
                     class="li"
                     :class="[{'active': item.status == true}]">
                  <span class="name">
                    {{ item.plugin }}
                  </span>
                  <span class="choiceIcon">
                    <img src="@/icons/choiceIcon.png"
                         alt=""
                         v-show="item.status == true"
                         class="icon">
                  </span>
                </div>
              </div>
            </div>
            <div class="ig" />
            <div class="n">
              <div class="label">
                {{ dialogAdd.n }}
              </div>
              <div class="list">
                <div v-for="item,index in dialogAdd.nList"
                     :key="index"
                     class="li"
                     :class="[{'active': item.status == true}]">
                  <span class="name">
                    {{ item.plugin }}
                  </span>
                  <span class="deleteNIcon">
                    <img src="@/icons/deleteLiIcon.png"
                         alt=""
                         class="icon">
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!--按钮-->
          <div class="btnGroup">
            <div class="btnGroup-btn save">
              <span>
                {{ dialogAdd.save }}
              </span>
            </div>
            <div class="btnGroup-btn cancel">
              <span>
                {{ dialogAdd.cancel }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    createTaskSet
  } from '@/api/api'

  export default {
    name: 'new-task',
    data(){
      return {
        title: '新建任务',
        stepBtnOne: '选择场景文件',
        stepBtnTwo: '设置渲染模板',
        stepBtnActive: 1,
        btn: {
          next: '下一步',
          previous: '上一步',
          confirm: '确认'
        },
        stepOneBase: {
          operateBtnGroup: [
            {
              text: '添加',
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png')
            },
            {
              text: '删除',
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png')
            },
          ],
          tableData: [
            {
              fileName: '场景名少年的你123.ma',
              addressName: 'F:\\ss929\\render\\map'
            }
          ],
          selectionTableData: [],     //选择场景文件 table 多选值
        },
        stepTwoBase: {
          addMoreText: '添加模板',
          //设置渲染模板列表
          renderList: [
            // {
            //   id: '',
            //   templateName: '',     //模板名称
            //   hardware: '',       //硬件
            //   softNameVer: '',       //软件
            //   plugin: ''          //插件
            // },
          ]
        },
        innerVisible: false,   //添加模板
        dialogAdd: {
          title: '添加模板',
          namePlaceholder: '输入模版名称',
          form: {
            labelName: '模板名称',
            valName: '',
            labelSoftware: '渲染软件',
            valSoftware: 'Maya 2020',
            labelPlugin: '渲染插件',
            valPlugin: 'mloa'
          },
          // 渲染软件
          softwareList: [
            {
              label: 'Maya 2020',
              val: 'Maya 2020'
            },
            {
              label: 'Maya 2021',
              val: 'Maya 2021'
            },
          ],
          // 渲染插件
          pluginList: [
            {
              label: 'mloa',
              val: 'mloa'
            },
            {
              label: 'other',
              val: 'other'
            }
          ],
          o: '选择插件版本',
          n: '已选插件版本',
          // 插件版本
          oList: [
            {
              id: '0001',
              software: 'mloa',
              plugin: 'mloa 4.0.2',
              status: false
            },
            {
              id: '0002',
              software: 'mloa',
              plugin: 'mloa 4.5.2.1',
              status: true
            },
            {
              id: '0003',
              software: 'mloa',
              plugin: 'mloa-max1.0rgi 4.0.2.4i.223',
              status: false
            },
            {
              id: '0004',
              software: 'mloa',
              plugin: 'mloa-max1.0rgi 4.0.2.4i.223',
              status: false
            },
            {
              id: '0005',
              software: 'mloa',
              plugin: 'mloa-max1.0rgi 4.0.2.4i.223',
              status: false
            }
          ],
          // 已选结果
          nList: [
            {
              id: '10011',
              software: 'mloa',
              plugin: 'mloa 4.0.2',
              status: false
            },
            {
              id: '0021',
              software: 'mloa',
              plugin: 'mloa 4.0.2',
              status: false
            },
            {
              id: '3011',
              software: 'RenderMan_for_May',
              plugin: 'RenderMan_for_May a 20.9',
              status: false
            },
            {
              id: '5011',
              software: 'mloa',
              plugin: 'mloa 4.0.2',
              status: false
            }
          ],
          cancel: '取消',
          save: '保存'
        }
      }
    },
    methods: {
      // 关闭
      closeDialogFun(){
        this.$emit('closeDialogFun','')
      },
      // 选择场景文件 table 多选值
      handleSelectionChange(val){
        this.selectionTableData = val
      },
      // 选择场景文件 table 修改工程文件名
      inputFileChange(e,val){
        // console.log(e)
        // console.log(val)
      },
      // 选择插件版本
      changeOIndex(index){
        this.dialogAdd.oList.forEach((curr,ind) => {
          if(index == ind) {
            curr.status = true
          }else {
            curr.status = false
          }
        })
      },
      // 获取渲染模板列表
      getList(){
        createTaskSet()
          .then(data => {
            this.stepTwoBase.renderList = data.data.data
              // [
              //   {
              //     renderTemplate: {                       //模板
              //       id: 16
              //       createTime: 1586308643471
              //       createBy: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
              //       updateTime: 1586397047167
              //       updateBy: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
              //       templateUuid: "84168a1b-b32e-490c-854b-1590f756c28b"
              //       dataStatus: 1
              //       updateParamAfterAnalyse: null
              //       templateName: "用户4测试模板3"          //模板名称
              //       isDefault: 0                          //默认选中 0为非
              //       softName: "3dmax"                     //软件名
              //       softVer: "2021"                       //版本
              //       softNameVer: "3dmax2021"              //
              //       softUuid: "127"                       //软件编号
              //       customerUuid: "user42cd-82bb-44e7-9bc4-d6d046b5dff2"
              //     },
              //     xxlPlugins: [           模板插件
              //       {
              //         id: 1
              //         pluginName: "V-ray"              //插件名
              //         version: "1.233"                 //插件版本
              //         publisher: "2K"                  //插件发行商
              //         pluginUuid: "456"                //编号 唯一标识
              //         createTime: "2020-03-31"
              //         createBy: "1"
              //         updateTime: "2020-03-31"
              //         updateBy: "1"
              //         dataStatus: 1
              //       }
              //     ]
              //   }
              // ]
          })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="less" scoped>
  .newTask {
    height: 80vh;
    .header {
      text-align: center;
      padding-bottom: 21px;
      .title {
        font-size:18px;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:25px;
        letter-spacing:4px;
      }
      .closeBtn {
        float: right;
        width:18px;
        height:18px;
        cursor: pointer;
        opacity:0.6;
      }
    }
    .stepGroup {
      height: calc(80vh - 92px);
      display: flex;
      .stepBtn {
        width: 58px;
        .step-btn {
          position: relative;
          font-size: 14px;
          font-weight: 400;
          color: rgba(255,255,255,1);
          letter-spacing: 2px;
          height: 136px;
          width: 58px;
          line-height: 58px;
          text-align: center;
          writing-mode: vertical-lr;
          border-radius: 6px 0px 0px 6px;
          cursor: pointer;
          &.active {
            background-color: RGBA(23, 28, 40, 1);
            &::after {
              content: '';
              position: absolute;
              right: 4px;
              top: 50%;
              transform: translateY(-50%);
              width: 2px;
              height: 25px;
              box-shadow: 0px 0px 2px 1px rgba(10, 98, 241, 1);
              background-color: rgba(10, 98, 241, 1);
            }
          }
        }
      }
      .stepBody {
        position: relative;
        width: 1px;
        flex-grow: 1;
        background-color: RGBA(23, 28, 40, 1);
        border-radius: 0px 6px 6px 6px;
        overflow: hidden;
        .stepBody-item {
          position: relative;
          height: 100%;
          color: #fff;
          font-size: 14px;
          /*选择场景文件*/
          .operateBtnGroup {
            text-align: right;
            padding: 19px 21px;
          }
          .table {
            padding: 0px 20px;
            .addressNameBase {
              position: relative;
              .addressNameText {
                font-size:14px;
                font-weight:400;
                color:rgba(0,97,255,1);
                line-height:26px;
              }
              .addressNameInput {
                position: absolute;
                left: 0px;
                height: 26px;
                opacity: 0;
              }
            }
          }
          /*设置渲染模板*/
          .set-renderTemplate {
            height: 100%;
            padding: 0px 20px;
            box-sizing: border-box;
            display: flex;
            align-content: flex-start;
            flex-wrap: wrap;
            .set-renderTemplate-item {
              width:200px;
              height:150px;
              border-radius:8px;
              overflow: hidden;
              margin: 30px 0px 0px 30px;
              cursor: pointer;
              &.addMore {
                width:196px;
                height:146px;
                border: 2px dashed rgba(255, 255, 255, 0.29);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .addMoreIcon {
                  width: 30px;
                  margin-bottom: 12px;
                }
                .addMoreText {
                  font-size:12px;
                  font-weight:400;
                  color:rgba(255, 255, 255, 0.3);
                }
              }
              &.ed {
                background-color: rgba(28, 36, 47, 1);
                .headerB {
                  height: 36px;
                  background: rgba(32, 41, 53, 1);
                  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
                  padding: 0px 20px;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .headerText {
                    font-size: 13px;
                    font-weight: 400;
                    line-height: 36px;
                    color: rgba(255, 255, 255, 0.8);
                  }
                  .opacityBtnGroup {
                    .item-icon {
                      margin-left: 13px;
                      width: 13px;
                      cursor: pointer;
                    }
                  }
                  
                }
                .bodyB {
                  position: relative;
                  height: 114px;
                  padding: 17px;
                  box-sizing: border-box;
                  .hardware,
                  .plugin,
                  .software {
                    display: block;
                    font-size: 14px;
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 20px;
                    margin-bottom: 3px;
                  }
                  .software,
                  .plugin{
                    font-weight: 400;
                  }
                  .hardware {
                    font-weight: 600;
                  }
                  .item-selected {
                    display: none;
                    position: absolute;
                    bottom: 17px;
                    right: 17px;
                    width: 26px;
                  }
                }
                &:hover {
                  box-shadow:0px 1px 15px 0px rgba(0,97,255,0.3);
                }
                &.active {
                  .headerB {
                    background-color: rgba(5, 81, 206, 1);
                    box-shadow: 0px 1px 12px 8px rgba(0, 0, 0, 0.4);
                  }
                  .bodyB {
                    background-color: rgba(10, 98, 241, 0.59);
                    .item-selected {
                      display: inline-block;
                    }
                  }

                }
              }
            }
          }
        }
      }
    }
    .btnGroup {
      height: 72px;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .btnGroup-btn {
        margin-right: 21px;
        display: inline-block;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.79);

        text-align: center;
        cursor: pointer;
        span {
          display: inline-block;
          line-height: 1em;
        }
        &.confirm {
          background-color: rgba(10, 98, 241, 1);
          width: 76px;
          line-height: 32px;
        }
        &.previous {
          border: 1px solid rgba(255, 255, 255, 0.6);
          width: 74px;
          line-height: 30px;
        }
      }
    }
  }
  .wrapper {
    .header {
      text-align: center;
      padding-bottom: 21px;
      .title {
        font-size:18px;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:25px;
        letter-spacing:4px;
      }
      .closeBtn {
        float: right;
        width:18px;
        height:18px;
        cursor: pointer;
        opacity:0.6;
      }
    }
    #templateName {
      color: rgba(256, 256, 256, 0.8);
    }
    .transferBase {
      margin-left: 109px;
      margin-bottom: 65px;
      width: 472px;
      vertical-align: top;
      display: flex;
      justify-content: space-between;
      .o,
      .n {
        width: 220px;
        height: 250px;
        border-radius: 8px;
        border:1px solid rgba(255, 255, 255, 0.4);
        .label {
          font-size: 14px;
          font-weight: 400;
          line-height: 1em;
          color: rgba(255, 255, 255, 0.6);
          padding: 20px;
        }
        .list {
          overflow-y: scroll;
          height: 190px;
          .li {
            min-height: 24px;
            padding: 0px 20px;
            cursor: pointer;
            margin-bottom: 8px;
            .name {
              padding-top: 2px;
              font-size: 14px;
              line-height: 20px;
              font-weight: 400;
              color: rgba(255, 255, 255, 0.39);
              width: 134px;
              display: inline-block;
            }
            .choiceIcon,
            .deleteNIcon {
              float: right;
              margin-top: 5px;
              border: 1px solid rgba(255, 255, 255, 0.59);
              border-radius: 50%;
              width: 12px;
              height: 12px;
              font-size: 0px;
              .icon {
                margin-left: -1px;
                margin-top: -1px;
                width: 14px;
              }
            }
            .deleteNIcon {
              border: 0px;
              width: 14px;
              height: 14px;
              opacity: 0.6;
              transition: opacity 0.2s;
              &:hover {
                opacity: 1;
              }
            }
            &.active,
            &:hover {
              background-color: rgba(255, 255, 255, 0.04);
              .name {
                color: rgba(255, 255, 255, 0.59);
              }
            }
          }
          &::-webkit-scrollbar {
            /*滚动条整体样式*/
            width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
          }
          &::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 5px rgba(102, 89, 89, 0.2);
            background: #9e9797;
          }
          &::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(138, 129, 129, 0.2);
            border-radius: 2px;
            background: rgba(226, 221, 221, 0.4);
          }
        }
      }
      .ig {
        position: relative;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          display: inline-block;
          border-width: 3px;
          border-color: rgba(255, 255, 255, 0.29);
          border-top-style: solid;
          border-right-style: solid;
          transform: rotate(45deg);
          position: absolute;
          left: -8px;
          top: 110px;
        }
      }
    }
    .btnGroup {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      .btnGroup-btn {
        margin-right: 21px;
        display: inline-block;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.79);
        cursor: pointer;
        span {
          display: inline-block;
          line-height: 1em;
        }
        &.cancel {
          border: 1px solid rgba(255, 255, 255, 0.4);
          padding: 5px 23px;
          color: rgba(255, 255, 255, 0.4);
          transition: all 0.2s;
          &:hover {
            color: rgba(255, 255, 255, 0.6);
            border-color: rgba(255, 255, 255, 0.6);
          }
        }
        &.save {
          padding: 6px 24px;
          background-color: rgba(10, 98, 241, 1);
        }
      }
    }
  }
</style>
