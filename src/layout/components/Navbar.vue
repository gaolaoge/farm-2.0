<template>
  <div class="Navbar-wrapper">
    <img src="@/icons/logo.png" alt="" class="mainLogo" @click="$router.push('/')">
    <div class="navList">
      <ul>
        <li v-for="item,index in navList"
            :key="index"
            class="navLink"
            :class="[{'active': index == navActive}]"
            @click="jump(index,item.link)">
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
            iconUrl: require('@/icons/home-white.png'),
            iconsUrlDefault: require('@/icons/home-black.png'),
            text: '首页'
          },
          // {
          //   link: '/',
          //   iconUrl: require('@/icons/analysis.png'),
          //   text: '分析'
          // },
          // {
          //   link: '/',
          //   iconUrl: require('@/icons/upLoad.png'),
          //   text: '上传'
          // },
          {
            link: '/task',
            iconUrl: require('@/icons/render-white.png'),
            iconsUrlDefault: require('@/icons/render-black.png'),
            text: '任务'
          },
          {
            link: '/assets',
            iconUrl: require('@/icons/money-white.png'),
            iconsUrlDefault: require('@/icons/money-black.png'),
            text: '资产'
          },
          {
            link: '/bill',
            iconUrl: require('@/icons/list-white.png'),
            iconsUrlDefault: require('@/icons/list-black.png'),
            text: '账单'
          },

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
    width:175px;
    height:100vh;
    min-height: 810px;
    background:rgba(21,25,28,1);
    display: flex;
    flex-direction: column;
    align-items: center;
    img.mainLogo {
      flex-shrink: 0;
      width: 75px;
      margin-top: 30px;
      cursor: pointer;
      margin-bottom: 52px;
    }
    .navList {
      .navLink {
        position: relative;
        width: 75px;
        list-style: none;
        height: 40px;
        margin-bottom: 18px;
        color: rgba(256,256,256,0.6);
        font-size:14px;
        font-weight:500;
        line-height:20px;
        cursor: pointer;
        img {
          position: relative;
          z-index: 1;
          vertical-align: bottom;
          width: 18px;
          &.defaultIcon {

          }
          &.selectIcon {
            display: none;
          }
        }
        .text {
          position: relative;
          z-index: 1;
        }
        &.active,
        &:hover {
          img {
            &.defaultIcon {
              display: none;
            }
            &.selectIcon {
              display: inline-block;
            }
          }
          .text {
            /*font-weight: 600;*/
            color: rgba(256,256,256,0.9);
            text-shadow: 0px 0px 2px rgba(256,256,256,0.9);
          }
          &::after {
            content: '';
            position: absolute;
            top: -12px;
            left: -50px;
            width: 145px;
            height: 40px;
            background-color: rgba(14, 71, 161, 1);
            border-radius:0px 20px 20px 0px;
          }
        }
      }
    }
  }
</style>
