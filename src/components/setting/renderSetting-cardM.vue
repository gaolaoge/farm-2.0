<template>
  <div class="renderSetting">
    <!--分析后参数修改-->
    <div class="farm-item">
      <span class="label"><span>{{ isEditLabel }}:</span></span>
      <div class="vv">
        <el-switch
          v-model="value2"
          inactive-color="RGBA(256, 1256, 256, 0.5)"
          active-color="rgba(10, 98, 241, 1)" />
      </div>
      <span class="desc">（{{ isEditDesc }}）</span>
    </div>
    <!--单帧超时提醒-->
    <div class="farm-item">
      <span class="label"><span>{{ reminderLabel }}:</span></span>
      <div class="v">
        <input type="text"
               :class="[{'show': reminderShow}]"
               v-model="reminderVal"
               @focus="reminderShow = true"
               @blur="reminderShow = false">
        <span class="val" :class="[{'noShow': reminderShow}]">{{ reminderVal }}</span>
        <span class="unit">{{ unit[0] }}</span>
      </div>
      <span class="desc">（{{ reminderDesc }}）</span>
    </div>
    <!--单帧超时停止-->
    <div class="farm-item">
      <span class="label"><span>{{ stopLabel }}:</span></span>
      <div class="v">
        <input type="text"
               :class="[{'show': stopShow}]"
               v-model="stopVal"
               @focus="stopShow = true"
               @blur="stopShow = false">
        <span class="val" :class="[{'noShow': stopShow}]">{{ stopVal }}</span>
        <span class="unit">{{ unit[0] }}</span>
      </div>
      <span class="desc">（{{ stopDesc }}）</span>
    </div>
    <!--单个任务预警-->
    <div class="farm-item">
      <span class="label"><span>{{ warningLabel }}:</span></span>
      <div class="v">
        <input type="text"
               :class="[{'show': warningShow}]"
               v-model="warningVal"
               @focus="warningShow = true"
               @blur="warningShow = false">
        <span class="val" :class="[{'noShow': warningShow}]">{{ warningVal }}</span>
        <span class="unit">{{ unit[1] }}</span>
      </div>
      <span class="desc">（{{ warningDesc }}）</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'renderSetting',
    data(){
      return {
        isEditLabel: '分析后参数修改',
        isEditDesc: '如果您需要在分析后修改场景文件中默认参数，请启用此项；',
        isEditVal: '',
        reminderLabel: '单帧超时提醒',
        reminderDesc: '单帧渲染时长超过设定，系统发送提醒消息给联系人，具体通知方式可在“消息设置”中完成；',
        reminderVal: '12',
        reminderShow: false,
        stopLabel: '单帧超时停止',
        stopDesc: '单帧渲染时长超过设定，系统停止当前帧的渲染并发送消息给联系人；',
        stopVal: '24',
        stopShow: false,
        warningLabel: '单个任务预警',
        warningDesc: '单个任务渲染费用累计超过设定金币值时，系统发送提醒消息给联系人，具体方式可在“消息设置”中完成；',
        warningVal: '99999',
        warningShow: false,
        unit: ['小时', '金币'],
        value2: ''
      }
    },

  }
</script>

<style lang="less" scoped>
  .renderSetting {
    height: calc(100vh - 163px);
    padding: 50px 30px;
    box-sizing: border-box;
    .farm-item {
      height: 36px;
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      .label {
        width: 112px;
        margin-right: 10px;
        span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      .vv {
        display: flex;
        align-items: center;
        width: 180px;
        height: 34px;
        margin-right: 10px;
      }
      .v {
        position: relative;
        display: flex;
        justify-content: space-between;
        width: 180px;
        height: 34px;
        border-radius: 8px;
        padding: 0px 20px;
        box-sizing: border-box;
        margin-right: 10px;
        border: 1px solid rgba(255, 255, 255, 0.6);
        .unit,
        .val {
          font-size: 14px;
          color:rgba(255, 255, 255, 0.6);
          line-height: 34px;
        }
        .val {
          opacity: 1;
          &.noShow {
            opacity: 0;
          }
        }
        input {
          position: absolute;
          outline: none;
          background-color: transparent;
          border: 0px;
          width: 100px;
          font-size: 14px;
          color: rgba(255, 255, 255, 1);
          line-height: 34px;
          opacity: 0;
          font-family: 'SourceHanSansCN', 'Arial Bold';
          &.show {
            opacity: 1;
          }
        }
      }
      .desc {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
</style>
