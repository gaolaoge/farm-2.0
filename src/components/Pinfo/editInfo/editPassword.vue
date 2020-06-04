<template>
  <div class="editPassword farm-dialog">
    <div class="container">
      <p class="title">
        <span>{{ title }}</span>
        <img src="@/icons/shutDialogIcon.png" alt="" class="shutImg" @click="cancelFun">
      </p>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editPassword',
    data(){
      return {
        title: '更换密码'
      }
    },
    methods: {
      cancelFun(){
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="less" scoped>
  .editPassword {
    .container {
      width: 574px;
      height: 507px;
    }
    .content {

    }
  }
</style>
