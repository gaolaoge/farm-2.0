<template>
  <div class="login-wrapper">
    <nav>
      <span class="li" :class="[{'active': navActive == 1}]" @click="navActive = 1"></span>
      <span class="li" :class="[{'active': navActive == 2}]" @click="navActive = 2"></span>
    </nav>
    <section :class="[{'registeredPage': navActive == 2}]">
      <!--登录-->
      <aside class="logIn">
        <div class="loginNav">
          <span class="phone"
                :class="[{'active': login.nav.activeIndex == 1}]"
                @click="login.nav.activeIndex = 1">
            {{ login.nav.phoneText }}
          </span>
          <span class="account"
                :class="[{'active': login.nav.activeIndex == 2}]"
                @click="login.nav.activeIndex = 2">
            {{ login.nav.accountText }}
          </span>
        </div>
        <!--手机号登录-->
        <div class="phoneForm" v-show="login.nav.activeIndex == 1">
          <input v-model="login.phoneForm.phone"
                 placeholder="请输入手机号"
                 class="farm-input" />
          <input v-model="login.phoneForm.code"
                 placeholder="请输入验证码"
                 ref="passwordInput"
                 class="farm-input" />
          <!--验证-->
          <div class="verif">
            <div class="btn" @click="verifPhone">
              {{ login.phoneForm.btn }}
            </div>
          </div>
          <el-switch
            v-model="login.phoneForm.autoLogin">
          </el-switch>
          <span class="switchLabel">
            {{ login.phoneForm.switchLabel }}
          </span>
          <div class="btnLogin" @click="phoneLoginFun">
            <img src="@/icons/login.png" alt="">
          </div>
        </div>
        <!--帐号密码登录-->
        <div class="accountForm" v-show="login.nav.activeIndex == 2">
          <!--帐号 手机号-->
          <input v-model="login.accountForm.account"
                 placeholder="请输入账号/手机号"
                 class="farm-input" />
          <!--密码-->
          <input v-model="login.accountForm.password"
                 type="password"
                 ref="pwinput"
                 placeholder="请输入密码"
                 class="farm-input" />
          <div class="swicthPWI">
            <img src="@/icons/openPW.png" alt="" v-show="login.accountForm.passwordEye" @click="login.accountForm.passwordEye = false">
            <img src="@/icons/shuPW.png" alt="" v-show="!login.accountForm.passwordEye" @click="login.accountForm.passwordEye = true">
          </div>
          <el-switch
            v-model="login.accountForm.autoLogin">
          </el-switch>
          <span class="switchLabel">
            {{ login.accountForm.switchLabel }}
          </span>
          <span class="forgetPw">
            {{ login.accountForm.forgetPw }}
          </span>
          <!--帐号密码登录-->
          <div class="btnLogin" @click="accountlogin">
            <img src="@/icons/login.png" alt="">
          </div>
        </div>
      </aside>
      <aside class="info"
             :class="[{'loginPage': navActive == 1}]">
        <img src="@/icons/registeredIcon.png"
             alt=""
             @click="navActive = 1"
             v-show="navActive == 2">
        <img src="@/icons/loginIcon.png"
             alt=""
             @click="navActive = 2"
             v-show="navActive == 1">
      </aside>
      <!--注册-->
      <aside class="registered">
        <h6 class="label">
          {{ registered.label }}
        </h6>
        <div class="registeredForm">
          <!--帐号-->
          <el-tooltip class="item"
                      effect="dark"
                      content="8-14个字符，至少输入包含大小写字母、汉字、数字、下划线中任意2种"
                      placement="right-start">
            <div class="u">
              <input v-model="registered.form.account"
                     placeholder="请输入帐号"
                     @blur="accouVerif"
                     @focus="registered.status.account = null"
                     class="farm-input" />
              <img src="@/icons/login-success.png" alt="" class="i" v-show="registered.status.account === 'true'">
              <img src="@/icons/login-error .png" alt="" class="i" v-show="registered.status.account === 'false'">
            </div>
          </el-tooltip>
          <!--密码-->
          <el-tooltip class="item"
                      effect="dark"
                      content="8-18个字符，至少包含大小写字母、数字、特殊字符中任意2种"
                      placement="right-start">
            <div class="u">
              <input v-model="registered.form.password"
                     placeholder="请输入密码"
                     @blur="passwVerif"
                     @focus="registered.status.password = null"
                     class="farm-input" />
              <img src="@/icons/login-success.png" alt="" class="i" v-show="registered.status.password === 'true'">
              <img src="@/icons/login-error .png" alt="" class="i" v-show="registered.status.password === 'false'">
            </div>
          </el-tooltip>
          <!--手机号-->
          <div class="u">
            <input v-model="registered.form.phone"
                   placeholder="请输入手机号"
                   @blur="phoneVerif"
                   @focus="registered.status.phone = null"
                   class="farm-input" />
            <img src="@/icons/login-success.png" alt="" class="i" v-show="registered.status.phone === 'true'">
            <img src="@/icons/login-error .png" alt="" class="i" v-show="registered.status.phone === 'false'">
          </div>
          <!--拖动验证-->
          <div class="drag" ref="drag">
            <div class="bg" ref="bg" />
            <div class="text" onselectstart="return false;" ref="text">
              按住滑块，拖动到最右边
            </div>
            <div class="btn" ref="btn" />
          </div>
          <!--协议-->
          <div class="protocol">
            <span class="r">
              {{ registered.text1 }}
            </span>
            <span class="protocolLetter">
              {{ registered.text2 }}
            </span>
          </div>
          <!--注册-->
          <div class="btnLogin" @click="registerFun">
            <img src="@/icons/login.png" alt="">
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>

<script>
  import {
    register,
    registerAccount,
    registerPhone,
    accountLogin,
    phoneVerif,
    phoneLogin
  } from '@/api/api'

  export default {
    name: 'login',
    data(){
      return {
        navActive: 1,
        login: {
          nav: {
            phoneText: '手机号登录',
            accountText: '账号密码登录',
            activeIndex: 1
          },
          phoneForm: {
            phone: '',
            code: '',
            autoLogin: false,
            switchLabel: '5天内自动登录',
            btn: '获取验证码',
            v: false
          },
          accountForm: {
            account: '',
            password: '',
            autoLogin: false,
            switchLabel: '5天内自动登录',
            forgetPw: '忘记密码?',
            passwordEye: false
          }
        },
        registered: {
          label : '注册',
          text1: '我已阅读并同意',
          text2: '《渲染农场注册协议》',
          form: {
            account: '',
            password: '',
            phone: ''
          },
          status: {
            account: null,
            password: null,
            phone: null
          }
        }
      }
    },
    mounted() {
      this.$store.commit('changeLogin',true)

      //一、定义一个获取DOM元素的方法
      let box = this.$refs.drag,//容器
          bg = this.$refs.bg,//背景
          text = this.$refs.text,//文字
          btn = this.$refs.btn,//滑块
          success = false,//是否通过验证的标志
          distance = box.offsetWidth - btn.offsetWidth;//滑动成功的宽度（距离）

      //二、给滑块注册鼠标按下事件
      btn.onmousedown = function(e){

        //1.鼠标按下之前必须清除掉后面设置的过渡属性
        btn.style.transition = "";
        bg.style.transition ="";

        //说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。

        //2.当滑块位于初始位置时，得到鼠标按下时的水平位置
        var e = e || window.event;
        var downX = e.clientX;

        //三、给文档注册鼠标移动事件
        document.onmousemove = function(e){

          var e = e || window.event;
          //1.获取鼠标移动后的水平位置
          var moveX = e.clientX;

          //2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
          var offsetX = moveX - downX;

          //3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
          if( offsetX > distance){
            offsetX = distance;//如果滑过了终点，就将它停留在终点位置
          }else if( offsetX < 0){
            offsetX = 0;//如果滑到了起点的左侧，就将它重置为起点位置
          }

          //4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
          btn.style.left = offsetX + "px";
          bg.style.width = offsetX + 10 + "px";

          //如果鼠标的水平移动距离 = 滑动成功的宽度
          if( offsetX == distance){

            //1.设置滑动成功后的样式
            text.innerHTML = "验证通过";
            text.style.color = "#fff";
            btn.innerHTML = "&radic;";
            btn.style.color = "green";
            bg.style.backgroundColor = "#0f46a1";

            //2.设置滑动成功后的状态
            success = true;
            //成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
            btn.onmousedown = null;
            document.onmousemove = null;

            //3.成功解锁后的回调函数
            setTimeout(function(){
              // alert('解锁成功！');
            },100);
          }
        }

        //四、给文档注册鼠标松开事件
        document.onmouseup = function(e){

          //如果鼠标松开时，滑到了终点，则验证通过
          if(success){
            return;
          }else{
            //反之，则将滑块复位（设置了1s的属性过渡效果）
            btn.style.left = 0;
            bg.style.width = '10px';
            btn.style.transition = "left 1s ease";
            bg.style.transition = "width 1s ease";
          }
          //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }

    },
    methods: {
      // 注册-帐号验证
      accouVerif(){
        let t = this.registered.form.account
        if(!t){
          // 为空
          this.$message.error('请输入框帐号')
          this.registered.status.account = 'false'
          return false
        }else {
          // 验证帐号长度
          if(t.length < 8 || t.length > 14){
            this.$message.error('请输入框2-14个字符')
            this.registered.status.account = 'false'
            return false
          }
          // 验证帐号格式
          let reg = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![_]+$)/
          if(!reg.test(t)){
            this.$message.error('请在大小写字母、汉字、数字、下划线中设置帐号且至少包含任意2种')
            this.registered.status.account = 'false'
            return false
          }
          registerAccount(t)
            .then(data => {
              // 用户名不存在
              if(data.data.code == 4031){
                // 帐号验证成功
                this.registered.status.account = 'true'
              }else {
                this.registered.status.account = 'false'
                this.$message.error('该账号已注册，请重新输入')
              }
            })
        }
      },
      // 注册-密码验证
      passwVerif(){
        let t = this.registered.form.password,
            regex = /^[A-Za-z0-9_\-]+$/
        if(!t){
          this.$message.error('请输入密码')
          this.registered.status.password = 'false'
          return false
        }
        if(t.length < 8 || t.length > 18){
          this.$message.error('请输入框8-18个字符')
          this.registered.status.password = 'false'
          return false
        }
        if(!regex.test(t)){
          this.$message.error('请至少输入包含大小写字母、数字、特殊字符中任意2种')
          this.registered.status.password = 'false'
          return false
        }
        this.registered.status.password = 'true'
      },
      // 注册-手机号码验证
      phoneVerif(){
        let t = this.registered.form.phone
        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(t)){
          this.$message.error('手机号输入错误')
          this.registered.status.phone = 'false'
          return false
        }
        registerPhone(t)
          .then(data => {
            //code:200   手机号已存在
            //code:4031  手机号未注册
            if(data.data.code == 4031){
              this.registered.status.phone = 'true'
            }else{
              this.$message.error('手机号已存在')
              this.registered.status.phone = 'false'
            }
          })
      },
      // 注册
      registerFun(){
        if(!this.registered.status.account === 'true' || !this.registered.status.password === 'true' || !this.registered.status.phone === 'true'){
          this.$message.error('未填写完整')
          return false
        }
        register(this.registered.form)
          .then(data => {
            //code:101 帐号或手机号重复
            if(data.data.code){
              // 创建成功
            }
          })
      },
      // 帐号 登录
      accountlogin(){
        if(!this.login.accountForm.account || !this.login.accountForm.password){
          this.$message.error('帐号或密码未输入')
          return false
        }
        accountLogin({
          account: this.login.accountForm.account,
          password: this.login.accountForm.password,
          isAutoLogin: this.login.accountForm.autoLogin
        })
          .then(data => {
            console.log()
          })
      },
      // 登录 手机号验证
      verifPhone(){
        let num = this.login.phoneForm.phone
        phoneVerif(num)
          .then(data => {
            if(data.data.code == 200){
              this.login.phoneForm.v = true
            }
          })
      },
      // 登录 手机号登录
      phoneLoginFun(){
        // 已验证
        if(!this.login.phoneForm.v){
          this.$message({
            message: '还未做短信验证',
            type: 'error',
            showClose: true,
            center: true,
            // offset: '10vh',
            duration: 3000
          })
          return false
        }
        // 手机号
        if(!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.login.phoneForm.phone)){
          this.$message.error('已输入手机号格式错误')
          return false
        }
        // 验证码
        if(!/^\d{6}$/.test(this.login.phoneForm.code)){
          this.$message.error('已输入验证码格式错误')
          return false
        }
        phoneLogin({
          phone: this.login.phoneForm.phone,
          code: this.login.phoneForm.code,
          isAutoLogin: this.login.phoneForm.autoLogin
        })
          .then(data=> {

          })
      }
    },
    watch: {
      'login.accountForm.passwordEye': function(val){
        if(val){
          this.$refs.pwinput.type = "text"
        }else{
          this.$refs.pwinput.type = 'password'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login-wrapper {
    width:775px;
    height:520px;
    background:rgba(22,29,37,1);
    box-shadow:0px 1px 20px 0px rgba(22,29,37,1);
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    nav {
      position: relative;
      z-index: 2;
      flex-shrink: 0;
      width: 100px;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgba(22,29,37,1);
      .li {
        list-style: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: rgb(22, 112, 255);
        opacity: 0.29;
        transition: opacity 0.2s;
        cursor: pointer;
        &.active {
          opacity: 1;
        }
        &:nth-of-type(1) {
          margin-bottom: 30px;
        }
      }
    }
    section {
      flex-shrink: 0;
      width: 1250px;
      height: 100%;
      background-color: RGBA(35, 39, 54, 1);
      display: flex;
      flex-wrap: nowrap;
      margin-left: 0px;
      transition: all 0.2s;
      .logIn {
        flex-shrink: 0;
        width: 575px;
        background-color: RGBA(15, 70, 161, 1);
        padding: 60px 110px;
        box-sizing: border-box;
        .loginNav {
          margin-bottom: 72px;
          .phone,
          .account {
            font-size: 18px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.5);
            margin-right: 30px;
            cursor: pointer;
            text-shadow: 0px 0px 4px rgba(256,256,256,0.2);
            &.active {
              color:  rgba(255, 255, 255, 1);
            }

          }
        }
        .phoneForm,
        .accountForm {
          position: relative;
          .switchLabel {
            font-size:12px;
            font-weight:400;
            color:rgba(255, 255, 255, 0.6);
            vertical-align: middle;
            margin-left: 8px;
          }
          .swicthPWI {
            position: absolute;
            right: 0px;
            margin-top: -46px;
            cursor: pointer;
          }
          .btnLogin {
            margin-top: 54px;
            width: 100%;
            height: 44px;
            background:rgba(17, 21, 26, 0.5);
            border-radius:22px;
            opacity:0.5;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            &:hover {
              background:rgba(17, 21, 26, 1);
            }
          }
          .forgetPw {
            float: right;
            font-size:12px;
            font-weight:400;
            color:rgba(255, 255, 255, 0.6);
            line-height: 22px;
            cursor: pointer;
          }
          .verif {
            position: absolute;
            right: 10px;
            top: 70px;
            .btn {
              font-size: 14px;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              cursor: pointer;
            }
          }
        }
      }
      .info {
        position: relative;
        z-index: 1;
        flex-shrink: 0;
        width: 100px;
        background-color: RGBA(15, 70, 161, 1);
        box-shadow:0px 0px 10px 0px rgba(15, 70, 161, 1);
        img {
          margin: 55px 35px;
          cursor: pointer;
        }
        &.loginPage {
          background-color: RGBA(35, 39, 54, 0);
          box-shadow:0px 0px 10px 0px rgba(35, 39, 54, 1);
        }
      }
      .registered {
        flex-shrink: 0;
        width: 575px;
        background-color: RGBA(35, 39, 54, 1);
        padding: 60px 110px;
        box-sizing: border-box;
        .label {
          font-size:18px;
          font-weight:500;
          color:rgba(255,255,255,1);
          text-shadow: 0px 0px 4px rgba(255,255,255,0.2);
          margin-bottom: 46px;
        }
        .registeredForm {
          .u {
            position: relative;
            .i {
              position: absolute;
              right: 0px;
              top: 10px;
            }
          }
        }
        .protocol {
          font-size:12px;
          font-weight:400;
          .r {
            color: rgba(255, 255, 255, 0.5);
          }
          .protocolLetter {
            color: rgba(22, 113, 255, 0.5);
            cursor: pointer;
            &:hover {
              color: rgba(22, 113, 255, 1)
            }
          }
        }
        .btnLogin {
          margin-top: 24px;
          width: 100%;
          height: 44px;
          background: RGBA(13, 71, 163, 0.5);
          border-radius:22px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            background: RGBA(14, 71, 161, 1);
          }
        }
        /*滑动条*/
        .drag {
          width:343px;
          height:20px;
          position: relative;
          background-color: rgba(255, 255, 255, 0.1711);
          border-radius: 8px;
          margin-bottom: 18px;
          margin-left: 10px;
          /*已划过部分*/
          .bg{
            width:10px;
            height: 20px;
            position: absolute;
            background-color: #0f46a1;
            border-radius: 8px 0px 0px 8px;
          }
          /*文本*/
          .text{
            position: absolute;
            width: 100%;
            height: 100%;
            text-align: center;
            user-select: none;
            font-size: 12px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.79);
            line-height: 20px;
          }
          /*拖动按钮*/
          .btn{
            position: absolute;
            top: -3px;
            cursor: move;
            text-align: center;
            user-select: none;
            border-radius: 50%;
            width:26px;
            height:26px;
            background-color: rgba(255,255,255,1);
          }
        }
      }
      &.registeredPage {
        margin-left: -575px;
      }
    }
  }
  /deep/.el-switch__core {
    background-color: RGBA(29, 52, 94, 1);
    border: 1px solid RGBA(29, 52, 94, 1);
  }
</style>
