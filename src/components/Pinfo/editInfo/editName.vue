<template>
  <div class="editName farm-dialog">
    <div class="container">
      <p class="title">
        <span>{{ title }}</span>
        <img src="@/icons/shutDialogIcon.png" alt="" class="shutImg" @click="cancelFun">
      </p>
      <div class="content">
        <input type="text" class="farm-input" :placeholder="placeHolder" v-model="name">
        <!--按钮-->
        <div class="btn-group">
          <div class="farm-btn cancel" @click="cancelFun"><span>取消</span></div>
          <div class="farm-btn save" @click="enterFun"><span>确定</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editName',
    data(){
      return {
        title: '更改昵称',
        placeHolder: '输入新的昵称',
        name: ''
      }
    },
    methods: {
      // 关闭
      cancelFun(){
        this.$emit('cancel')
      },
      // 确定
      enterFun(){
        this.cancelFun()
      }
    }
  }
</script>

<style lang="less" scoped>
  .editName {
    .container {
      width: 574px;
      height: 207px;
    }
    .content {
      .btn-group {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }
    }
  }
</style>
