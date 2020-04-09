<template>
  <div class="appMain-wrapper" :class="[{'login': login}]">
    <router-view />
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'appMain',
    data(){
      return {

      }
    },
    computed: {
      ...mapState(['login'])
    }
  }
</script>

<style scoped lang="less">
  .appMain-wrapper {
    width: calc(100vw - 175px);
    min-width: 1625px;
    height: calc(100vh - 80px);
    min-height: 730px;
    background-color: rgba(28, 36, 47, 1);
    overflow: hidden;
    &.login {
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
