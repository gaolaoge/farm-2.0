<template>
  <div class="editPhone farm-dialog">
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
    name: 'editPhone',
    data(){
      return {
        title: '更换手机'
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
  .editPhone {
    .container {
      width: 574px;
      height: 507px;
    }
    .content {

    }
  }
</style>
