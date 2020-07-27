<template>
  <div class="layout-wrapper">
    <Navbar v-show="!login" class="navbar"/>
    <div class="main">
      <Header v-show="!login"/>
      <appMain/>
    </div>
    <div class="mm" v-show="inHome">
      <iv/>
    </div>
    <div class="gz" v-show="showGZ">
      <img src="@/icons/gz-black.png" alt="" class="d">
      <img src="@/icons/gz-blue.png" alt="" class="h">
      <span>{{ $t('transportBtn') }}</span>
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
        inHome: false,
        showGZ: false
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
          if(val.name == 'assets' || val.name == 'task') this.showGZ = true
          else this.showGZ = false
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .layout-wrapper {
    position: relative;
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

    .gz {
      position: fixed;
      bottom: 20px;
      right: 40px;
      width: 86px;
      height: 24px;
      border-radius: 2px;
      border: 1px solid rgba(22, 29, 37, 0.19);
      background-color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        color: rgba(22, 29, 37, 0.8);
      }

      .h {
        display: none;
      }

      &:hover {
        border: 1px solid rgba(27, 83, 244, 0.19);

        span {
          color: rgba(27, 83, 244, 1);
        }

        .d {
          display: none;
        }

        .h {
          display: inline-block;
        }
      }
    }
  }

  @media screen and (orientation: portrait) {
    .layout-wrapper {
      height: 100vw;
      width: 100vh;
    }
  }
</style>
