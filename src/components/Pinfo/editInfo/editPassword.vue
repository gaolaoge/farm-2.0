<template>
  <div class="editPassword farm-dialog">
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
            <span>{{ phonePlaceholder }}</span>
          </div>
        </div>
        <!--验证码-->
        <div class="farm-item">
          <input type="text" class="farm-input code" v-model="codeVal" :placeholder="codePlaceholder">
          <div class="getCode">
            <span>{{ codeLabel }}</span>
          </div>
        </div>
        <!--新密码-->
        <div class="farm-item">
          <input type="text" class="farm-input" v-model="passWordVal" :placeholder="passWordPlaceholder">
        </div>
        <!--再次输入-->
        <div class="farm-item">
          <input type="text" class="farm-input" v-model="passWordAgainVal" :placeholder="passWordAgainPlaceholder">
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
  export default {
    name: 'editPassword',
    data(){
      return {
        title: '更换密码',
        passWordVal: '',
        passWordPlaceholder: '新密码',
        passWordAgainVal: '',
        passWordAgainPlaceholder: '再次确认密码',
        phonePlaceholder: '185****7163',
        codeVal: '',
        codePlaceholder: '验证码',
        codeLabel: '获取验证码',
        btnSave: '确定',
        btnCancel: '取消',
        editing: true,
        successTit: '更换密码成功',
        dire: '3s 后自动返回“个人资料”',
        btnn: '完成'

      }
    },
    methods: {
      cancelFun(){
        this.editing = true
        this.$emit('cancel')
      },
      saveFun(){
        this.editing = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .editPassword {
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
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
        letter-spacing: 2px;
        margin-bottom: 10px;
      }
      .dire {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
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
          color: rgba(255, 255, 255, 0.6);
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
        border: 1px solid rgba(255, 255, 255, 0.4);
        padding-left: 20px;
        box-sizing: border-box;
        &.code {
          width: 200px;
        }
      }
    }
  }
</style>
