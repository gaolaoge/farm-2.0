<template>
  <div class="layout-wrapper">
    <Navbar v-show="!login" />
    <div class="main">
      <Header v-show="!login" />
      <appMain />
    </div>

  </div>
</template>

<script>
  import {
    Header,
    Navbar,
    appMain
  } from './components'
  import { mapState } from 'vuex'

  export default {
    name: 'layout-wrapper',
    data(){
      return {

      }
    },
    components: {
      Header,
      Navbar,
      appMain
    },
    computed: {
      ...mapState(['login'])
    }
  }
</script>

<style lang="less" scoped>
  .layout-wrapper {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
    min-height: 810px;
    width: 100vw;
    min-width: 1800px;
    /*overflow: hidden;*/
  }

  @media screen and (orientation: portrait) {
    .layout-wrapper {
      height: 100vw;
      width: 100vh;
    }
  }
</style>
