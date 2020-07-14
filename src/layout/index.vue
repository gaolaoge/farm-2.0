<template>
  <div class="layout-wrapper">
    <Navbar v-show="!login" class="navbar"/>
    <div class="main">
      <Header v-show="!login"/>
      <appMain/>
    </div>
    <div class="mm" v-show="inHome">
      <iv />
    </div>
  </div>
</template>

<script>
  import {
    Header,
    Navbar,
    appMain
  } from './components'
  import iv from '@/components/home/Info&Vip'
  import {mapState} from 'vuex'

  export default {
    name: 'layout-wrapper',
    data() {
      return {
        inHome: false
      }
    },
    components: {
      Header,
      Navbar,
      appMain,
      iv
    },
    computed: {
      ...mapState(['login'])
    },
    watch: {
      '$route': {
        handler: function (val) {
          if (val.name == 'home') this.inHome = true
          else this.inHome = false
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .layout-wrapper {
    background-color: rgba(241, 244, 249, 1);
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    min-height: 810px;
    width: 100vw;

    .navbar {
      flex-shrink: 0;
    }

    .main {
      flex-grow: 1;
      flex-shrink: 1;
      width: calc(100vw - 120px);
    }

    .mm {
      flex-shrink: 0;
      width: 366px;
      height: 100%;
      padding: 20px 20px 0px 0px;
    }
  }

  @media screen and (orientation: portrait) {
    .layout-wrapper {
      height: 100vw;
      width: 100vh;
    }
  }
</style>
