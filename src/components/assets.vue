<template>
  <div class="assets-wrapper">
    <!--操作-->
    <div class="btnGroup">
      <!--我的上传操作-->
      <div class="myUploadBtnGroup" v-show="table.navListActiveIndex == 0">
        <div class="farm-primary-form-btn" v-for="(item,index) in btnGroup.myUploadBtnGroup" :key="index"
             @click="operating(item['text'])">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default"
               :style="{'transform': item.css }">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover"
               :style="{'transform': item.css }">
          <span>
            {{ item['text'] }}
          </span>
        </div>
        <!--更多按钮-->
        <div class="more-btn" v-operating>
          <span>{{ btnGroup.moreBtnText }}</span>
          <img :src="btnGroup.moreBtnIcon" alt="">
        </div>
        <!--更多List-->
        <div class="moreBtnList" v-show="btnGroup.showMoreBtnList">
          <ul class="moreBtnUl">
            <li v-for="(item,index) in btnGroup.moreBtnList" :key="index" class="moreBtnItem">
              <span class="moreBtnItemSpan">{{ item }}</span>
            </li>
          </ul>
        </div>
        <!--滑块-创建资产目录-->
        <div class="howToCreate">
          <div class="bgi"
               :class="[
                 {'l': btnGroup.howToCreateIindex == '0'},
                 {'r': btnGroup.howToCreateIindex == '1'}
               ]"/>
          <span :class="[{'showAll': btnGroup.howToCreateIindex == '0'}]" @click="btnGroup.howToCreateIindex = '0'">{{ btnGroup.howToCreateBtn[0] }}</span>
          <span :class="[{'showAll': btnGroup.howToCreateIindex == '1'}]" @click="btnGroup.howToCreateIindex = '1'">{{ btnGroup.howToCreateBtn[1] }}</span>
        </div>
      </div>
      <!--渲染输出操作-->
      <div class="outPutBtnGroup" v-show="table.navListActiveIndex == 1">
        <div class="farm-primary-form-btn" v-for="(item,index) in btnGroup.outPutBtnGroup" :key="index"
             @click="operating(item['text'])">
          <img :src="item.initialIcon" alt="" v-if="item.initialIcon" class="btnIcon default"
               :style="{'transform': item.css }">
          <img :src="item.selectedIcon" alt="" v-if="item.selectedIcon" class="btnIcon hover"
               :style="{'transform': item.css }">
          <span>
            {{ item['text'] }}
          </span>
        </div>
      </div>
      <div class="rightOPerate">
        <div class="searchItem">
          <input type="text"
                 class="farm-form-input"
                 v-model="searchInputVal"
                 @keyup.enter="searchFun"
                 placeholder="文件名">
          <img src="@/icons/global-search-icon.png"
               alt=""
               class="searchIcon"
               @click="searchFun">
        </div>
      </div>
    </div>
    <!--table-->
    <div class="tableGroup">
      <div class="navList">
        <span class="navBtn"
              :class="[{'active': index == table.navListActiveIndex}]"
              @click="table.navListActiveIndex = index"
              v-for="(item,index) in table.navList"
              :key="index">
          {{ item }}
        </span>
        <div class="info">
          <span v-show="table.navListActiveIndex == '0'">{{ info[0] }}</span>
          <span v-show="table.navListActiveIndex == '1'">{{ info[1] }}</span>
        </div>
      </div>
      <div class="tableList">
        <!--我的上传-->
        <div class="myUploadTable" v-show="table.navListActiveIndex == 0">
          <my-upload ref="myUploadTable"/>
        </div>
        <!--渲染输出-->
        <div class="outPutTable" v-show="table.navListActiveIndex == 1">
          <!--渲染输出Tab-->
          <out-put-render ref="outPutTable" :searchInputVal="searchInputVal" @clearInput="clearInput"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import outPutRender from '@/components/assets/outPutRender'
  import myUpload from '@/components/assets/myUpload'
  import {createTableIconList} from '@/assets/common.js'

  export default {
    name: 'assets',
    data() {
      return {
        btnGroup: {
          myUploadBtnGroup: [
            {
              initialIcon: require('@/icons/u-blue.png'),
              selectedIcon: require('@/icons/u-white.png'),
              text: '上传'
            },
            {
              initialIcon: require('@/icons/addIcon-Blue.png'),
              selectedIcon: require('@/icons/addIcon-Whit.png'),
              text: '新建文件夹'
            },
            {
              initialIcon: require('@/icons/u-blue.png'),
              selectedIcon: require('@/icons/u-white.png'),
              text: '下载',
              css: 'rotate(180deg)'
            }
          ],
          outPutBtnGroup: [
            {
              initialIcon: require('@/icons/u-blue.png'),
              selectedIcon: require('@/icons/u-white.png'),
              text: '下载',
              css: 'rotate(180deg)'
            },
            {
              initialIcon: require('@/icons/deleteIcon-blue.png'),
              selectedIcon: require('@/icons/deleteIcon-white.png'),
              text: '删除'
            }
          ],
          moreBtnText: '更多',
          moreBtnIcon: require('@/icons/g-blue.png'),
          moreBtnList: ['移动到', '复制到', '重命名', '解压', '删除'],
          showMoreBtnList: false,
          howToCreateBtn: ['手动创建资产目录', '自动创建资产目录'],
          howToCreateIindex: 0
        },
        info: [
          '温馨提示：上传的资产有效期为20天，20天后系统会自动清除，请在有效期截至前进行渲染或下载，您可以充值扩充资产总容量。',
          '温馨提示：渲染输出文件夹的有效期为20天，20天后系统会自动清除，请在有效期截至前及时下载，如有特殊需求，可联系在线客服。'
        ],
        table: {
          navListActiveIndex: 0,
          navList: ['我的上传', '渲染输出']
        },
        searchInputVal: ''
      }
    },
    directives: {
      operating: {
        bind(el, bindings, vnode) {
          let handler = e => {
            if (el.contains(e.target)) {
              if (!vnode.context.btnGroup.showMoreBtnList) vnode.context.btnGroup.showMoreBtnList = true
              else vnode.context.btnGroup.showMoreBtnList = false
            } else {
              if (e.target.classList.contains('moreBtnItemSpan')) return false
              if (e.target.classList.contains('moreBtnItem')) return false
              if (e.target.classList.contains('moreBtnUl')) return false
              if (vnode.context.btnGroup.showMoreBtnList) vnode.context.btnGroup.showMoreBtnList = false
            }
          }

          el.handler = handler
          document.addEventListener('click', handler)
        },
        unbind(el) {
          document.removeEventListener('click', el.handler)
        }
      }
    },
    components: {
      outPutRender,
      myUpload
    },
    mounted() {
      createTableIconList()
    },
    methods: {
      searchFun() {
        this.$refs.outPutTable.getList()
      },
      clearInput() {
        this.searchInputVal = ''
      },
      // 操作
      operating(active) {
        switch (active) {
          case '下载':
            this.$refs.outPutTable.downloadFun()
            break
          case '删除':
            this.$refs.outPutTable.deleteFun()
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .assets-wrapper {
    overflow: hidden;
    width: 100%;

    .btnGroup {
      display: flex;
      justify-content: space-between;
      height: 52px;
      margin: 20px 50px;
      padding: 0px 30px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 8px;

      .myUploadBtnGroup,
      .outPutBtnGroup,
      .rightOPerate {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
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

    .tableList {
      /*min-height: 700px;*/
      /*height: calc(100vh - 80px - 72px - 42px - 40px);*/
      /*渲染下载*/

      .outPutTable {
        position: relative;
        /*min-height: 663px;*/
        /*height: 100%;*/
      }
    }

    .more-btn {
      width: 69px;
      height: 22px;
      margin-right: 10px;
      background-color: rgba(248, 248, 248, 1);
      border: 1px solid rgba(22, 29, 37, 0.1);
      border-radius: 5px;
      text-align: center;
      cursor: pointer;

      span {
        font-size: 13px;
        color: rgba(0, 97, 255, 1);
      }

      img {
        vertical-align: baseline;
        margin-left: 4px;
        width: 10px;
      }

      &:hover {
        border: 1px solid rgba(0, 97, 255, 0.4);
      }
    }

    .moreBtnList {
      position: absolute;
      z-index: 2;
      top: 40px;
      left: 272px;
      width: 70px;
      height: 145px;
      background-color: rgba(22, 29, 37, 1);
      box-shadow: 0px 1px 8px 0px rgba(0, 97, 255, 0.2);
      border-radius: 4px;
      border: 1px solid rgba(0, 97, 255, 0.5);

      ul {
        padding: 6px 0px;
        box-sizing: border-box;
        cursor: pointer;

        .moreBtnItem {
          height: 25px;
          padding: 4px 14px;
          box-sizing: border-box;
          margin-bottom: 2px;

          span {
            display: inline-block;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 17px;
            user-select: none;
          }

          &:hover {
            background-color: rgba(28, 36, 47, 1);
          }
        }
      }
    }

    .howToCreate {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 10px;
      box-sizing: border-box;
      width: 162px;
      height: 24px;
      background-color: rgba(33, 41, 51, 1);
      border-radius: 5px;
      border: 1px solid rgba(39, 95, 239, 0.2);

      .bgi {
        position: absolute;
        top: 2px;
        width: 116px;
        height: 20px;
        background-color: rgba(39, 95, 239, 1);
        border-radius: 4px;

        &.l {
          left: 2px;
        }

        &.r {
          right: 2px;
        }
      }

      span {
        position: relative;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
        line-height: 17px;
        white-space: nowrap;
        overflow: hidden;
        width: 25px;
        cursor: pointer;
        user-select: none;

        &.showAll {
          width: 96px;
        }
      }

      &:hover {
        border: 1px solid rgba(39, 95, 239, 0.4);
      }
    }
  }
</style>
