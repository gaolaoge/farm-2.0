<template>
  <div class="Navbar-wrapper">
    <img src="@/icons/logo2.png" alt="" class="mainLogo" @click="$router.push('/')">
    <div class="navList">
      <ul>
        <li v-for="(item,index) in navList"
            :key="index"
            class="navLink"
            :class="[
              {'active': index == navActive},
            ]"
            @click="jump(index,item.link)">
          <img :src="item.iconUrl" alt="" class="selectIcon">
          <img :src="item.iconsUrlDefault" alt="" class="defaultIcon">
          <span class="text">
            {{ item.text }}
          </span>
        </li>
      </ul>
    </div>
    <div class="systemList">
      <ul>
        <li v-for="(item,index) in systemList"
            :key="index"
            class="systemLink"
            :class="[
              {'active': index + 4 == navActive},
            ]"
            @click="jump(index + 4,item.link)">
          <img :src="item.iconUrl" alt="" class="selectIcon">
          <img :src="item.iconsUrlDefault" alt="" class="defaultIcon">
          <span class="text">
            {{ item.text }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data(){
      return {
        navList: [
          {
            link: '/',
            iconUrl: require('@/icons/console-icon-home-h.png'),
            iconsUrlDefault: require('@/icons/console-icon-home-h.png'),
            text: '首页'
          },
          {
            link: '/task',
            iconUrl: require('@/icons/console-icon-task.png'),
            iconsUrlDefault: require('@/icons/console-icon-task.png'),
            text: '任务'
          },
          {
            link: '/assets',
            iconUrl: require('@/icons/console-icon-assets.png'),
            iconsUrlDefault: require('@/icons/console-icon-assets.png'),
            text: '资产'
          },
          {
            link: '/bill',
            iconUrl: require('@/icons/console-icon-bill.png'),
            iconsUrlDefault: require('@/icons/console-icon-bill.png'),
            text: '账单'
          }
        ],
        systemList: [
          {
            link: '/statistics',
            iconUrl: require('@/icons/console-icon-statistics.png'),
            iconsUrlDefault: require('@/icons/console-icon-statistics.png'),
            text: '统计',
            align: 'bottom'
          },
          {
            link: '/setting',
            iconUrl: require('@/icons/console-icon-set.png'),
            iconsUrlDefault: require('@/icons/console-icon-set.png'),
            text: '设置',
            align: 'bottom'
          }
        ],
        navActive: 0
      }
    },
    methods: {
      jump(index,url){
        this.navActive = index
        this.$router.push(url)
      },
    },
    mounted(){

    },
    watch: {
      '$route.name': {
        handler: function (val) {
          switch(val){
                case 'home':
                  this.navActive = 0
                  break
                case 'task':
                  this.navActive = 1
                  break
                case 'assets':
                  this.navActive = 2
                  break
            case 'bill':
                  this.navActive = 3
                  break
              }
        },
        immediate: true
      }
    }
  }
</script>

<style scoped lang="less">
  .Navbar-wrapper  {
    width:120px;
    height:100vh;
    min-height: 810px;
    background-color: rgba(255,255,255,1);
    border-radius: 0px 20px 20px 0px;
    box-shadow:4px 0px 20px 0px rgba(27,83,244,0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    img.mainLogo {
      flex-shrink: 0;
      width: 56px;
      margin-top: 30px;
      cursor: pointer;
      margin-bottom: 52px;
    }
    .navList,
    .systemList {
      .navLink,
      .systemLink {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 56px;
        list-style: none;
        margin-bottom: 23px;
        cursor: pointer;
        img {
            width: 44px;
          height: 44px;
          &.defaultIcon {

          }
          &.selectIcon {
            display: none;
          }
        }
        .text {
          margin-top: 8px;
          color: rgba(22,29,37,0.39);
          font-size: 14px;
        }
        &.active,
        &:hover {
          img {
            &.defaultIcon {
              display: none;
            }
            &.selectIcon {
              display: inline-block;
              box-shadow: 0px 2px 12px 0px rgba(27, 83, 244, 0.15);
            }
          }
          .text {
            /*font-weight: 600;*/
            color: rgba(22,29,37,1);
            text-shadow: 0px 0px 2px rgba(256,256,256,0.9);
          }
          &::after {
            /*content: '';*/
            /*position: absolute;*/
            /*top: -12px;*/
            /*left: -50px;*/
            /*width: 145px;*/
            /*height: 40px;*/
            /*background-color: rgba(14, 71, 161, 1);*/
            /*border-radius:0px 20px 20px 0px;*/
          }
        }
        &.floatBottom {
          float: bottom;
        }
      }
    }
    .systemList {
      position: absolute;
      bottom: 40px;
    }
  }
</style>
