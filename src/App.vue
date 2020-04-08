<template>
  <div id="app">
    <win />
  </div>
</template>

<script>

import '@/assets/font.css'
import win from '@/layout/index'

export default {
  name: 'App',
  components: {
    win
  },
}
</script>

<style lang="less">
  @import './assets/common.less';
  * {
    margin: 0px;
    padding: 0px;
  }
  #app {
    /*font-family: 'Arial Bold','PingFangSCRegular';*/
    font-family: 'MicrosoftYaHei';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 810px;
  }
</style>
