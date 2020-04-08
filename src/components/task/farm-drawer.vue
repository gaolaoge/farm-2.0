<template>
  <div class="farm-drawer-wrapper">
    <!--分析结果-->
    <div class="farm-drawer" :class="[{'active': showDrawer}]" v-show="whichOneToShow == 'details'">
      <div class="farm-drawer-title">
        <div class="drawer-t">
          <span class="drawer-text">
            {{ details.t }}
          </span>
        </div>
        <div class="closeIcon">
          <img src="@/icons/closeBtnIcon.png" alt="" @click="closeDrawer">
        </div>
      </div>
      <div class="farm-drawer-body e">
        <div class="farm-drawer-body-item one">
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelId }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valId }}
            </span>
          </div>
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelName }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valName }}
            </span>
          </div>
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelCreateTime }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valCreateTime }}
            </span>
          </div>
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelState }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valState }}
            </span>
          </div>
        </div>
        <div class="farm-drawer-body-item two">
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelProgress }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valProgress }}
            </span>
          </div>
          <div class="farm-drawer-item">
            <span class="farm-drawer-item-label">
              {{ details.labelLog }}：
            </span>
            <span class="farm-drawer-item-val">
              {{ details.valLog }}
            </span>
          </div>
          <div class="errorList">
            <div class="farm-drawer-list-item" v-for="item,index in details.errorList">
              <div class="icon">
                <img src="@/icons/errorIcon.png" alt="">
              </div>
              <div class="text">
                <span class="t">
                  {{ item.title }}
                </span>
                <span class="c">
                  {{ item.content }}
                </span>
              </div>
            </div>
          </div>
          <div class="warningList">
            <div class="farm-drawer-list-item" v-for="item,index in details.warningList">
              <div class="icon">
                <img src="@/icons/warningIcon.png" alt="">
              </div>
              <div class="text">
                <span class="t">
                  {{ item.title }}
                </span>
                <span class="c">
                  {{ item.content }}
                </span>
              </div>
            </div>
          </div>
          <div class="farm-drawer-btn farm-drawer-again-btn">
            {{ details.btnGroup.again }}
          </div>
          <div class="farm-drawer-btn farm-drawer-ignoreAndSetting-btn">
            {{ details.btnGroup.ignoreAndSetting }}
          </div>
          <div class="farm-drawer-btn farm-drawer-setting-btn">
            {{ details.btnGroup.setting }}
          </div>
        </div>
      </div>
    </div>
    <!--设置参数-->
    <div class="farm-drawer s" :class="[{'active': showDrawer}]" v-show="whichOneToShow == 'setting'">
      <div class="farm-drawer-title">
        <div class="drawer-t">
          <span class="drawer-text">
            {{ setting.t }}
          </span>
        </div>
        <div class="closeIcon">
          <img src="@/icons/closeBtnIcon.png" alt="" @click="closeDrawer">
        </div>
      </div>
      <div class="farm-drawer-body e">
        <!--渲染层数-->
        <div class="farm-drawer-body-item three">
          <!--标题-->
          <div class="farm-drawer-body-item-header">
            <span class="farm-drawer-body-item-header-main">
              {{ setting.num.title }}
            </span>
            <span class="farm-drawer-body-item-header-assist">
              {{ setting.num.miniTitO }}{{ setting.num.val }}{{ setting.num.miniTitT }}
            </span>
            <div class="switchLayered">
              <el-switch
                v-model="setting.num.singleChoiceVal"
                inactive-color="RGBA(256, 1256, 256, 0.5)"
                active-color="rgba(10, 98, 241, 1)">
              </el-switch>
              <span class="switchLayeredText">
                {{ setting.num.singleChoice }}
              </span>
              <el-tooltip class="item"
                          popper-class="t"
                          effect="dark"
                          content="如果您需要将场景文件的毎一层都可以作为一个子任务单独进行渲染，请启用此项。"
                          placement="bottom-end">
                <img src="@/icons/question-mark-icon.png" alt="" class="mark">
              </el-tooltip>
            </div>
          </div>
          <!--table-->
          <el-table
            :data="setting.num.tableData"
            class="mini-table"
            :row-class-name="tableRowClassName"
            style="width: calc(42vw - 34px);min-width: 766px;margin-left: -30px;">

            <el-table-column
              type="selection"
              align="right"
              width="55" />

            <el-table-column
              prop="name"
              label="层名"
              width="180" />
            <!--帧范围-->
            <el-table-column
              label="帧范围"
              width="80">
              <template slot-scope="scope">
                <span :class="[{'show': scope.row.rangeEdit == false}]"
                      class="farm-table-td-span">
                  {{ scope.row.range }}
                </span>
                <input type="text"
                       v-model="scope.row.range"
                       :class="[{'show': scope.row.rangeEdit == true}]"
                       @focus="scope.row.rangeEdit = true"
                       @blur="rangeChange($event,scope.$index)"
                       class="farm-table-td-input">
              </template>
            </el-table-column>
            <!--间隔帧数-->
            <el-table-column
              width="80"
              label="间隔帧数">
              <template slot-scope="scope">
                <span :class="[{'show': scope.row.numEdit == false}]"
                      class="farm-table-td-span">
                  {{ scope.row.num }}
                </span>
                <input type="text"
                       v-model="scope.row.num"
                       :class="[{'show': scope.row.numEdit == true}]"
                       @focus="scope.row.numEdit = true"
                       @blur="numChange($event,scope.$index)"
                       class="farm-table-td-input">
              </template>
            </el-table-column>
            <!--图像宽度-->
            <el-table-column
              label="图像宽度"
              width="80">
              <template slot-scope="scope">
                <span :class="[{'show': scope.row.wEdit == false}]"
                      class="farm-table-td-span">
                  {{ scope.row.w }}
                </span>
                <input type="text"
                       v-model="scope.row.w"
                       :class="[{'show': scope.row.wEdit == true}]"
                       @focus="scope.row.wEdit = true"
                       @blur="wChange($event,scope.$index)"
                       class="farm-table-td-input">
              </template>
            </el-table-column>
            <!--图像高度-->
            <el-table-column
              label="图像高度">
              <template slot-scope="scope">
                <span :class="[{'show': scope.row.hEdit == false}]"
                      class="farm-table-td-span">
                  {{ scope.row.h }}
                </span>
                <input type="text"
                       v-model="scope.row.h"
                       :class="[{'show': scope.row.hEdit == true}]"
                       @focus="scope.row.hEdit = true"
                       @blur="hChange($event,scope.$index)"
                       class="farm-table-td-input">
              </template>
            </el-table-column>
            <!--输出格式-->
            <el-table-column
              label="输出格式"
              width="160">
              <template slot-scope="scope">
                <el-select v-model="scope.row.format">
                  <el-option
                    v-for="item,index in setting.num.tableSelectionList.format"
                    :key="index"
                    :label="item.label"
                    :value="item.val">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              label="相机"
              width="180">
              <template slot-scope="scope">
                <el-select v-model="scope.row.camera">
                  <el-option
                    v-for="item,index in setting.num.tableSelectionList.camera"
                    :key="index"
                    :label="item.label"
                    :value="item.val">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <!--优先渲染-->
        <div class="farm-drawer-body-item ">
          <!--标题-->
          <div class="farm-drawer-body-item-header">
            <span class="farm-drawer-body-item-header-main">
              {{ setting.priority.title }}
            </span>
          </div>
          <!--开关-->
          <div class="farm-drawer-body-item-d addPadding">
            <div class="item-label">
              {{ setting.priority.label }}：
            </div>
            <!--首帧-->
            <div class="item-switch">
              <el-switch
                v-model="setting.priority.topVal"
                inactive-color="RGBA(256, 1256, 256, 0.5)"
                active-color="rgba(10, 98, 241, 1)">
              </el-switch>
              <span class="item-switch-label" :class="[{'active': setting.priority.topVal}]">
                {{ setting.priority.topLabel }}
              </span>
            </div>
            <!--中间帧-->
            <div class="item-switch">
              <el-switch
                v-model="setting.priority.middleVal"
                inactive-color="RGBA(256, 1256, 256, 0.5)"
                active-color="rgba(10, 98, 241, 1)">
              </el-switch>
              <span class="item-switch-label" :class="[{'active': setting.priority.middleVal}]">
                {{ setting.priority.middleLabel }}
              </span>
            </div>
            <!--末帧-->
            <div class="item-switch">
              <el-switch
                v-model="setting.priority.bottomVal"
                inactive-color="RGBA(256, 1256, 256, 0.5)"
                active-color="rgba(10, 98, 241, 1)">
              </el-switch>
              <span class="item-switch-label" :class="[{'active': setting.priority.bottomVal}]">
                {{ setting.priority.bottomLabel }}
              </span>
            </div>
          </div>
          <!--提示-->
          <span class="info">
            <img src="@/icons/warningIcon.png" alt="">
            {{ setting.priority.info }}
          </span>
        </div>
        <!--渲染模式-->
        <div class="farm-drawer-body-item ">
          <!--标题-->
          <div class="farm-drawer-body-item-header">
            <span class="farm-drawer-body-item-header-main">
              {{ setting.mode.title }}
            </span>
            <span class="farm-drawer-body-item-header-assist">
              {{ setting.mode.miniTitO }}<span class="rule">{{ setting.mode.rule }}</span>{{ setting.mode.miniTitT }}
            </span>
          </div>
          <div class="farm-drawer-body-item-d">
            <el-radio-group v-model="setting.mode.mode">
              <el-radio :label="item.val" v-for="item,index in setting.mode.modeList" :key="index">{{ item.label }}</el-radio>
            </el-radio-group>
          </div>

        </div>
        <!--其他设置-->
        <div class="farm-drawer-body-item set">
          <!--标题-->
          <div class="farm-drawer-body-item-header">
            <span class="farm-drawer-body-item-header-main">
              {{ setting.other.title }}
            </span>
          </div>
          <div class="farm-drawer-body">
            <!--所属项目-->
            <div class="farm-drawer-item">
              <span class="farm-drawer-item-label star">
                {{ setting.other.viewLabel }}
              </span>
              <el-select v-model="setting.other.view"
                         placeholder="选择已有项目名称"
                         class="workBench-optionBase haveBorder">
                <el-option
                  v-for="item,index in setting.other.viewList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span class="createBtn">
                <img src="@/icons/createIcon.png"
                     alt=""
                     class="createIcon">
                {{ setting.other.btn }}
              </span>
            </div>
            <!--超时提醒-->
            <div class="farm-drawer-item">
              <span class="farm-drawer-item-label">
                {{ setting.other.remindLabel }}
              </span>
              <el-slider v-model="setting.other.remindVal"
                         class="slider"
                         :min="1"
                         :max="72"/>
              <input type="text"
                     class="sliderVal"
                     @blur="changeSliderVal"
                     v-model="setting.other.remindVal">
            </div>
            <!--超时提醒-->
            <div class="farm-drawer-item">
              <span class="farm-drawer-item-label">
                {{ setting.other.stopLabel }}
              </span>
              <el-slider v-model="setting.other.stopVal"
                         class="slider"
                         :min="1"
                         :max="72" />
              <input type="text"
                     class="sliderVal"
                     @blur="changeStopVal"
                     v-model="setting.other.stopVal">
            </div>
          </div>
        </div>
        <!--按钮-->
        <div class="b">
          <div class="btn">
            {{ setting.btn.returnBtn }}
          </div>
          <div class="btn">
            {{ setting.btn.startBtn }}
          </div>
        </div>
      </div>
    </div>
    <!--渲染结果-->
    <div class="farm-drawer r" :class="[{'active': showDrawer}]" v-show="whichOneToShow == 'result'">
      <div class="farm-drawer-title">
        <div class="drawer-t">
          <span class="drawer-text">
            {{ result.t }}
          </span>
        </div>
        <div class="dataList">
          <div class="li cost">
            <span class="label">
              {{ result.dataO.costLabel }}：
            </span>
            <span class="val">
              {{ result.dataO.costVal }}
            </span>
          </div>
          <div class="li total">
            <span class="label">
              {{ result.dataO.totalLabel }}：
            </span>
            <span class="val">
              {{ result.dataO.totalVal }}
            </span>
          </div>
          <div class="li average">
            <span class="label">
              {{ result.dataO.averageLabel }}：
            </span>
            <span class="val">
              {{ result.dataO.averageVal }}
            </span>
          </div>
        </div>
        <div class="closeIcon">
          <img src="@/icons/closeBtnIcon.png" alt="" @click="closeDrawer">
        </div>
      </div>
      <div class="farm-drawer-body r">
        <div class="info">
          <div class="thumbnail">
            <img src="@/assets/j.png" alt="" class="img">
            <span class="status">
              {{ result.statusData }}
            </span>
          </div>
          <div class="dataList">

            <!--任务ID-->
            <div class="item">
              <span class="label">
                {{ result.statusList.taskIdLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.taskIdVal }}
              </span>
            </div>

            <!--场景名-->
            <div class="item">
              <span class="label">
                {{ result.statusList.scenesNameLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.scenesNameVal }}
              </span>
            </div>

            <!--所属项目-->
            <div class="item">
              <span class="label">
                {{ result.statusList.projectLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.projectVal }}
              </span>
            </div>

            <!--渲染软件-->
            <div class="item">
              <span class="label">
                {{ result.statusList.softwareLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.softwareVal }}
              </span>
            </div>

            <!--渲染插件-->
            <div class="item">
              <span class="label">
                {{ result.statusList.pluginLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.pluginVal }}
              </span>
            </div>

            <!--层名-->
            <div class="item">
              <span class="label">
                {{ result.statusList.layerLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.layerVal }}
              </span>
            </div>

            <!--分辨率-->
            <div class="item">
              <span class="label">
                {{ result.statusList.resolutionLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.resolutionVal }}
              </span>
            </div>

            <!--输出格式-->
            <div class="item">
              <span class="label">
                {{ result.statusList.formatLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.formatVal }}
              </span>
            </div>

            <!--相机-->
            <div class="item">
              <span class="label">
                {{ result.statusList.cameraLabel }}：
              </span>
              <span class="val">
                {{ result.statusList.cameraVal }}
              </span>
            </div>

            <!--渲染模式-->
            <div class="item">
              <span class="label">
                {{ result.statusList.modeLabel }}：
              </span>
              <span class="val" :title="result.statusList.modeVal">
                {{ result.statusList.modeVal }}
              </span>
            </div>

            <!--创建人-->
            <div class="item">
              <span class="label">
                {{ result.statusList.founderLabel }}：
              </span>
              <span class="val" :title="result.statusList.founderVal">
                {{ result.statusList.founderVal }}
              </span>
            </div>

            <!--创建时间-->
            <div class="item">
              <span class="label">
                {{ result.statusList.creationTimeLabel }}：
              </span>

              <el-tooltip class="item"
                          effect="dark"
                          :content="result.statusList.creationTimeVal"
                          placement="right-end">
                <span class="val" :title="result.statusList.creationTimeVal">
                {{ result.statusList.creationTimeVal }}
              </span>
              </el-tooltip>
            </div>

          </div>
        </div>
        <div class="list">
          <div class="table">
            <!--操作-->
            <div class="operateBtnBase">
              <div class="operateBtn" v-for="item,index in result.operateBtnList" :key="index">
                <img :src="item.imgUrl" alt="" v-if="item.imgUrl">
                <span class="text">
                {{ item.text }}
              </span>
              </div>
              <div class="searchBase">
                <img src="@/icons/searchIcon.png" alt="" class="i">
                <input type="text" class="search" placeholder="搜索帧">
              </div>
            </div>
            <!--主table-->
            <div class="tableBase task-table-seeMore" v-show="!result.showDetails">
              <el-table
                :data="result.tableData"
                @selection-change="handleSelectionChange"
                @filter-change="filterHandler"
                class="v"
                :border=true
                style="width: 100%">

                <el-table-column
                  type="selection"
                  align="right"
                  show-overflow-tooltip
                  min-width="58"
                  width="58" />
                <!--帧数-->
                <el-table-column
                  prop="num"
                  label="帧数"
                  sortable
                  show-overflow-tooltip
                  width="120" />
                <!--帧状态-->
                <el-table-column
                  prop="status"
                  label="帧状态"
                  show-overflow-tooltip
                  min-width="120" />
                <!--渲染费用（金币）-->
                <el-table-column
                  prop="prices"
                  label="渲染费用（金币）"
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
                  width="172" />
                <!--渲染时长-->
                <el-table-column
                  prop="direction"
                  label="渲染时长"
                  show-overflow-tooltip
                  width="160" />
                <!--渲染开始时间-->
                <el-table-column
                  prop="startDate"
                  label="渲染开始时间"
                  sortable
                  show-overflow-tooltip
                  width="180" />
                <!--渲染结束时间-->
                <el-table-column
                  prop="endDate"
                  label="渲染结束时间"
                  sortable
                  show-overflow-tooltip
                  width="180" />
                <!--CPU利用率-->
                <el-table-column
                  prop="percent"
                  label="CPU利用率"
                  show-overflow-tooltip
                  width="110" />
                <!--内存峰值-->
                <el-table-column
                  prop="RAM"
                  label="内存峰值"
                  sortable
                  show-overflow-tooltip
                  width="120" />
                <!--已下载次数-->
                <el-table-column
                  prop="times"
                  label="已下载次数"
                  sortable
                  show-overflow-tooltip
                  width="140" />
                <!--日志-->
                <el-table-column
                  prop="log"
                  label="日志"
                  sortable
                  show-overflow-tooltip
                  width="140">
                  <template>
                  <span class="seeMore" @click="showMore">
                    查看
                  </span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
            <!--详情table-->
            <div class="tableBase task-table-seeMore-details" v-show="result.showDetails">
              <el-table
                :data="result.detailsTableData"
                @selection-change="handleDetailsSelectionChange"
                class="g"
                :border=true
                style="width: 100%">

                <el-table-column
                  type="selection"
                  align="right"
                  show-overflow-tooltip
                  min-width="58"
                  width="58" />
                <!--帧数-->
                <el-table-column
                  prop="num"
                  label="帧数"
                  sortable
                  show-overflow-tooltip
                  width="120" />
                <!--帧状态-->
                <el-table-column
                  prop="status"
                  label="帧状态"
                  show-overflow-tooltip
                  min-width="120" />
                <!--渲染费用（金币）-->
                <el-table-column
                  prop="prices"
                  label="渲染费用（金币）"
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
                  width="172" />
                <!--渲染时长-->
                <el-table-column
                  prop="direction"
                  label="渲染时长"
                  show-overflow-tooltip
                  width="160" />
                <!--渲染开始时间-->
                <el-table-column
                  prop="startDate"
                  label="渲染开始时间"
                  sortable
                  show-overflow-tooltip
                  width="180" />
                <!--渲染结束时间-->
                <el-table-column
                  prop="endDate"
                  label="渲染结束时间"
                  sortable
                  show-overflow-tooltip
                  width="180" />
                <!--CPU利用率-->
                <el-table-column
                  prop="percent"
                  label="CPU利用率"
                  show-overflow-tooltip
                  width="110" />
                <!--内存峰值-->
                <el-table-column
                  prop="RAM"
                  label="内存峰值"
                  sortable
                  show-overflow-tooltip
                  width="120" />
                <!--已下载次数-->
                <el-table-column
                  prop="times"
                  label="已下载次数"
                  sortable
                  show-overflow-tooltip
                  width="140" />
                <!--日志-->
                <el-table-column
                  prop="log"
                  label="日志"
                  sortable
                  show-overflow-tooltip
                  width="140">
                  <template>
                  <span class="seeMore">
                    查看
                  </span>
                  </template>
                </el-table-column>

              </el-table>
            </div>
            <!--详情-->

          </div>
          <div class="happen">
            <div class="happen-item" v-for="item,index in result.happen" :key="index">
              <span class="label">
                {{ item.text }}：
              </span>
              <span class="val">
                {{ item.num }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'farm-drawer',
    data(){
      return {
        details: {
          t: '分析结果',
          labelId: '任务ID',
          valId: '1009',
          labelName: '场景名',
          valName: '场景嘿嘿嘿.ma',
          labelCreateTime: '创建时间',
          valCreateTime: '2020-03-16 16:39:48',
          labelState: '当前状态',
          valState: '分析中...',
          labelProgress: '分析进度',
          valProgress: '正在分析文件贴图',
          labelLog: '分析日志',
          valLog: '正在全力加速分析中，请您稍等片刻～',
          errorList: [
            {
              title: '错误1：无法切换渲染层，请检查修改优化maya文件！',
              content: '建议：在脚本编辑器中的MEL窗口执行以下语句“fixRenderLayerQutAdjustErrors”，然后保存场景点击下方【添加任务】再次添加即可。'
            },
            {
              title: '错误1：无法切换渲染层，请检查修改优化maya文件！',
              content: '建议：在脚本编辑器中的MEL窗口执行以下语句“fixRenderLayerQutAdjustErrors”，然后保存场景点击下方【添加任务】再次添加即可。'
            },
            {
              title: '错误1：无法切换渲染层，请检查修改优化maya文件！',
              content: '建议：在脚本编辑器中的MEL窗口执行以下语句“fixRenderLayerQutAdjustErrors”，然后保存场景点击下方【添加任务】再次添加即可。'
            },
            {
              title: '错误1：无法切换渲染层，请检查修改优化maya文件！',
              content: '建议：在脚本编辑器中的MEL窗口执行以下语句“fixRenderLayerQutAdjustErrors”，然后保存场景点击下方【添加任务】再次添加即可。'
            }
          ],
          warningList: [
            {
              title: '警告1：当前输出图片命名可能会导致无法正常查看图片！',
              content: '建议：建议修改成：\'name.#.ext\'、\'name#.ext\'、\'name_#.ext’。'
            }
          ],
          btnGroup: {
            again: '重新分析',
            ignoreAndSetting: '忽略，设置参数',
            setting: '设置参数'
          }
        },
        setting: {
          t: '设置参数',
          // 渲染层书
          num: {
            title: '渲染层数',
            miniTitO: '（已选择',
            miniTitT: '个层）',
            val: '2',
            singleChoice: '启动分层渲染',
            // 分层渲染
            singleChoiceVal: false,
            tableSelectionList: {
              format: [
                {
                  label: 'AVI(avi)',
                  val: 'avi'
                },
                {
                  label: 'Cineon(cin)',
                  val: 'cin'
                },
                {
                  label: 'DDS(dds)',
                  val: 'dds'
                },
                {
                  label: 'EPS(eps)',
                  val: 'eps'
                },
                {
                  label: 'GIF(gif)',
                  val: 'gif'
                }
              ],
              camera: [
                {
                  label: '相机一',
                  val: '相机一'
                },
                {
                  label: '相机二',
                  val: '相机二'
                }
              ]
            },
            tableData: [
              {
                id: '1',
                name: '默认层',
                range: '1-24',
                num: '1',
                w: '231',
                h: '231',
                format: 'cin',
                camera: '相机二',
                rangeEdit: false,         //帧范围
                numEdit: false,           //间隔帧数
                wEdit: false,             //图像宽度
                hEdit: false,             //图像高度
              },
            ]
          },
          // 优先渲染
          priority: {
            title: '优先渲染',
            label: '优先渲染测试帧',
            topLabel: '首帧',
            topVal: '',
            middleLabel: '中间帧',
            middleVal: '',
            bottomLabel: '末帧',
            bottomVal: '',
            info: '测试帧渲染完成后，任务处于“待全部渲染”状态，请点击【全部渲染】'
          },
          // 渲染模式
          mode: {
            title: '渲染模式',
            miniTitO: '（',
            miniTitT: '）',
            rule: '计费规则说明',
            mode: '',
            modeList: [
              {
                val: '16核32G【标准模式1】',
                label: '16核32G【标准模式1】'
              },
              {
                val: '16核64G【标准模式2】',
                label: '16核64G【标准模式2】'
              },
              {
                val: '32核128G【标准模式3】',
                label: '32核128G【标准模式3】'
              }
            ]
          },
          // 其它设置
          other: {
            title: '其他设置',
            btn: '新建项目',
            viewLabel: '所属项目',
            viewList: [
              {
                value: '选项1',
                label: '黄金糕'
              },
              {
                value: '选项2',
                label: '双皮奶'
              },
              {
                value: '选项3',
                label: '蚵仔煎'
              },
              {
                value: '选项4',
                label: '龙须面'
              },
              {
                value: '选项5',
                label: '北京烤鸭'
              }
            ],
            view: '',
            remindLabel: '超时提醒 (h)',
            remindVal: 12,
            stopLabel: '超时停止 (h)',
            stopVal: 24
          },
          btn: {
            returnBtn: '返回',
            startBtn: '开始渲染'
          }
        },
        result: {
          t: '渲染结果',
          dataO: {
            costLabel: '费用(金币)',
            costVal: '22.0000',
            totalLabel: '总渲染时长',
            totalVal: '22分0秒',
            averageLabel: '平均渲染时长',
            averageVal: '1分0秒'
          },
          statusData: '渲染中...',
          statusList: {
            taskIdLabel: '任务ID',
            taskIdVal: '1009',
            scenesNameLabel: '场景名',
            scenesNameVal: '场景二.ma',
            projectLabel: '所属项目',
            projectVal: '项目一',
            softwareLabel: '渲染软件',
            softwareVal: 'Maya',
            pluginLabel: '渲染插件',
            pluginVal: '插件一',
            layerLabel: '层名',
            layerVal: '第一层',
            resolutionLabel: '分辨率',
            resolutionVal: '1920*1080',
            formatLabel: '输出格式',
            formatVal: '.tff',
            cameraLabel: '相机',
            cameraVal: '摄像机一',
            modeLabel: '渲染模式',
            modeVal: '16核32G 【标准模式一】',
            founderLabel: '创建人',
            founderVal: 'Admin',
            creationTimeLabel: '创建时间',
            creationTimeVal: '2020-03-16 16:39:48'
          },
          operateBtnList: [
            {
              imgUrl: require('@/icons/playIcon-blue.png'),
              text: '开始'
            },
            {
              imgUrl: require('@/icons/pauseIcon-blue.png'),
              text: '暂停'
            },
            {
              text: '下载完成帧'
            },
            {
              text: '重新渲染'
            },
          ],
          tableData: [
            // {
            //   num: null,      // 帧数
            //   status: '',     // 帧状态
            //   prices: null,   // 渲染费用（金币）
            //   direction: '',  // 渲染时长
            //   startDate: '',  // 渲染开始时间
            //   endDate: '',    // 渲染结束时间
            //   percent: '',    // CPU利用率
            //   RAM: '',        // 内存峰值
            //   times: null,    // 已下载次数
            //   log: ''         // 日志
            // },
            {
              num: '1（优先）',
              status: '完成',
              prices: '-',
              direction: '23分54秒',
              startDate: '2020-01-01 23:44:21',
              endDate: '2020-01-02 23:52:11',
              percent: '20%',
              RAM: '12.2G',
              times: 4,
              log: ''
            },
          ],           //主table数据
          detailsTableData: [
            {
              // num: null,      // 帧数
              // cost: null,     // 渲染费用
              // duration: '',   // 渲染时长
              // startDate: '',  // 渲染开始时间
              // endDate: '',    // 渲染结束时间
              // price: '',      // 单价
              // percent: '',    // CPU利用率
              // peak: ''        // 内存峰值
            },
            {
              num: '1（优先）',
              cost: 0.489,
              duration: '44秒',
              startDate: '2020-01-22 22:52:44',
              endDate: '2020-12-12 12:11:41',
              price: 4.0,
              percent: '20%',
              peak: '12.02G'
            },
          ],       //详情table数据
          selectionResult: [],        //主table多选结果
          detailsSelectionResult: [], //详情table多选结果
          happen: [
            {
              text: '渲染中',
              num: 1
            },
            {
              text: '等待',
              num: 0
            },
            {
              text: '暂停',
              num: 1
            },
            {
              text: '完成',
              num: 23
            },
            {
              text: '失败',
              num: 1
            }
          ],
          showDetails: false
        },
        whichOneToShow: 'result'
      }
    },
    props: {
      showDrawer: {
        type: Boolean,
        required: true
      },
      attribution: String,
      required: true
    },
    methods: {
      //关闭抽屉
      closeDrawer(){
        this.$emit('closeDrawer')
      },
      // 超时提醒改变
      changeSliderVal(e){
        let n = Number(e.target.value)
        if(n >= 1 && 72 >= n) {
          this.setting.other.remindVal = n
        }else {
          this.setting.other.remindVal = 12
        }
      },
      // 超时停止改变
      changeStopVal(e){
        let n = Number(e.target.value)
        if(n >= 1 && 72 >= n) {
          this.setting.other.stopVal = n
        }else {
          this.setting.other.stopVal = 24
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1) {
          return 'warning-row';
        } else if (rowIndex % 2 == 0) {
          return 'success-row';
        }
        return '';
      },
      // 帧范围修改
      rangeChange(e,index) {
        this.setting.num.tableData[index]['rangeEdit'] = false
        this.setting.num.tableData[index]['range'] = e.target.value
      },
      // 间隔帧数修改
      numChange(e,index) {
        this.setting.num.tableData[index]['numEdit'] = false
        this.setting.num.tableData[index]['num'] = e.target.value
      },
      // 图像宽度修改
      wChange(e,index) {
        this.setting.num.tableData[index]['wEdit'] = false
        this.setting.num.tableData[index]['w'] = e.target.value
      },
      // 图像高度修改
      hChange(e,index) {
        this.setting.num.tableData[index]['hEdit'] = false
        this.setting.num.tableData[index]['h'] = e.target.value
      },
      // 主table多选事件
      handleSelectionChange(val){
        this.result.selectionResult = val
      },
      // 详情table多选事件
      handleDetailsSelectionChange(val){
        this.result.detailsSelectionResult = val
      },
      // 主table筛选条件改变
      filterHandler(){

      },
      // 查看详情
      showMore(){
        this.showDetails = true
      }
    }
  }
</script>

<style lang="less" scoped>
  .rule {
    color: rgba(229, 199, 138, 1);
    opacity: 0.8;
    cursor: pointer;
    text-decoration: underline;
    transition: opacity 0.2s;
    &:hover {
      opacity: 1;
    }
  }
  /*渲染层数开关*/
  .switchLayered {
    float: right;
    .switchLayeredText {
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      vertical-align: middle;
      display: inline-block;
      margin-left: 4px;
    }
    .mark {
      vertical-align: middle;
      margin-left: 2px;
      cursor: pointer;
    }
  }
  .farm-drawer-body-item-d {
    padding-top: 15px;
    .item-label {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 10px;
    }
    .item-switch {
      display: inline-block;
      vertical-align: top;
      margin-right: 30px;
      .item-switch-label {
        margin-left: 5px;
        display: inline-block;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        vertical-align: middle;
        opacity: 0.6;
        transition: opacity 0.2s;
        &.active {
          opacity: 1;
        }
      }
    }
    &.addPadding {
      padding-bottom: 15px;
    }
  }
  .s {
    .farm-drawer-body-item {
      margin-bottom: 10px;
    }
    .info {
      margin-left: 122px;
      img {
        width: 13px;
        opacity: 0.59;
        vertical-align: middle;
        margin-right: 2px;
      }
      font-size: 12px;
      font-weight: 400;
      color: rgba(229, 199, 138, 0.6);
    }
    .set {
      .farm-drawer-body {
        padding: 0px 9px;

        .farm-drawer-item {
          .farm-drawer-item-label {
            width: 82px;
            margin-right: 28px;
          }
          .farm-drawer-item-val {

          }
          .slider {
            display: inline-block;
            width: 240px;
            vertical-align: middle;
          }
          .createBtn {
            display: inline-block;
            margin-left: 4px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(10, 98, 241, 1);
            cursor: pointer;
            .createIcon {
              width: 18px;
              vertical-align: middle;
              margin-left: 20px;
            }
          }
          &:nth-of-type(1) {
            margin-top: 15px;
          }
        }
      }
    }
    .b {
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 30px;
      height: 32px;
      width: calc(100% - 40px);
      padding: 0px 30px;
      box-sizing: border-box;
      .btn {
        border-radius: 8px;
        font-size: 14px;
        text-align: center;

        cursor: pointer;
        &:nth-of-type(1) {
          width: 102px;
          height: 30px;
          line-height: 30px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          color: rgba(255, 255, 255, 0.79);
        }
        &:nth-of-type(2) {
          width: 104px;
          height: 32px;
          background-color: rgba(10, 98, 241, 1);
          color: rgba(255, 255,255, 1);
          line-height: 32px;
        }
      }
    }
    .farm-drawer-item {
      &:nth-last-of-type(1) {
        padding-bottom: 0px;
      }
    }
  }
  .farm-table-td-span {
    opacity: 0;
    &.show {
      opacity: 1;
    }
  }
  .farm-table-td-input {
    position: absolute;
    left: 0px;
    width: calc(100% - 10px);
    padding-left: 10px;
    height: 23px;
    line-height: 23px;
    opacity: 0;
    background-color: transparent;
    outline: none;
    border: 0px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    font-family: 'MicrosoftYaHei';
    &.show {
      opacity: 1;
    }
  }
  .r {
    display: flex;
    .info {
      display: flex;
      flex-direction: column;
      width: 260px;
      height: calc(100% - 20px);
      margin-right: 20px;
      .thumbnail {
        height: 220px;
        padding: 10px;
        box-sizing: border-box;
        border-radius:4px;
        background-color: rgba(255, 255, 255, 0.05);
        margin-bottom: 23px;
        .img {
          width: 240px;
        }
        .status {
          position: relative;
          left: 21px;
          display: inline-block;
          margin-top: 15px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(9, 245, 150, 1);
          &::before {
            content: '';
            position: absolute;
            left: -13px;
            top: 8px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: rgba(9,245,150,1);
          }
        }
      }
      .dataList {
        flex-grow: 1;
        padding: 20px;
        box-sizing: border-box;
        border-radius:4px;
        background-color: rgba(255, 255, 255, 0.05);
        .item {
          margin-bottom: 15px;
          .label {
            display: inline-block;
            width:70px;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.8);
            margin-right: 19px;
          }
          .val {
            vertical-align: top;
            display: inline-block;
            width: 130px;
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.6);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .list {
      width: 841px;
      height: calc(100% - 20px);
      .table {
        padding: 10px;
        box-sizing: border-box;
        border-radius:4px;
        background-color: rgba(255, 255, 255, 0.05);
        .operateBtnBase {
          .operateBtn {
            display: inline-block;
            background-color: rgba(33, 41, 51, 1);
            border-radius: 5px;
            padding: 3px 15px;
            box-sizing: border-box;
            cursor: pointer;
            margin-right: 10px;
            .text {
              font-size: 13px;
              font-weight: 400;
              color: rgba(0, 97, 255, 1);
              line-height: 18px;
            }
            img {
              width: 8px;
              margin-right: 4px;
            }
          }
          .searchBase {
            position: relative;
            float: right;
            .search {
              width: 150px;
              height: 28px;
              border-radius: 4px;
              border: 1px solid rgba(0, 97, 255, 0.5);
              background-color: transparent;
              color: rgba(255, 255, 255, 0.6);
              outline: none;
              padding-left: 24px;
              box-sizing: border-box;
            }
            .i {
              position: absolute;
              width: 12px;
              top: 8px;
              left: 8px;
              cursor: pointer;
            }
          }
        }
        .tableBase {

        }
      }
      .happen {
        margin-top: 20px;
        padding: 10px;
        box-sizing: border-box;
        border-radius:4px;
        background-color: rgba(255, 255, 255, 0.05);
        display: flex;
        justify-content: space-around;
        .happen-item {
          .label,
          .val{
            font-size: 14px;
            font-weight: 400;
            color: rgba(0, 228, 255, 0.8);
          }
        }
      }

    }
  }
  .seeMore {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 97, 255, 1);
    text-decoration: underline;
    cursor: pointer;
  }
</style>
