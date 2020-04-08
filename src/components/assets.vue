<template>
  <div class="assets-wrapper">
    <!--操作-->
    <div class="btnGroup">
      <!--渲染输出操作-->
      <div class="outPutBtnGroup">
        <div class="farm-primary-form-btn" v-for="item,index in btnGroup.outPutBtnGroup" :key="index">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="rightOPerate">
        <div class="searchItem">
          <input type="text" class="farm-form-input" placeholder="文件名">
          <img src="@/icons/searchIcon.png" alt="" class="searchIcon">
        </div>
      </div>
    </div>
    <!--table-->
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="item,index in table.navList"
              :key="index">
          {{ item.text }}
        </span>
        <div class="info">
          {{ info }}
        </div>
      </div>
      <div class="tableList">
        <!--上传分析-->
        <div ref="outPutTable"
             class="outPutTable"
             v-show="table.navListActiveIndex == 0">
          <!--上传分析表格-->
          <out-put-render />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import outPutRender from '@/components/assets/outPutRender.vue'

  export default {
    name: 'assets',
    data(){
      return {
        btnGroup: {
          outPutBtnGroup: [
            {
              initialIcon: '',
              selectedIcon: '',
              text: '下载'
            },
            {
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png'),
              text: '删除'
            }
          ]
        },
        info: '温馨提示：渲染输出文件夹的有效期为20天，20天后系统会自动清除，请在有效期截至前及时下载，如有特殊需求，可联系在线客服。',
        table: {
          navListActiveIndex: 0,
          navList: [
            {
              text: '渲染输出'
            }
          ]
        }
      }
    },
    components: {
      outPutRender
    },
    mounted() {
      setTimeout(() => {
        // 筛选图标
        let t = [...document.getElementsByClassName('el-icon-arrow-down')]
        t.forEach(curr => {
          let i = document.createElement('I'),
            ii = document.createElement('I')
          i.classList.add('iconfont')
          i.classList.add('iconshaixuan')
          ii.classList.add('iconfont')
          ii.classList.add('iconshaixuan1')
          curr.appendChild(i)
          curr.appendChild(ii)
        })
        // 排序图标
        let q = [...document.getElementsByClassName('ascending')]
        q.forEach(curr => {
          let i = document.createElement('I')
          i.classList.add('el-icon-arrow-up')
          i.classList.add('k')
          curr.appendChild(i)
        })
        let w = [...document.getElementsByClassName('descending')]
        w.forEach(curr => {
          let i = document.createElement('I')
          i.classList.add('el-icon-arrow-up')
          i.classList.add('k')
          curr.appendChild(i)
        })
      },0)
    }
  }
</script>

<style lang="less" scoped>
  .assets-wrapper {
    overflow: hidden;
    .btnGroup {
      display: flex;
      justify-content: space-between;
      height:52px;
      margin: 20px 50px;
      padding: 0px 30px;
      background-color: rgba(22,29,37,1);
      border-radius:8px;
      .outPutBtnGroup,
      .rightOPerate {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
    .tableGroup {
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
        .info {
          position: absolute;
          top: 0px;
          right: 30px;
          font-size: 12px;
          line-height: 41px;
          font-weight: 400;
          color: rgba(229, 199, 138, 0.6);
          user-select: none;
        }
      }
      .tableList {
        /*min-height: 700px;*/
        /*height: calc(100vh - 80px - 72px - 42px - 40px);*/
        background-color: rgba(22, 29, 37, 1);
        border-radius: 0px 0px 8px 8px;
        /*渲染下载*/
        .outPutTable {
          position: relative;
          /*min-height: 663px;*/
          /*height: 100%;*/
        }
      }
    }
  }
</style>
