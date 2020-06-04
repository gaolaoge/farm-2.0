<template>
  <div class="Pinfo-wrapper">
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="item,index in table.navList"
              :key="index">
          {{ item.text }}
        </span>
      </div>
      <div class="tableList">
        <!--个人资料-->
        <div ref="infoTable"
             class="infoTable"
             v-show="table.navListActiveIndex == 0">
          <person-info />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import personInfo from '@/components/Pinfo/personInfo'
  export default {
    name: 'Pinfo',
    data(){
      return {
        table: {
          navListActiveIndex: 0,
          navList: [
            {
              text: '个人资料'
            }
          ]
        }
      }
    },
    components: {
      personInfo
    }
  }
</script>

<style lang="less" scoped>
  .Pinfo-wrapper {
    overflow: hidden;
    .tableGroup {
      position: relative;
      margin: 20px 50px;
      .navList {
        position: relative;
        .navBtn {
          display: inline-block;
          font-size:16px;
          color:rgba(255,255,255,0.6);
          padding: 10px 30px;
          cursor: pointer;
          &.active {
            background-color: rgba(22, 29, 37, 1);
            border-radius: 8px 8px 0px 0px;
            font-weight:600;
            color:rgba(255, 255, 255, 0.9);
          }
        }
      }
      .tableList {
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;
      }
    }
  }
</style>
