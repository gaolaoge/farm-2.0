<template>
  <div class="editEmail farm-dialog">
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
    name: 'editEmail',
    data(){
      return {
        title: '更换邮箱'
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
  .editEmail {
    .container {
      width: 574px;
      height: 507px;
    }
    .content {

    }
  }
</style>
