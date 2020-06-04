<template>
  <div class="messageCenter">
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
        <!--系统-->
        <div ref="rechargeTable"
             class="rechargeTable"
             v-show="table.navListActiveIndex == 0">
          <!--系统表格-->
          <system-table />
        </div>
        <!--活动-->
        <div ref="consumptionTable"
             class="consumptionTable"
             v-show="table.navListActiveIndex == 1">
          <!--活动表格-->
          <activity-table />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import systemTable from '@/components/message/system-table'
  import activityTable from '@/components/message/activity-table'
  export default {
    name: 'messageCenter',
    data(){
      return {
        table: {
          navListActiveIndex: 0,
          navList: [
            {
              text: '系统'
            },
            {
              text: '活动'
            }
          ]
        }
      }
    },
    components: {
      systemTable,
      activityTable
    },
  }
</script>

<style lang="less" scoped>
  .messageCenter {
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
