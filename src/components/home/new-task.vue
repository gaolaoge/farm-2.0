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
      <!--面包屑-->
      <div class="navL">
        <ul>
          <li class="li" :class="[{'active': index + 1 == stepBtnActive}]" v-for="(item,index) in navL" :key="index">
            <svg width="277" height="37" class="f svg" v-show="index == 0">
              <path d="M 0 0 H 259.5 L 277 18.5 L 259.5 37 H 0 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <svg width="277" height="37" class="st svg" v-show="index != 0">
              <path d="M 0 0 H 259.5 L 277 18.5 L 259.5 37 H 0 L 18.5 18.5 Z" fill="rgba(27, 83, 244, 1)"/>
            </svg>
            <span class="i">{{ index + 1 }}</span>
            <span class="s">{{ item }}</span>
          </li>
        </ul>
      </div>
      <!--主体-->
      <div class="stepBody">
        <!--选择场景文件-->
        <div class="stepBody-item selectFile"
             v-show="stepBtnActive == 1">
          <!--左侧导航-->
          <div class="sele">
            <ul>
              <li class="li" :class="[{'active': stepOneBase.index == index}]"
                  v-for="(item,index) in stepOneBase.btnList" :key="index" @click="changeFileSelection(index)">
                <img class="img" :src="item.imgUrl" alt="">
                <span class="span">{{ item.span }}</span>
              </li>
            </ul>
          </div>
          <div class="sec">
            <!--我的网盘-->
            <div class="netdist" v-show="stepOneBase.index == 0">
              <div class="farm-form">
                <!--工程路径-->
                <div class="farm-form-item">
                  <div class="farm-form-item-label">{{ stepOneBase.netdisc.pathLabel }}：</div>
                  <div class="farm-form-item-input p" @click="expandDiskDirectory">
                    <span class="sp">{{ stepOneBase.netdisc.pathV }}</span>
                    <img src="@/icons/more-btn.png" alt="" class="im" :class="[{'active': stepOneBase.showMe}]">
                  </div>
                  <div class="netCatalogue" :class="[{'active': stepOneBase.showMe}]">
                    <el-tree
                      :data="stepOneBase.netdisc.catalogData"
                      show-checkbox
                      node-key="id"
                      :default-expanded-keys="[2, 3]"
                      :default-checked-keys="[5]"
                      :props="stepOneBase.netdisc.defaultProps">
                    </el-tree>
                  </div>
                </div>
                <!--场景文件-->
                <div class="farm-form-item">
                  <div class="farm-form-item-label">{{ stepOneBase.netdisc.fileLabel }}：</div>
                  <div class="farm-form-item-input b"
                       :class="[{'null': stepOneBase.netdisc.selectionDefault.length == 0}]">
                    <div class="pathList">
                      <span class="filePathLi" v-for="(item,index) in stepOneBase.netdisc.sceneFilePath" :key="index">
                        <span class="s">{{ item }}</span>
                        <img src="@/icons/enter.png" alt="" class="im">
                      </span>
                    </div>
                    <!--请先选择工程路径-->
                    <div class="null">
                      <img src="@/icons/warningIcon_.png" alt="">
                      <span class="span">{{ stepOneBase.netdisc.warnSpan }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--我的电脑-->
            <div class="local" v-show="stepOneBase.index == 1">
              <div class="operate">
                <div class="farm-primary-form-btn"
                     @click="operateBtnFun(item['text'])"
                     v-for="(item,index) in stepOneBase.local.operateBtnGroup"
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
                  :data="filelist"
                  class="o"
                  @selection-change="handleSelectionChange"
                  style="width: 100%">

                  <el-table-column
                    type="selection"
                    align="center"
                    width="55"/>
                  <!--场景文件-->
                  <el-table-column
                    prop="sceneFile"
                    label="场景名"
                    show-overflow-tooltip
                    width="220"/>
                  <!--工程路径-->
                  <el-table-column
                    prop="address"
                    :render-header="renderHeader"
                    label="工程路径">
                    <template slot-scope="scope">
                  <span class="address-span" :class="[{'inputing': scope.row.inputStatus}]">
                    {{ scope.row.address }}
                  </span>
                      <input type="text"
                             class="address-input"
                             :class="[{'inputing': scope.row.inputStatus}]"
                             @focus="scope.row.inputStatus = true"
                             @blur="scope.row.inputStatus = false"
                             v-model="scope.row.address">
                    </template>
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </div>

        </div>
        <!--设置渲染模板-->
        <div class="stepBody-item"
             v-show="stepBtnActive == 2">
          <div class="set-renderTemplate">
            <!--添加模板-->
            <div class="set-renderTemplate-item addMore"
                 @click="addTemplate('addMore','')">
              <img src="@/icons/addIcon.png"
                   alt=""
                   class="addMoreIcon">
              <span class="addMoreText">
                {{ stepTwoBase.addMoreText }}
              </span>
            </div>
            <!--已存在模板-->
            <div class="set-renderTemplate-item ed"
                 :class="[{'active': stepTwoBase.renderListActive == index}]"
                 @click="stepTwoBase.renderListActive = index"
                 v-for="(item,index) in stepTwoBase.renderList"
                 :key="index">
              <div class="headerB">
                <span class="headerText" :title="item.renderTemplate.templateName">
                  {{ item.renderTemplate.templateName }}
                </span>
                <span class="opacityBtnGroup">
                  <!--编辑-->
                  <img src="@/icons/set-renderTemplate-item-edit.png"
                       alt=""
                       @click.stop="addTemplate('editOne',index)"
                       class="item-icon">
                  <!--删除-->
                  <img src="@/icons/set-renderTemplate-item-delete.png"
                       alt=""
                       @click="deleteTemplate(index)"
                       class="item-icon">
                </span>
              </div>
              <div class="bodyB">
                <!--<span class="hardware">-->
                <!--{{ item.renderTemplate.softUuid }}-->
                <!--</span>-->
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
        <!--设置渲染参数-->
        <div class="stepBody-item"></div>
      </div>
    </section>
    <!--下一步-->
    <div class="btnGroup">
      <div class="btnGroup-btn confirm" v-show="stepBtnActive == 1" @click="stepBtnActive = 2">
        <span class="nextStep">
          {{ btn.next }}
        </span>
      </div>
      <!--确定-->
      <div class="btnGroup-btn confirm" v-show="stepBtnActive == 2" @click.once="confirmFun">
        <span>
          {{ btn.confirm }}
        </span>
      </div>
      <!--上一步-->
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
      @close="closeAddTemplateDialog"
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
                   :class="[{'inputError': !dialogAdd.form.formatName}]"
                   :placeholder="dialogAdd.namePlaceholder"
                   @blur="nameVerif"
                   @focus="dialogAdd.form.formatName = true"
                   v-model="dialogAdd.form.valName">
          </div>
          <!--渲染软件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">
              {{ dialogAdd.form.labelSoftware }}：
            </label>
            <el-cascader
              v-model="dialogAdd.form.valSoftware"
              :options="dialogAdd.softwareList"
              @change="changeSoftware"/>

          </div>
          <!--渲染插件-->
          <div class="farm-form-item">
            <label class="farm-form-item-label">
              {{ dialogAdd.form.labelPlugin }}：
            </label>
            <el-select v-model="dialogAdd.form.valPlugin"
                       class="i"
                       @change="changePlugin">
              <el-option
                v-for="(item,index) in dialogAdd.pluginList"
                :key="index"
                :label="item.label"
                :value="item.val">
              </el-option>
            </el-select>
          </div>
          <!--选择插件-->
          <div class="transferBase">
            <!--选择插件版本-->
            <div class="o">
              <div class="label">
                {{ dialogAdd.o }}
              </div>
              <div class="list">
                <div v-for="(item,index) in dialogAdd.oList"
                     :key="index"
                     @click="changeOIndex(index,item)"
                     class="li"
                     :class="[{'active': item.status == true}]">
                  <span class="name">
                    {{ item.pluginName }} - {{ item.version }}
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
            <div class="ig"/>
            <!--已选插件版本-->
            <div class="n">
              <div class="label">
                {{ dialogAdd.n }}
              </div>
              <div class="list">
                {{ dialogAdd.nList }}
                <div v-for="(item,index) in dialogAdd.nList"
                     :key="index"
                     class="li">
                  <span class="name">
                    {{ item.pluginName }} - {{ item.version }}
                  </span>
                  <span class="deleteNIcon" @click='deleteSeletedOption(item,index)'>
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
            <div class="btnGroup-btn save" @click="taskDefine" :class="[{'disable-self': !disableSelf}]">
              <span>
                {{ dialogAdd.save }}
              </span>
            </div>
            <div class="btnGroup-btn cancel" @click="innerVisible = false">
              <span>
                {{ dialogAdd.cancel }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
    <!--操作指南-->
    <operation-guide v-show="infoMessageShow" @shutMe="infoMessageShow = false" v-operating/>
  </div>
</template>

<script>
  import {
    createTaskSet,
    createTaskSetSoftware,
    createTaskSetPlugin,
    createTaskSetDeletePlugin,
    createTaskSetNewPlugin,
    createTaskSetEditPlugin,
    pushTask,
    upTopCJ,
    upTopGC,
    oneMorePath
  } from '@/api/api'
  import {
    identify,
    catalogue,
    getFileType,
    savePath,
    newTaskProfession
  } from '@/api/newTask-api'
  import {
    mapState
  } from 'vuex'
  import {
    messageFun,
    IEVersion
  } from '@/assets/common.js'
  import operationGuide from '@/components/home/operation-guide'

  export default {
    name: 'new-task',
    data() {
      return {
        type: null,                // 文件渲染模式
        title: '',
        navL: [
          '选择渲染文件',
          '设置渲染模板',
          '设置渲染参数'
        ],
        stepBtnOne: '选择场景文件',
        stepBtnTwo: '设置渲染模板',
        stepBtnActive: 1,
        btn: {
          next: '下一步',
          previous: '上一步',
          confirm: '确认'
        },
        stepOneBase: {   // 选择渲染文件
          showMe: false,
          selectionTableData: [],   // 选择场景文件 table 多选值
          index: 0,
          btnList: [
            {
              span: '我的资产',
              imgUrl: require('@/icons/fileIcon.png')
            },
            {
              span: '我的电脑',
              imgUrl: require('@/icons/computerIcon.png')
            }
          ],
          netdisc: {     // 我的资产
            pathLabel: '工程路径',
            pathV: '选择工程路径',
            fileLabel: '场景文件',
            warnSpan: '请先选择工程路径',
            selectionDefault: [],   // 选中场景文件
            catalogData: [],        // 工程路径 - 树状图
            defaultProps: {
              children: 'children',
              label: 'label'
            },
            sceneFilePath: ['我的资产', 'D', 'Maya文件'],      // 场景文件 - 面包屑

          },
          local: {
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
          },
        },
        stepTwoBase: {
          addMoreText: '添加模板',
          //设置渲染模板 - 已存在列表
          renderList: [
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
          ],
          renderListActive: 0     //选中索引
        },
        innerVisible: false,      //添加模板
        // 添加模板窗口
        dialogAdd: {
          title: '添加模板',
          namePlaceholder: '输入模版名称',
          form: {
            labelName: '模板名称',
            valName: '',
            formatName: false,
            labelSoftware: '渲染软件',
            valSoftware: '',
            labelPlugin: '渲染插件',
            valPlugin: ''
          },
          // 渲染软件
          softwareList: [
            // {
            //   softName: 'Maya 2020',
            //   softList: []
            // }
          ],
          // 渲染插件下拉框
          pluginList: [
            // {
            //   label: 'mloa',
            //   val: 'mloa'
            // }
          ],
          o: '选择插件版本',
          n: '已选插件版本',
          // 插件版本
          oList: [
            // {
            //    id: 2
            //    pluginName: "Arnold"
            //    version: "2.233"
            //    publisher: "4K"
            //    pluginUuid: "457"
            //    createTime: "2020-03-31"
            //    createBy: "1"
            //    updateTime: "2020-03-31"
            //    updateBy: "1"
            //    dataStatus: 1
            //    status: false
            // }
          ],
          // 已选结果
          nList: [
            // {
            //   pluginUuid: '10011',
            //   pluginName: 'mloa',
            //   version: 'mloa 4.0.2',
            //   status: false
            // }
          ],
          cancel: '取消',
          save: '保存',
          // 【确定】标记编辑or新建
          editOrAdd: '',
          index: null      //编辑已存在模板时模板的索引
        },
        infoMessageShow: false,
        // 场景文件 + 工程文件 + 工程路径
        filelist: [
          // {
          //   sceneFile: '',      // 场景名
          //   address: ''         // 工程路径
          // }
        ],
        socket_: null,             // websocket 对象
        numberOfReconnections: 0,  // 连接失败 - 重连次数
        socketStatus: false,       // websocket 是否在连接状态
        renderFileType: ['ma', 'mb']// 可用的场景文件格式
      }
    },
    props: {},
    components: {operationGuide},
    computed: {
      ...mapState(['zoneId']),
      // 验证表格是否填写完整
      disableSelf() {
        let a = this.dialogAdd
        if (a.form.valName && a.nList.length && a.form.formatName) return true
        else return false
      }
    },
    methods: {
      // 连接插件
      openWebsocket() {
        this.socketStatus = null
        this.socket_ = new WebSocket('ws://192.168.1.85:15000')    //第二个参数可选 指定可接受的子协议
        this.socket_.addEventListener('open', () => {
          console.log('--插件连接成功--')
          this.numberOfReconnections = 0
          this.socketStatus = true
          // this.socket_.send('connect_success gaoge')
        })
        this.socket_.addEventListener('error', e => {
          if (this.numberOfReconnections >= 5) {
            console.log('--websocket--与插件连接失败--')
            this.socketStatus = false
            return false
          }
          console.log('--插件重连中--')
          this.numberOfReconnections++
          this.openWebsocket()
        })
        this.socket_.addEventListener('message', e => {
          this.getMessage(e)
        })
        this.socket_.addEventListener('close', e => {

        })
      },
      // 接收插件信息
      getMessage(e) {
        let t = e.result
        if (!t || t[0] !== 0) {
          // 报错
          return false
        }
        t[1].forEach(item => {
          let n = item.lastIndexOf('/')
          this.filelist.push({
            sceneFile: item.slice(0, n), // 场景名
            address: item.slice(n)       // 工程路径
          })
        })
      },
      // 断开插件
      shutWebsocket() {
        this.socket_.close()
      },
      // 获取可用场景文件格式
      async getRenderFileType() {
        let data = await getFileType()
        this.renderFiletype = data.data.data.split(',').map(item => item.match(/\w/g))
      },
      // 选择渲染文件 - 切换选择文件方式
      changeFileSelection(index) {
        this.stepOneBase.index = index
        // 判断是否已连接插件
        if (index == 1 && !this.socket_) this.openWebsocket()

      },
      renderHeader(h, {column}) {
        return h('span', {}, [
          h('span', {}, column.label),
          h('img', {
            attrs: {
              class: 'ix',
              src: require('@/icons/problemIcon.png'),
              style: 'vertical-align: text-bottom;margin-left: 8px;cursor: pointer;',
              title: '南'
            },
            on: {click: () => this.infoMessageShow = true}
          })
        ])
      },
      // 设置渲染模板 - 添加模板 - 检验模板名格式
      nameVerif() {
        if (this.dialogAdd.form.valName.length > 50) {
          messageFun('error', '最多输入50个字符');
          this.dialogAdd.form.formatName = false;
          return false
        }
        this.dialogAdd.form.formatName = true
      },
      // 主体 - 关闭
      closeDialogFun() {
        this.$emit('closeDialogFun', '')
      },
      // 设置渲染模板 - 选择插件版本
      changeOIndex(index) {
        //插件版本左侧窗口切换选中状态
        this.dialogAdd.oList.forEach((curr, ind) => {
          // curr = {
          //   id: 2
          //   pluginName: "Arnold"
          //   version: "2.233"
          //   publisher: "4K"
          //   pluginUuid: "457"
          //   createTime: "2020-03-31"
          //   createBy: "1"
          //   updateTime: "2020-03-31"
          //   updateBy: "1"
          //   dataStatus: 1
          //   status: true
          // }
          // 当前选中项
          if (index == ind) {
            //当前插件是否有其它版本已被选中
            // 当前插件curr.pluginName
            // 当前版本curr.version
            let r = this.dialogAdd.nList.findIndex(c => {
              return c.pluginName == curr.pluginName
            })
            if (r != -1) {
              this.dialogAdd.nList.splice(r, 1)
            }
            // 若还未选中
            if (!curr.status) {
              // 判断此项是否已在选中项中
              let d = this.dialogAdd.nList.findIndex(c => {
                return c.pluginUuid == curr.pluginUuid
              })
              if (d == -1) {
                this.dialogAdd.nList.push(curr)
              }
              curr.status = true
            } else {
              curr.status = false
            }
          } else {
            // 其它项
            curr.status = false
          }
        })
      },
      // 设置渲染模板 - 删除已选择插件结果
      deleteSeletedOption(item, index) {
        this.dialogAdd.oList.findIndex(curr => {
          if (item.pluginUuid == curr.pluginUuid)
            curr.status = false
          return item.pluginUuid == curr.pluginUuid
        })
        this.dialogAdd.nList.splice(index, 1)
      },
      // 设置渲染模板 - 获取渲染模板列表
      async getList() {
        let data = await createTaskSet()
        this.stepTwoBase.renderList = data.data.data
        this.stepTwoBase.renderListActive = data.data.data.findIndex(curr => curr.renderTemplate.isDefault == 1)
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
      },
      // 设置渲染模板 - 打开【新建模板】
      async addTemplate(s, index) {
        // 获取软件列表
        let data = await createTaskSetSoftware()
        this.dialogAdd.softwareList = data.data.data.map(curr => {   //options
          return {
            value: curr.softName,      //软件名
            label: curr.softName,
            children: curr.softList.map(curr_ => {
              return {
                label: curr_.softName + '-' + curr_.version,
                value: curr_.softUuid
              }
            })
            // children: [
            //   {
            //     value: 'shejiyuanze',
            //     label: '设计原则',
            //     children: [
            //       {
            //         value: 'yizhi',
            //         label: '一致'
            //       }
            //     ]
            //   }
            // ]       //软件版本
          }
        })
        // 打开弹窗
        this.innerVisible = true
        this.dialogAdd.editOrAdd = s
        if (s == 'addOne') {
          // 新建模板
        }
        if (s == 'editOne') {
          // 编辑模板
          this.dialogAdd.index = index
          let t = this.stepTwoBase.renderList[index],   // 选中渲染模板data
            v = this.dialogAdd,
            f = v.softwareList.find(curr => {         // 软件选中记录
              return curr.label == t.renderTemplate.softName
            })
          let b = f['children'].find(curr => {                // 插件
            return curr.label == t.renderTemplate.softName + '-' + t.renderTemplate.softVer
          })
          // debugger
          v.nList = t.xxlPlugins                             // 导入已选中插件记录
          this.$data.dialogAdd.nList = t.xxlPlugins
          v.form.valName = t['renderTemplate']['templateName']              //编辑窗口内模板名
          if (!b) return false
          v.form.valSoftware = [t['renderTemplate']['softName'], b.value]   //编辑窗口内渲染软件
          this.changeSoftware([t['renderTemplate']['softName'], b.value])   //获取对应插件下拉框List
        }
      },
      // 设置渲染模板 - 删除模板
      deleteTemplate(index) {
        this.$confirm('删除后将无法找回，确认删除当前模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false
        })
          .then(() => {
            createTaskSetDeletePlugin(this.stepTwoBase.renderList[index]['renderTemplate']['templateUuid'])
              .then(data => {
                this.getList()
                messageFun('success', '删除成功')
              })
          })
          .catch(() => {
            messageFun('info', '已取消删除')
          })
      },
      // 设置渲染模板 - 软件下拉框选中
      async changeSoftware(val) {
        let data = await createTaskSetPlugin(val[1])
        this.dialogAdd.pluginList = data.data.data.map(curr => {
          return {
            label: curr.pluginName,
            val: curr.pluginName,
            list: curr.pluginList
          }
        })
        this.dialogAdd.oList = []
      },
      // 设置渲染模板 - 插件下拉框选中
      changePlugin(val) {
        //匹配项
        let t = this.dialogAdd.pluginList.find(curr => {
          return curr.val == val
        })
        this.dialogAdd.oList = t.list.map(curr => {
          let r = this.dialogAdd.nList.findIndex(c => {
            return c.pluginName == curr.pluginName && c.version == curr.version
          })
          return {
            ...curr,
            status: r == -1 ? false : true
          }
        })
        // {
        //   id: '0001',
        //   software: 'mloa',
        //   plugin: 'mloa 4.0.2',
        //   status: false
        // }
        // t.list.map(curr => {
        // id: 2
        // pluginName: "Arnold"
        // version: "2.233"
        // publisher: "4K"
        // pluginUuid: "457"
        // createTime: "2020-03-31"
        // createBy: "1"
        // updateTime: "2020-03-31"
        // updateBy: "1"
        // dataStatus: 1
        // })
      },
      // 关闭 新建/编辑模板窗口
      closeAddTemplateDialog() {
        // 窗口数据初始化
        this.dialogAdd.form.valName = ''
        this.dialogAdd.form.valSoftware = ''
        this.dialogAdd.form.softwareList = []
        this.dialogAdd.form.valPlugin = ''
        this.dialogAdd.pluginList = []
        this.dialogAdd.oList = []
        this.dialogAdd.nList = []
      },
      // 设置渲染模板 - 添加or修改
      async taskDefine() {
        let val
        // 若表格未填写完整 返回
        if (!this.disableSelf) return false
        switch (this.dialogAdd.editOrAdd) {
          // 新建模板
          case 'addMore':
            val = {
              templateName: this.dialogAdd.form.valName,        //模板名称
              softUuid: this.dialogAdd.form.valSoftware[1],     //软件uuid
              pluginUuids: this.dialogAdd.nList.map(curr => {
                return curr.pluginUuid
              })
            }
            let data = await createTaskSetNewPlugin(val)
            if (data.data.code == 201) {
              messageFun('success', '创建模板成功')
              this.innerVisible = false
              this.getList()
            }
            //创建失败
            break
          // 编辑模板
          case 'editOne':
            let obj = this.stepTwoBase['renderList'][this.dialogAdd.index]
            val = {
              templateUuid: obj['renderTemplate']['templateUuid'],                 // 模板uuid
              templateName: this.dialogAdd.form.valName,                           // 模板名称
              softUuid: this.dialogAdd.form.valSoftware[1],                        // 软件uuid
              isDefault: obj['renderTemplate']['isDefault'],                       // 是否默认
              pluginUuids: this.dialogAdd.nList.map(curr => {                      // 插件
                return curr.pluginUuid
              })
            }
            let data2 = await createTaskSetEditPlugin(val)
            if (data2.data.code == 200) {
              messageFun('success', '编辑成功')
              this.innerVisible = false
              this.getList()
            }
            // 编辑失败
            break
        }
      },
      // 选择场景文件 - table 多选值
      handleSelectionChange(val) {
        this.stepOneBase.selectionTableData = val
      },
      // 1.选择渲染文件 - 我的电脑 - 操作按钮
      operateBtnFun(action) {
        switch (action) {
          case '添加':
            this.operateBtnAddMore()
            break
          case '删除':
            this.operateBtnDelete()
            break
        }
      },
      // 1.选择渲染文件 - 我的资产 - 展开网盘目录
      expandDiskDirectory() {
        this.stepOneBase.showMe = !this.stepOneBase.showMe
      },
      // 1.选择渲染文件 - 我的电脑 -【添加】新场景文件
      operateBtnAddMore() {
        if (this.filelist.length == 20) {
          messageFun('info', '操作失败，不能选择超过20个场景文件！');
          return false
        }
        if (this.socketStatus === null) {
          messageFun('error', '插件连接中，请稍后重试')
          return false
        } else if (this.socketStatus === false) {
          messageFun('error', '插件连接失败，无法选择文件')
          return false
        }
        // 通知插件选择本地文件
        this.socket_.send(JSON.stringify({
          transferType: 3,              // 传输类型
          operaType: 0,                 // 弹窗类型
          suffix: this.renderFileType   // 文件后缀
        }))
      },
      // 1.选择渲染文件 - 我的电脑 -【删除】新场景文件
      operateBtnDelete() {
        if (!this.stepOneBase.selectionTableData.length) {
          messageFun('error', '没有选中项')
          return false
        }
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let deleteIdList = this.stepOneBase.selectionTableData.map(curr => {
              return curr.id
            })
            deleteIdList.forEach(curr => {
              let index = this.filelist.findIndex((c, index) => {
                return c.id == curr
              })
              this.filelist.splice(index, 1)
            })
            messageFun('success', '删除成功')
          })
          .catch(() => {
            messageFun('info', '已取消删除')
          });
      },
      // 4.提交
      async confirmFun() {
        let data = await newTaskProfession({
          zoneUuid: this.zoneId,                             // 分区uuid
          templateUuid: 'cacb01da-bf06-45ae-9c47-7b151f03f7fc',    //选中模板uuid
          taskCount: 1,          // 要创建任务的数量
          pattern: this.taskType == 'easy' ? 1 : 2,          // 渲染模式
          patternNorm: 1,                     // 提交模式
          source: 1,                                         // 任务来源
          filePathList: [
            {
              filePath: {
                fileType: '1',
                inFileName: 'sdfsdf',
                fileName: 'sdf',
                inResourceName: 'sdf',
                inFilePath: 'fgb',
                inResourcePath: 'sdf',
                pathScene: 'sdf',
                pathResource: 'sdf'
              }
            },
          ],
          commitTaskDTO: this.taskType != 'easy' ? null : {
            layer: '',                        // 是否开启分层渲染。1开启，0关闭
            renderPattern: '',                // 配置组编号
            taskType: '',                     // 任务类型
            otherSettings: {
              projectName: '',
              projectUuid: '',
              frameTimeoutWarn: '',
              frameTimeoutStop: ''
            },
            testRender: {                     // 测试帧信息对象
              testRendering: '',              // 是否开启测试渲染
              frameFirst: '',                 // 首帧
              frameMiddle: '',                // 末帧
              frameFinally: ''                // 中间帧
            },
          }
        })
        // this.savePathFun()       // 保存历史工程路径
      },
      // 0.文件渲染模式
      async getIdentify() {
        let data = await identify()
        if (data.data.data == 1) this.taskType = 'profession'   // 专业版
        else if (data.data.data == 0) this.taskType = 'easy'    // 一键版
      },
      // 0.选择渲染文件 - 获取网盘目录
      async getCatalogue() {
        let data = await catalogue()
        if (data.data.code != 200) {
          messageFun('error', '网盘目录获取失败')
          return false
        }
        this.createCatalog(data.data.data)
      },
      // 1.选择渲染文件 - 我的资产 - 创建网盘目录
      createCatalog(data) {
        data.forEach(item => {
          function g(item_) {
            let children = []
            for (let t in item_) {
              if (item_[t] == '-') children.push({'label': t})
              else children.push({'label': t, children: g(item_[t])})
            }
            return children
          }

          this.stepOneBase.netdisc.catalogData = this.stepOneBase.netdisc.catalogData.concat(g(JSON.parse(item)))
        })
      },
      // 3.设置渲染参数 - 上传工程路径记录
      savePathFun() {
        savePath({
          'sceneFilePath': '/demo'
        })
      }
    },
    mounted() {
      this.getIdentify()         // 识别文件渲染模式
      this.getCatalogue()        // 查询网盘目录
      // this.getRenderFileType()   // 获取可用的场景文件格式
      this.getList()             // 获取渲染模板列表
    },
    directives: {
      operating: {
        bind(el, bindings, vnode) {
          let handler = e => {
            if (!el.contains(e.target)) {
              if ([...e.target.classList].includes('ix')) return false
              if (vnode.context.infoMessageShow) vnode.context.infoMessageShow = false
            }
          }
          el.handler = handler
          document.addEventListener('click', handler)
        },
        unbind(el) {
          document.removeEventListener('click', el.handler)
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .newTask {
    user-select: none;
    height: 80vh;
    position: relative;

    .header {
      background-color: rgba(241, 244, 249, 1);
      box-shadow: 0px 1px 6px 0px rgba(27, 83, 244, 0.3);
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 30px;

      .title {
        font-size: 18px;
        font-weight: 600;
        color: rgba(22, 29, 37, 1);
        line-height: 25px;
      }

      .closeBtn {
        width: 12px;
        cursor: pointer;
        opacity: 0.8;
      }
    }

    .stepGroup {
      height: calc(100% - 35px - 20px - 72px);
      padding: 20px 30px 0px;

      .navL {
        ul {
          display: flex;
          flex-direction: row;
        }

        .li {
          position: relative;
          width: 277px;
          height: 37px;
          display: flex;
          align-items: center;
          padding-left: 45px;
          box-sizing: border-box;
          margin-right: -12px;
          opacity: 0.3;

          .svg {
            position: absolute;
            left: 0px;
          }

          .i {
            position: relative;
            width: 19px;
            height: 19px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 0px 3px rgba(255, 255, 255, 0.3);
            font-size: 14px;
            font-weight: 500;
            color: rgba(27, 83, 244, 1);
            text-align: center;
            margin-right: 8px;
          }

          .s {
            position: relative;
            font-size: 14px;
            font-family: SourceHanSansCN-Medium, SourceHanSansCN;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }

          &:nth-of-type(1) {
            padding-left: 20px;
          }

          &.active {
            opacity: 1;
          }
        }
      }

      .stepBody {
        margin-top: 20px;
        position: relative;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 0px 6px 6px 6px;
        height: 440px;
        overflow: hidden;

        .stepBody-item {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: row;

          /*选择场景文件*/

          .sele {
            flex-shrink: 0;
            width: 143px;
            border-radius: 4px;
            border: 1px solid rgba(22, 29, 37, 0.15);
            padding-top: 26px;
            box-sizing: border-box;

            .li {
              height: 28px;
              background-color: rgba(246, 246, 246, 1);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 16px;
              opacity: 0.6;
              cursor: pointer;

              .img {
                margin-right: 10px;
              }

              .span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                color: rgba(22, 29, 37, 1);
              }

              &.active {
                opacity: 1;
              }
            }
          }

          .sec {
            flex-grow: 1;
            width: 1px;
            border-radius: 4px;
            border: 1px solid rgba(22, 29, 37, 0.15);
            margin-left: 10px;

            /*我的网盘*/

            .netdist {
              padding: 20px;
              box-sizing: border-box;

              .farm-form-item {
                display: flex;
                position: relative;

                .farm-form-item-label {
                  width: 85px;
                }

                .farm-form-item-input {
                  flex-grow: 1;
                  border: 1px solid rgba(22, 29, 37, 0.2);

                  &.b {
                    position: relative;
                    height: 340px;
                    padding: 0px 20px;

                    /*选择渲染文件 - 我的资产 - 场景文件 - nav*/

                    .pathList {
                      position: absolute;
                      top: 0px;
                      height: 34px;
                      width: calc(100% - 40px);
                      border-bottom: 1px solid rgba(22, 29, 37, 0.29);
                      display: flex;
                      align-items: center;

                      .filePathLi {
                        display: flex;
                        align-items: center;

                        &:nth-last-of-type(1) {
                          .im {
                            display: none;
                          }
                        }

                        .s {
                          color: rgba(22, 29, 37, 0.6);
                          font-size: 14px;
                          cursor: pointer;
                          font-family: PingFangSC-Regular, PingFang SC;

                          &:hover {
                            color: rgba(22, 29, 37, 0.8);
                          }
                        }
                      }
                    }

                    .null {
                      display: flex;
                      flex-direction: column;
                      align-items: center;

                      .span {
                        font-size: 14px;
                        font-family: PingFangSC-Regular, PingFang SC;
                        color: rgba(22, 29, 37, 0.29);
                      }
                    }

                    &.null {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    }
                  }

                  &.p {
                    position: relative;
                    padding: 0px 20px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .sp {
                      font-size: 14px;
                      font-family: PingFangSC-Regular, PingFang SC;
                      color: rgba(22, 29, 37, 0.4);
                    }

                    .im {
                      transform: rotate(0deg);
                      transition: all 0.2s;
                      cursor: pointer;

                      &.active {
                        transform: rotate(180deg);
                      }
                    }

                  }
                }

                .netCatalogue {
                  position: absolute;
                  z-index: 1;
                  top: 44px;
                  right: 1px;
                  width: 510px;
                  height: 0px;
                  border-radius: 6px;
                  box-shadow: 0px 0px 0px 1px rgba(22, 29, 37, 0);
                  background-color: rgba(255, 255, 255, 1);
                  transition: all 0.2s;
                  overflow: hidden;

                  &.active {
                    height: 320px;
                    box-shadow: 0px 0px 0px 1px rgba(22, 29, 37, 0.2);
                  }
                }

              }
            }

            /*我的电脑*/

            .local {
              height: 100%;

              .operate {
                margin: 10px;
                text-align: right;
              }

              .table {
                padding: 0px 20px;
                height: calc(100% - 46px);

                /deep/ .el-table {
                  height: 100%;

                  .el-table__body-wrapper {
                    height: calc(100% - 47px);
                  }
                }

                .addressNameBase {
                  position: relative;

                  .addressNameText {
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(0, 97, 255, 1);
                    line-height: 26px;
                  }

                  .addressNameInput {
                    position: absolute;
                    left: 0px;
                    height: 26px;
                    opacity: 0;
                  }
                }

                .address-span {
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(22, 29, 37, 0.8);

                  &.inputing {
                    display: none;
                  }
                }

                .address-input {
                  position: absolute;
                  left: 10px;
                  top: 13px;
                  font-size: 14px;
                  font-weight: 400;
                  color: rgba(22, 29, 37, 0.8);
                  background-color: transparent;
                  border: 0px;
                  outline: none;
                  opacity: 0;
                  font-family: 'SourceHanSansCN', 'Arial Bold';

                  &.inputing {
                    opacity: 1;
                  }
                }

                .se {
                  position: absolute;
                  right: 24px;
                  top: 18px;
                  width: 13px;
                  opacity: 0.6;
                  cursor: pointer;
                }
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
              width: 200px;
              height: 150px;
              border-radius: 8px;
              overflow: hidden;
              margin: 30px 0px 0px 30px;
              cursor: pointer;

              &.addMore {
                width: 196px;
                height: 146px;
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
                  font-size: 12px;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 0.3);
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
                    display: inline-block;
                    width: 94px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
                  .plugin {
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
                  box-shadow: 0px 1px 15px 0px rgba(0, 97, 255, 0.3);
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

          &.selectFile {
            display: flex;
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
        font-size: 18px;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
        letter-spacing: 4px;
      }

      .closeBtn {
        float: right;
        width: 18px;
        height: 18px;
        cursor: pointer;
        opacity: 0.6;
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
        border: 1px solid rgba(255, 255, 255, 0.4);

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

        &.disable-self {
          background-color: rgba(166, 166, 166, 0.6);
          color: rgba(255, 255, 255, 0.4);
          cursor: default;
        }
      }
    }
  }

  .inputError {
    color: #f40 !important;
  }
</style>
