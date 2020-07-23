<template>
  <div class="editPhone farm-dialog">
    <div class="container">
      <p class="title">
        <span>{{ title }}</span>
        <img src="@/icons/shutDialogIcon.png" alt="" class="shutImg" @click="cancelFun">
      </p>
      <!--选择验证方式-->
      <div class="content" v-show="step == 'chooseVerificationMethod'">
        <ul>
          <li v-for="(item,index) in verificationList"
              :key="index"
              @click="chooseFun(item)"
              class="veri">
            <img :src="item.imgUrl" alt="">
            <div class="t">
              <h6>{{ item.tit }}</h6>
              <span>{{ item.direSpan }}</span>
            </div>
            <div class="btn"><span>{{ item.btn }}</span></div>
          </li>
        </ul>
      </div>
      <!--手机验证-->
      <div class="choosePhone" v-show="step == 'choosePhone'">
        <!--验证旧手机-->
        <div class="farm-item">
          <div class="phone"><span>{{ phoneNumber }}</span></div>
        </div>
        <div class="farm-item">
          <input type="text"
                 class="farm-input code"
                 :class="[{'oldPhoneCodeError': phoneVeri.oldPhoneCodeError}]"
                 :placeholder="phoneVeri.codePlaceHolder">
          <div class="getCode"><span>{{ phoneVeri.btn }}</span></div>
        </div>
        <!--验证新手机-->
        <div class="farm-item">
          <input type="text"
                 class="farm-input"

                 :placeholder="phoneVeri.newPhoneNumberLabel">
        </div>
        <div class="farm-item">
          <input type="text"
                 class="farm-input code"
                 :class="[{'newPhoneCodeError': phoneVeri.newPhoneCodeError}]"
                 :placeholder="phoneVeri.codePlaceHolder">
          <div class="getCode"><span>{{ phoneVeri.btn }}</span></div>
        </div>
        <div class="x">
          <div class="farm-btn cancel" @click="step = 'chooseVerificationMethod'">
            <span>{{ btnCancel }}</span>
          </div>
          <div class="farm-btn save" @click="saveFun">
            <span>{{ btnSave }}</span>
          </div>
        </div>
      </div>
      <!--邮箱验证-->
      <div class="chooseEmail" v-show="step == 'chooseEmail'">
        <!--验证邮箱-->
        <div class="farm-item">
          <div class="phone"><span>{{ emailAccount }}</span></div>
        </div>
        <div class="farm-item">
          <input type="text"
                 class="farm-input code"
                 :class="[{'oldPhoneCodeError': emailVeri.oldEmailCodeError}]"
                 :placeholder="emailVeri.codePlaceHolder">
          <div class="getCode"><span>{{ emailVeri.btn }}</span></div>
        </div>
        <!--验证新手机-->
        <div class="farm-item">
          <input type="text"
                 class="farm-input"

                 :placeholder="emailVeri.newPhoneNumberLabel">
        </div>
        <div class="farm-item">
          <input type="text"
                 class="farm-input code"
                 :class="[{'newPhoneCodeError': emailVeri.newPhoneCodeError}]"
                 :placeholder="emailVeri.codePlaceHolder">
          <div class="getCode"><span>{{ emailVeri.btn }}</span></div>
        </div>
        <div class="x">
          <div class="farm-btn cancel" @click="step = 'chooseVerificationMethod'">
            <span>{{ btnCancel }}</span>
          </div>
          <div class="farm-btn save" @click="saveFun">
            <span>{{ btnSave }}</span>
          </div>
        </div>
      </div>
      <!--密码验证-->
      <div class="choosePassword" v-show="step == 'choosePassword'">
        <!--验证密码-->
        <div class="farm-item">
          <input type="text"
                 class="farm-input"
                 :class="[{'passWordCodeError': passwordVeri.passWordCodeError}]"
                 :placeHolder="passwordVeri.passwordPlaceholder">
          <div class="g"></div>
        </div>
        <!--验证新手机-->
        <div class="farm-item">
          <input type="text"
                 class="farm-input"

                 :placeholder="passwordVeri.newPhoneNumberLabel">
        </div>
        <div class="farm-item">
          <input type="text"
                 class="farm-input code"
                 :class="[{'newPhoneCodeError': passwordVeri.newPhoneCodeError}]"
                 :placeholder="passwordVeri.codePlaceHolder">
          <div class="getCode"><span>{{ passwordVeri.btn }}</span></div>
        </div>
        <div class="x">
          <div class="farm-btn cancel" @click="step = 'chooseVerificationMethod'">
            <span>{{ btnCancel }}</span>
          </div>
          <div class="farm-btn save" @click="saveFun">
            <span>{{ btnSave }}</span>
          </div>
        </div>
      </div>
      <!--修改成功-->
      <div class="success" v-show="step == 'success'">
        <img src="@/icons/smail.png" alt="">
        <h5 class="tit">{{ success.successTit }}</h5>
        <span class="dire">{{ success.dire }}</span>
        <div class="btnn" @click="cancelFun"><span>{{ success.btnn }}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editPhone',
    data() {
      return {
        step: 'chooseVerificationMethod',
        title: '更换手机',
        verificationList: [
          {
            imgUrl: require('@/icons/phoneIcon.png'),
            tit: '手机验证',
            direSpan: '如果您手机可以正常使用，则可通过向当前绑定手机发送验证码修改。',
            btn: '立即验证',
            f: 'choosePhone'
          },
          {
            imgUrl: require('@/icons/emailIcon.png'),
            tit: '邮箱验证',
            direSpan: '如果您账号已绑定邮箱，则可通过向绑定邮箱发送验证码修改。',
            btn: '立即验证',
            f: 'chooseEmail'
          },
          {
            imgUrl: require('@/icons/passwordIcon.png'),
            tit: '密码验证',
            direSpan: '如果您账号当前登录密码可用，则可通过验证登录密码修改。',
            btn: '立即验证',
            f: 'choosePassword'
          }
        ],
        phoneNumber: '185****7163',
        emailAccount: '1834121808@qq.com',
        btnCancel: '返回',
        btnSave: '确定',
        phoneVeri: {
          btn: '获取验证码',
          codePlaceHolder: '验证码',
          newPhoneNumberLabel: '新手机号',
          oldPhoneCodeError: true,
          newPhoneCodeError: true
        },
        emailVeri: {
          btn: '获取验证码',
          codePlaceHolder: '验证码',
          newPhoneNumberLabel: '新手机号',
          oldEmailCodeError: true,
          newPhoneCodeError: true
        },
        passwordVeri: {
          btn: '获取验证码',
          passwordPlaceholder: '登录密码',
          codePlaceHolder: '验证码',
          newPhoneNumberLabel: '新手机号',
          passWordCodeError: true,
          newPhoneCodeError: true
        },
        success: {
          tit: '更换手机号成功',
          dire: '3s 后自动返回“个人资料”',
          btnn: '完成'
        }
      }
    },
    methods: {
      cancelFun() {
        this.step = 'chooseVerificationMethod'
        this.title = '更换手机'
        this.$emit('cancel')
      },
      chooseFun(item) {
        this.step = item.f
        this.title = item.tit
      },
      saveFun() {
        this.step = 'success'
      }
    }
  }
</script>

<style lang="less" scoped>
  .editPhone {
    .container {
      width: 638px;
      height: 432px;

      .content {
        .veri {
          height: 105px;
          display: flex;
          align-items: center;

          img {
            width: 50px;
            height: 50px;
            margin-left: 30px;
          }

          .t {
            position: relative;
            flex-grow: 1;
            margin-left: 10px;

            h6 {
              font-size: 16px;
              font-weight: 600;
              color: rgba(22, 29, 37, 0.8);
              line-height: 22px;
              margin-bottom: 5px;
            }

            span {
              font-size: 12px;
              color: rgba(22, 29, 37, 0.6);
              line-height: 17px;
            }
          }

          .btn {
            width: 76px;
            height: 32px;
            background-color: rgba(10, 98, 241, 1);
            border-radius: 8px;
            text-align: center;
            margin-right: 30px;

            span {
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
              line-height: 32px;
              cursor: pointer;
            }
          }

          &:nth-of-type(1) .t::after,
          &:nth-of-type(2) .t::after {
            position: absolute;
            left: 0px;
            bottom: -30px;
            content: '';
            width: 373px;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.05);
          }
        }
      }
    }

    .choosePhone,
    .chooseEmail,
    .choosePassword {
      display: flex;
      flex-direction: column;
      align-items: center;
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
        height: 34px;
        border-radius: 8px;
        border: 1px solid rgba(39, 95, 239, 1);
        vertical-align: top;
        margin-left: 8px;
        cursor: pointer;
        text-align: center;

        span {
          font-size: 14px;
          color: rgba(39, 95, 239, 1);
          line-height: 34px;
        }
      }

      .phone,
      .farm-input {
        border-radius: 8px;
        height: 36px;
        border: 1px solid rgba(22, 29, 37, 0.2);
        padding-left: 20px;
        box-sizing: border-box;
        color: rgba(22, 29, 37, 0.8);

        span {
          color: rgba(22, 29, 37, 0.6);
        }

        &.code {
          width: 200px;
        }

        &.oldPhoneCodeError,
        &.newPhoneCodeError,
        &.passWordCodeError {
          border: 1px solid rgba(255, 62, 77, 1);

          & + .getCode,
          & + .g {
            position: relative;

            &::after {
              position: absolute;
              bottom: -20px;
              left: -189px;
              content: '验证码不正确';
              font-size: 12px;
              color: rgba(255, 62, 77, 0.88);
              line-height: 17px;
            }
          }

          & + .g {
            bottom: 21px;
            left: 210px;
          }
        }
      }
    }

    .x {
      margin-top: 50px;
    }

    .success {
      display: flex;
      align-items: center;
      flex-direction: column;

      img {
        margin-top: 43px;
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
  }
</style>
