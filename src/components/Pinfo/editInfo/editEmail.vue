<template>
  <div class="editEmail farm-dialog">
    <div class="container">
      <p class="title">
        <span>{{ title }}</span>
        <img src="@/icons/shutDialogIcon.png" alt="" class="shutImg" @click="cancelFun">
      </p>
      <!--编辑-->
      <div class="content" v-show="editing">
        <!--手机号-->
        <div class="farm-item">
          <div class="phone">
            <span>{{ String(user.phone).substr(0, 3) + '****' + String(user.phone).substr(7,4) }}</span>
          </div>
        </div>
        <!--验证码-->
        <div class="farm-item">
          <input type="text" class="farm-input code" v-model="codeVal" :placeholder="codePlaceholder">
          <div class="getCode" @click="getPhoneCode">
            <span>{{ codeLabel }}</span>
          </div>
        </div>
        <!--新邮箱-->
        <div class="farm-item">
          <input type="text" class="farm-input" v-model="emailVal" :placeholder="emailPlaceholder">
        </div>
        <!--验证码-->
        <div class="farm-item">
          <input type="text" class="farm-input code" v-model="emailCodeVal" :placeholder="emailCodePlaceholder">
          <div class="getCode" @click="getEmailCode">
            <span>{{ codeLabel }}</span>
          </div>
        </div>
        <div class="x">
          <div class="farm-btn cancel" @click="cancelFun">
            <span>{{ btnCancel }}</span>
          </div>
          <div class="farm-btn save" @click="saveFun">
            <span>{{ btnSave }}</span>
          </div>
        </div>
      </div>
      <!--修改成功-->
      <div class="success" v-show="!editing">
        <img src="@/icons/smail.png" alt="">
        <h5 class="tit">{{ successTit }}</h5>
        <span class="dire">{{ dire }}</span>
        <div class="btnn" @click="cancelFun"><span>{{ btnn }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import {
    getPhoneCodeFromEmail,
    getEmailCodeFromEmail,
    editEmail
  } from '@/api/editInfo-api'
  import {
    messageFun
  } from "@/assets/common"

  export default {
    name: 'editEmail',
    data() {
      return {
        title: '更换邮箱',
        emailVal: '',
        emailPlaceholder: '新邮箱',
        emailCodeVal: '',
        emailCodePlaceholder: '验证码',
        codeVal: '',
        codePlaceholder: '验证码',
        codeLabel: '获取验证码',
        btnSave: '确定',
        btnCancel: '取消',
        editing: true,
        successTit: '更换邮箱成功',
        dire: '3s 后自动返回“个人资料”',
        btnn: '完成'
      }
    },
    methods: {
      cancelFun() {
        this.editing = true
        this.$emit('cancel')
      },
      // 确定修改
      async saveFun() {
        if(!this.codeVal || !this.emailVal || !this.emailCodeVal) return false
        let reg = /^\d{6}$/,
            reg2 = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!reg2.test(this.emailVal)) return false
        if(!reg.test(this.codeVal) || !reg.test(this.emailCodeVal)){
          messageFun('error', '验证码输入错误')
          return false
        }
        let data = await editEmail({
          "phoneCode": this.codeVal,
          "email": this.emailVal,
          "emailCode": this.emailCodeVal
        })
        if(data.data.code == 200){
          messageFun('success', '修改成功')
          this.codeVal = null
          this.emailVal = null
          this.emailCodeVal = null
          this.editing = false
        }else if(data.data.msg == '邮箱验证码无效'){
          messageFun('error', '邮箱验证码无效')
        }else if(data.data.msg == '手机号验证码无效'){
          messageFun('error', '手机号验证码无效')
        }

      },
      // 获取手机号验证码
      async getPhoneCode(){
        let data = await getPhoneCodeFromEmail()
        if(data.data.code == 200) messageFun('success', '验证码已发送')
      },
      // 获取新邮箱验证码
      async getEmailCode(){
        if(!this.emailVal) return false
        let reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if(!reg.test(this.emailVal)){
          messageFun('error', '邮箱格式错误')
          return false
        }else {
          let data = await getEmailCodeFromEmail(this.emailVal)
          if(data.data.code == 200) messageFun('success', '验证码已发送')
        }
      }
    },
    computed: {
      ...mapState(['user'])
    }
  }
</script>

<style lang="less" scoped>
  .editEmail {
    .container {
      width: 574px;
      height: 507px;
    }

    .content {
      display: flex;
      align-items: center;
      flex-direction: column;

      .x {
        margin-top: 70px;
      }
    }

    .success {
      display: flex;
      align-items: center;
      flex-direction: column;

      img {
        margin-top: 74px;
        margin-bottom: 23px;
      }

      .tit {
        font-size: 20px;
        font-weight: 500;
        color: rgba(22, 29, 37, 1);
        line-height: 28px;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }

      .dire {
        font-size: 12px;
        color: rgba(22, 29, 37, 0.6);
        line-height: 17px;
      }

      .btnn {
        width: 154px;
        height: 32px;
        border-radius: 8px;
        border: 1px solid rgba(39, 95, 239, 1);
        text-align: center;
        cursor: pointer;
        margin-top: 60px;
        opacity: 0.78;

        span {
          font-size: 14px;
          color: rgba(39, 95, 239, 1);
          line-height: 32px;
        }

        &:hover {
          opacity: 1;
        }
      }
    }

    .farm-item {
      width: 300px;
      height: 36px;
      margin-bottom: 20px;

      .phone {
        span {
          font-size: 14px;
          color: rgba(22, 29, 37, 0.6);
          line-height: 36px;
        }
      }

      .getCode {
        display: inline-block;
        width: 90px;
        height: 36px;
        border-radius: 8px;
        border: 1px solid rgba(39, 95, 239, 1);
        vertical-align: top;
        margin-left: 8px;
        cursor: pointer;
        text-align: center;

        span {
          font-size: 14px;
          color: rgba(39, 95, 239, 1);
          line-height: 36px;
        }
      }

      .phone,
      .farm-input {
        border-radius: 8px;
        height: 36px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        padding-left: 20px;
        box-sizing: border-box;
        color: rgba(22, 29, 37, 1);

        &.code {
          width: 200px;
        }

        &::-webkit-input-placeholder { /* WebKit browsers */
          color: rgba(22, 29, 37, 0.4);
        }

        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: rgba(22, 29, 37, 0.4);
        }

        &:-ms-input-placeholder { /* Internet Explorer 10+ */
          color: rgba(22, 29, 37, 0.4);
        }
      }
    }
  }
</style>
