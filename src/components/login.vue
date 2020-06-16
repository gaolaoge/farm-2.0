<template>
  <div class="login-wrapper">
    <nav>
      <img src="@/icons/findBack.png"
           alt="返回登录"
           class="findBack"
           v-show="login.mode == 'findBack' && navActive == 1"
           @click="login.mode = 'login'">
      <span class="li" :class="[{'active': navActive == 1}]" @click="navActive = 1"></span>
      <span class="li" :class="[{'active': navActive == 2}]" @click="navActive = 2"></span>
    </nav>
    <section :class="[{'registeredPage': navActive == 2}]">
      <!--登录-->
      <aside class="logIn">
        <!--登录模块-->
        <div class="loginMode" v-show="login.mode == 'login'">
          <!--登录方式导航-->
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
          <!--短信验证登录模板-->
          <div class="phoneForm" v-show="login.nav.activeIndex == 1">
            <!--手机号-->
            <div class="b">
              <input v-model="login.phoneForm.phone"
                     autofocus
                     placeholder="请输入手机号"
                     @blur="jk"
                     @focus="login.phoneForm.phoneVerif = true"
                     class="farm-input"
                     :class="[{'inputError': !login.phoneForm.phoneVerif}]"/>
              <span class="warnInfo" v-show="">{{ login.phoneForm.warnInfo.phone }}</span>
            </div>
            <!--验证码-->
            <div class="b">
              <input v-model="login.phoneForm.code"
                     placeholder="请输入验证码"
                     ref="passwordInput"
                     type="text"
                     class="farm-input" />
              <!--验证-->
              <div class="verif">
                <div class="btn"
                     @click="verifPhone"
                     v-show="login.phoneForm.verifShow">
                  {{ login.phoneForm.btn }}
                </div>
                <span class="delayDate" v-show="!login.phoneForm.verifShow">
                  {{ login.phoneForm.countdown }}
                </span>
              </div>
            </div>
            <!--5天内自动登录-->
            <el-switch v-model="login.phoneForm.autoLogin" />
            <span class="switchLabel">
              {{ login.phoneForm.switchLabel }}
            </span>
            <!--登录按钮-->
            <div class="btnLogin" @click="phoneLoginFun">
              <img src="@/icons/login.png" alt="">
            </div>
          </div>
          <!--帐号密码登录模板-->
          <div class="accountForm" v-show="login.nav.activeIndex == 2">
            <input type="password" style="display: none"/>
            <!--帐号-->
            <input v-model="login.accountForm.account"
                   placeholder="请输入账号/手机号"
                   class="farm-input" />
            <!--密码-->
            <input v-model="login.accountForm.password"
                   ref="pwinput"
                   placeholder="请输入密码"
                   @keyup.enter="accountlogin"
                   autocomplete="new-password"
                   type="password"
                   class="farm-input" />
            <div class="swicthPWI">
              <img src="@/icons/openPW.png" alt="" v-show="login.accountForm.passwordEye" @click="login.accountForm.passwordEye = false">
              <img src="@/icons/shuPW.png" alt="" v-show="!login.accountForm.passwordEye" @click="login.accountForm.passwordEye = true">
            </div>
            <!--5天内自动登录-->
            <el-switch
              v-model="login.accountForm.isAutoLogin">
            </el-switch>
            <span class="switchLabel">
              {{ login.accountForm.switchLabel }}
            </span>
            <!--忘记密码-->
            <span class="forgetPw" @click="login.mode = 'findBack'">
              {{ login.accountForm.forgetPw }}
            </span>
            <!--登录按钮-->
            <div class="btnLogin" @click="accountlogin">
              <img src="@/icons/login.png" alt="">
            </div>
          </div>
        </div>
        <!--找回密码模块-->
        <div class="findBack" v-show="login.mode == 'findBack'">
          <div class="loginNav">
            <span class="forgetPW active">
              {{ login.forgetMode.tit }}
            </span>
          </div>
          <!--验证手机号-->
          <div class="f" v-show="login.forgetMode.step == 'one'">
            <!--手机号-->
            <input v-model="login.forgetMode.phone"
                   autofocus
                   placeholder="请输入手机号"
                   @blur="findBackPhoneVerif"
                   class="farm-input" />
            <!--验证码-->
            <input v-model="login.forgetMode.code"
                   placeholder="请输入验证码"
                   ref="passwordInput"
                   @blur="findBackCodeVerif"
                   class="farm-input" />
            <!--验证-->
            <div class="verif">
              <div class="btn"
                   @click="findBackGetCode"
                   v-show="login.forgetMode.verifShow">
                {{ login.forgetMode.btn }}
              </div>
              <span class="delayDate" v-show="!login.forgetMode.verifShow">
                {{ login.forgetMode.countdown }}
              </span>
            </div>
            <!--按钮-->
            <div class="btnLogin" @click="verificationCode">
              <img src="@/icons/login.png" alt="">
            </div>
          </div>
          <!--新密码-->
          <div class="n" v-show="login.forgetMode.step == 'two'">
            <!--新密码-->
            <div class="kj">
              <input v-model="login.forgetMode.newPassWord"
                     @blur="psFormat"
                     type="password"
                     ref="newPW"
                     placeholder="请输入新密码"
                     class="farm-input" />
              <div class="swicthPWI">
                <img src="@/icons/openPW.png" alt="" v-show="login.forgetMode.passwordEye" @click="login.forgetMode.passwordEye = false">
                <img src="@/icons/shuPW.png" alt="" v-show="!login.forgetMode.passwordEye" @click="login.forgetMode.passwordEye = true">
              </div>
            </div>
            <!--再次输入新密码-->
            <div class="kj">
              <input v-model="login.forgetMode.newPassWordAgain"
                     @blur="npsFormat"
                     type="password"
                     ref="newPWA"
                     placeholder="请再次输入新密码"
                     class="farm-input" />
              <div class="swicthPWI">
                <img src="@/icons/openPW.png" alt="" v-show="login.forgetMode.passwordEyeAgain" @click="login.forgetMode.passwordEyeAgain = false">
                <img src="@/icons/shuPW.png" alt="" v-show="!login.forgetMode.passwordEyeAgain" @click="login.forgetMode.passwordEyeAgain = true">
              </div>
            </div>
            <!--按钮-->
            <div class="btnLogin" @click="c">
              <img src="@/icons/login.png" alt="">
            </div>
          </div>
        </div>
      </aside>
      <!--切换-->
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
          <div class="u">
            <input v-model="registered.form.account" placeholder="请输入帐号" @blur="accouVerif" @focus="inputGetFocus('account')" ref="accountRegister" class="farm-input" />
            <span class="warnInfo" v-show="registered.status.account === false && !registered.status.accountInit">{{ registered.warnInfo.account }}</span>
            <img src="@/icons/login-success.png" class="i" v-show="registered.status.account === true && !registered.status.accountInit">
            <img src="@/icons/login-error .png" class="i canClick" v-show="registered.status.account === false && !registered.status.accountInit" @click="deleteInput('account')">
          </div>
          <!--密码-->
          <div class="u">
            <input v-model="registered.form.password" type="password" placeholder="请输入密码" @blur="passwVerifTurn" @focus="inputGetFocus('password')" ref="passwordRegister" class="farm-input" />
            <div class="swicthPWI">
              <img src="@/icons/openPW.png" alt="" v-show="registered.passwordEye" @click="changePSType(false)">
              <img src="@/icons/shuPW.png" alt="" v-show="!registered.passwordEye" @click="changePSType(true)">
            </div>
            <span class="warnInfo" v-show="registered.status.password === false && !registered.status.passwordInit">{{ registered.warnInfo.password }}</span>
            <img src="@/icons/login-success.png" class="i" v-show="registered.status.password === true && !registered.status.passwordInit">
            <img src="@/icons/login-error .png" class="i canClick" v-show="registered.status.password === false && !registered.status.passwordInit" @click="deleteInput('password')">
          </div>
          <!--手机号-->
          <div class="u">
            <input v-model="registered.form.phone" placeholder="请输入手机号" @blur="phoneVerif" @focus="inputGetFocus('phone')" ref="phoneRegister" class="farm-input" />
            <span class="warnInfo" v-show="registered.status.phone === false && !registered.status.phoneInit">{{ registered.warnInfo.phone }}</span>
            <img src="@/icons/login-success.png" class="i" v-show="registered.status.phone === true && !registered.status.phoneInit">
            <img src="@/icons/login-error .png" class="i canClick" v-show="registered.status.phone === false && !registered.status.phoneInit" @click="deleteInput('phone')">
          </div>
          <!--验证码-->
          <div class="v">
            <input v-model="registered.form.code"
                   placeholder="手机验证码"
                   @blur="codeVerif"
                   @focus="registered.status.code = null"
                   class="farm-input" />
            <span class="warnInfo" v-show="registered.status.code === false">{{ registered.warnInfo.code }}</span>
            <div class="verif">
              <div class="btn"
                   :class="[{'canClick': registered.status.phone}]"
                   @click="den"
                   v-show="registered.verifShow">
                {{ registered.text }}
              </div>
              <span class="delayDate" v-show="!registered.verifShow">
              {{ registered.countdown }}
            </span>
            </div>
          </div>
          <!--拖动验证-->
          <!--<div class="drag" ref="drag">-->
            <!--<div class="bg" ref="bg" />-->
            <!--<div class="text" onselectstart="return false;" ref="text">-->
              <!--按住滑块，拖动到最右边-->
            <!--</div>-->
            <!--<div class="btn" ref="btn" />-->
          <!--</div>-->
          <div class="c">
            <label>{{ registered.type }}</label>
            <el-radio-group v-model="registered.form.type" class="radio">
              <el-radio :label="registered.typeRadio[0]"></el-radio>
              <el-radio :label="registered.typeRadio[1]"></el-radio>
            </el-radio-group>
          </div>
          <!--协议-->
          <div class="protocol">
            <img src="@/icons/df.png" alt="" class="protocolIcon" v-show="!registered.tick" @click="registered.tick = true">
            <img src="@/icons/dfg.png" alt="" class="protocolIcon" v-show="registered.tick" @click="registered.tick = false">
            <span class="r">
              {{ registered.text1 }}
            </span>
            <span class="protocolLetter" @click="showPDF">
              {{ registered.text2 }}
            </span>
            <!--<a :href="require('../../../static/protocal.pdf')" target="_blank" class="protocolLetter">-->
              <!--{{ registered.text2 }}-->
            <!--</a>-->
          </div>
          <!--注册-->
          <div class="btnLogin" :class="[{'canClick': this.registered.status.account && this.registered.status.password && this.registered.status.phone && this.registered.status.code }]" @click="registerFun">
            <img src="@/icons/login.png" alt="">
          </div>
        </div>
      </aside>
    </section>
    <div class="promptList">
      <span class="prompt" :class="[{show: registered.status.accountInit}]">{{ registered.prompt.account }}</span>
      <span class="prompt" :class="[{show: registered.status.passwordInit}]">{{ registered.prompt.password }}</span>
    </div>
  </div>
</template>

<script>
  import {
    register,
    registerAccount,
    registerPhone,
    accountLogin,
    phoneVerif,
    phoneLogin,
    getInfo,
    registerTelephone,
    getPhoneVeriFG,
    getVeriVal,
    editPS,
    getProtocal
  } from '@/api/api'
  import {
    messageFun,
    exportDownloadFun,
    setInfo
  } from '@/assets/common.js'

  export default {
    name: 'login',
    data(){
      return {
        navActive: 1,
        login: {
          mode: 'login',
          nav: {
            phoneText: '短信验证登录',
            accountText: '账号密码登录',
            activeIndex: 1
          },
          phoneForm: {
            phone: '',
            code: '',
            autoLogin: true,
            switchLabel: '5天内自动登录',
            btn: '获取验证码',
            v: false,
            verifShow: true,
            countdown: '60s',
            intervalFun: null,
            phoneVerif: false,
            warnInfo: {
              phone: '手机号格式错误',
            }
          },
          accountForm: {
            // account: 'gaoge1834',
            // password: 'gaoge1834',
            account: '',
            password: '',
            isAutoLogin: true,
            switchLabel: '5天内自动登录',
            forgetPw: '忘记密码?',
            passwordEye: false
          },
          forgetMode: {
            tit: '找回密码',
            phone: '',
            code: '',
            verifShow: true,
            countdown: '60s',
            btn: '获取验证码',
            newPassWord: '',
            newPassWordAgain: '',
            passwordEye: false,
            passwordEyeAgain: false,
            step: 'one',
            phoneFormat: false,
            codeFormat: false,
            newPassWordFormat: false,
            newPassWordAgainFormat: false,
            intervalFun: null
          }
        },
        registered: {
          label : '注册',
          text1: '我已阅读并同意',
          text2: '《用户服务协议》',
          text: '获取验证码',
          type: '类型',
          typeRadio: ['影视版', '效果图'],
          tick: false,
          countdown: '60s',
          verifShow: true,
          intervalFun: null,
          passwordEye: false,
          warnInfo:{
            account: '',
            password: '',
            phone: '',
            code: '验证码未填写或填写格式错误'
          },
          clickEye: false,          // 刚刚点击了密码展示状态切换
          form: {
            account: '',
            password: '',
            phone: '',
            code: '',
            type: '影视版'
          },
          status: {                 // 输入文本是否通过正则 && 是否获得焦点
            account: null,
            password: null,
            phone: null,
            code: null,
            accountInit: false,
            passwordInit: false,
            phoneInit: false
          },
          prompt: {
            account: '8-14个字符，至少输入包含大小写字母、汉字、数字、下划线中任意2种',
            password: '8-18个字符，至少包含大小写字母、数字、特殊字符中任意2种'
          },
          codeObtained: false,   // 已获取验证码
        },
        // sliderVerification: false         //注册滑块验证
        reg: {
          phoneReg: /^1(3|4|5|6|7|8|9)\d{9}$/,
          codeReg: /^\d{6}$/,
          passwordReg1: /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![_]+$)/,
          passwordReg2: /^\w{8,18}$/
        },
        pdf: null
      }
    },
    mounted() {
      this.$store.commit('changeLogin',true)

      // //一、定义一个获取DOM元素的方法
      // let box = this.$refs.drag,//容器
      //     bg = this.$refs.bg,//背景
      //     text = this.$refs.text,//文字
      //     btn = this.$refs.btn,//滑块
      //     success = false,//是否通过验证的标志
      //     distance = box.offsetWidth - btn.offsetWidth,//滑动成功的宽度（距离）
      //     self = this
      //
      // //二、给滑块注册鼠标按下事件
      // btn.onmousedown = function(e){
      //
      //   //1.鼠标按下之前必须清除掉后面设置的过渡属性
      //   btn.style.transition = "";
      //   bg.style.transition ="";
      //
      //   //说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。
      //
      //   //2.当滑块位于初始位置时，得到鼠标按下时的水平位置
      //   var e = e || window.event;
      //   var downX = e.clientX;
      //
      //   //三、给文档注册鼠标移动事件
      //   document.onmousemove = function(e){
      //
      //     var e = e || window.event;
      //     //1.获取鼠标移动后的水平位置
      //     var moveX = e.clientX;
      //
      //     //2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
      //     var offsetX = moveX - downX;
      //
      //     //3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
      //     if( offsetX > distance){
      //       offsetX = distance;//如果滑过了终点，就将它停留在终点位置
      //     }else if( offsetX < 0){
      //       offsetX = 0;//如果滑到了起点的左侧，就将它重置为起点位置
      //     }
      //
      //     //4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
      //     btn.style.left = offsetX + "px";
      //     bg.style.width = offsetX + 10 + "px";
      //
      //     //如果鼠标的水平移动距离 = 滑动成功的宽度
      //     if( offsetX == distance){
      //
      //       //1.设置滑动成功后的样式
      //       text.innerHTML = "验证通过";
      //       text.style.color = "#fff";
      //       btn.innerHTML = "&radic;";
      //       btn.style.color = "green";
      //       bg.style.backgroundColor = "#0f46a1";
      //
      //       //2.设置滑动成功后的状态
      //       success = true;
      //       //成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
      //       btn.onmousedown = null;
      //       document.onmousemove = null;
      //
      //       //3.成功解锁后的回调函数
      //       self.sliderVerification = true
      //     }
      //   }

      //   //四、给文档注册鼠标松开事件
      //   document.onmouseup = function(e){
      //
      //     //如果鼠标松开时，滑到了终点，则验证通过
      //     if(success){
      //       return;
      //     }else{
      //       //反之，则将滑块复位（设置了1s的属性过渡效果）
      //       btn.style.left = 0;
      //       bg.style.width = '10px';
      //       btn.style.transition = "left 1s ease";
      //       bg.style.transition = "width 1s ease";
      //     }
      //     //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
      //     document.onmousemove = null;
      //     document.onmouseup = null;
      //   }
      // }

    },
    methods: {
      // 登录 - 验证手机号格式
      jk(){
        let f = this.login.phoneForm
        if(!f.phone){ f.phoneVerif = false; return false }
        if(!this.reg.phoneReg.test(f.phone)){ messageFun('error','手机号格式错误'); f.phoneVerif = false; return false }
        f.phoneVerif = true
      },
      // 注册-帐号验证
      async accouVerif(){
        let rfa = this.registered.form.account,
            rs = this.registered.status
        rs.accountInit = false
        // 为空
        if(!rfa){ rs.account = null; return false }
        // 验证帐号长度
        if(!/^[\w\W]{8,14}$/.test(rfa)){ this.registered.warnInfo.account = '请输入框8-14个字符'; rs.account = false; return false }
        // 验证帐号格式
        let reg = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![_]+$)(?![\u4E00-\u9FA5]+$)/,
            reg2 = /^[\u4E00-\u9FA5\w]+$/
        if(!reg.test(rfa) || !reg2.test(rfa)){ this.registered.warnInfo.account = '请在大小写字母、汉字、数字、下划线中设置帐号且至少包含任意2种'; rs.account = false; return false }
        // 验证帐号是否可用
        let data = await registerAccount(rfa)
        // 验证是否存在
        if(data.data.code == 4031) rs.account = true
        else { rs.account = false; this.registered.warnInfo.account = '该账号已注册，请重新输入' }
      },
      // 注册-密码验证
      passwVerifTurn(){
        setTimeout(this.passwVerif, 200)
      },
      passwVerif(){
        if(this.registered.clickEye){ this.registered.clickEye = false; return false }
        let t = this.registered.form.password,
            s = this.registered.status
        s.passwordInit = false
        if(!t){ s.password = null; return false }
        if(!this.reg.passwordReg1.test(t) || !this.reg.passwordReg2.test(t)){
          this.registered.warnInfo.password = '请至少输入包含大小写字母、数字、特殊字符中任意2种的8-18个字符'
          s.password = false
          return false
        }
        s.password = true
      },
      // 注册-切换密码显示状态
      changePSType(boolean){
        this.registered.clickEye = true
        this.registered.passwordEye = boolean
        let inp = this.$refs['passwordRegister'],
            len = this.registered.form.password.length
        inp.focus()
      },
      // 注册-手机号码验证
      async phoneVerif(){
        let r = this.registered
        r.status.phoneInit = false
        if(!r.form.phone){ r.status.phone = null; return false }
        if(!this.reg.phoneReg.test(r.form.phone)){
          this.registered.warnInfo.phone = '手机号格式错误'
          r.status.phone = false
          return false
        }
        let data = await registerPhone(r.form.phone)
            //code:200   手机号已存在
            //code:4031  手机号未注册
        if(data.data.code == 4031){ r.status.phone = true }
        else{ this.registered.warnInfo.phone = '手机号已存在'; r.status.phone = false }
      },
      // 注册-获取验证码
      den(){
        let r = this.registered
        if(!r.status.phone) return false
        this.delayFun('registered')
        registerTelephone(r.form.phone)
        r.codeObtained = true
      },
      // 注册-验证验证码
      codeVerif(){
        let r = this.registered
        if(!r.form.code || !r.codeObtained){ r.status.code = null; return false }
        if(/^\d{6}$/.test(r.form.code)) r.status.code = true
        else r.status.code = false
      },
      // 注册 input获得焦点
      inputGetFocus(item){
        this.registered.status[item + 'Init'] = true
        this.registered.warnInfo[item] = ''
      },
      // 注册 点击errIcon
      deleteInput(item){
        this.registered.form[item] = ''
        this.$refs[item + 'Register'].focus()
        this.inputGetFocus(item)
      },
      // 注册
      async registerFun(){
        // if(!this.sliderVerification) return false
        let rf = this.registered.form,
            rs = this.registered.status
        if( !rs.account || !rs.password || !rs.phone || !rs.code ) return false
        if(!/^[0-9]{6}$/.test(rf.code)) { messageFun('error','验证码未填写或填写错误'); return false }
        if(!this.registered.tick){ messageFun('info','请阅读用户服务协议'); return false }
        let data = await register(rf)
        //code:101 帐号或手机号重复
        if(data.data.code == '200'){
          // 注册成功
          localStorage.setItem(rf.account, false)
          messageFun('success','注册成功')
          setTimeout(function(){
            // 返回登录窗口
            this.navActive = 1    // 切换回登录窗口
            rf = { account: '', password: '', phone: '', code: '' }
            rs = { account: false, password: false, phone: false }
          }.bind(this),800)
        }else messageFun('error','报错，注册失败')
      },
      // 帐号 登录
      async accountlogin(){
        let { account, password, isAutoLogin } = this.login.accountForm
        // 验证
        if(!account || !password){ messageFun('error','帐号或密码未输入'); return false }
        let data = await accountLogin({ account, password, isAutoLogin })
        if(data.data.code == '4032') { messageFun('error','密码错误'); return false }
        sessionStorage.setItem('token', data.data.data.token)
        this.autoLogin(isAutoLogin, '', account, data.data.data.token)
        this.getUserInfo()
        // accountLogin({ account, password, isAutoLogin })
        //   .then(data => {
        //     if(data.data.code == '4032') { messageFun('error','密码错误'); return false }
        //     sessionStorage.setItem('token', data.data.data.token)
        //     this.autoLogin(isAutoLogin, '', account, data.data.data.token)
        //     this.getUserInfo()
        //   })
      },
      // 登录 手机号验证
      async verifPhone(){
        let f = this.login.phoneForm
        if(!f.phoneVerif){ messageFun('error','未输入手机号或输入格式有误'); return false }
        this.delayFun('login')
        let data = await phoneVerif(f.phone)
        if(data.data.code == 200){ f.v = true; messageFun('info','验证信息已发送') }
        if(data.data.code == 10001) messageFun('error','当前手机号未注册，请先注册')
      },
      // 手机号验证事件60秒延迟
      delayFun(obj){
        let showDom,
            num
        if(obj == 'login'){ showDom = this.login.phoneForm }
        if(obj == 'registered'){ showDom = this.registered }
        if(obj == 'findBack'){ showDom = this.login.forgetMode }
        // arguments showDom=>显示切换
        showDom.verifShow = false
        showDom.intervalFun = window.setInterval(() => {
          showDom.countdown  = parseInt(showDom.countdown ) - 1 + 's'
          if(showDom.countdown == '0s') {
            window.clearInterval(showDom.intervalFun)
            showDom.verifShow = true
            showDom.countdown  = '60s'
          }
        },1000)
      },
      // 登录 手机号登录
      async phoneLoginFun(){
        let {v, phone, code, isAutoLogin} = this.login.phoneForm
        // 已验证
        if(!v){ messageFun('error','还未做短信验证'); return false }
        // 手机号
        if(!this.reg.phoneReg.test(phone)){ messageFun('error','已输入手机号格式错误'); return false }
        // 验证码
        if(!this.reg.codeReg.test(code)){messageFun('error','已输入验证码格式错误'); return false }
        let data = await phoneLogin({ phone, code, isAutoLogin })
        if(data.data.code == 4032){ messageFun('error','验证码错误'); return false }
        if(data.data.code == 200) messageFun('success','登录成功')
        this.autoLogin(isAutoLogin, phone, data.data.data.account, data.data.data.token)
        sessionStorage.setItem('token', data.data.data.token)
        this.getUserInfo()
      },
      // 找回密码 验证手机号是否有效
      findBackPhoneVerif(){
        let f = this.login.forgetMode
        if(!this.reg.phoneReg.test(f.phone)){ messageFun('error','手机号码格式错误'); f.phoneFormat = false; return false }
        f.phoneFormat = true
      },
      // 找回密码 验证验证码是否有效
      findBackCodeVerif(){
        let f = this.login.forgetMode
        if(!f.phoneFormat) return false
        if(!f.code){ f.phoneFormat = false; return false }
        if(!this.reg.codeReg.test(f.code)){ messageFun('error','验证码格式错误'); f.codeFormat = false; return false }
        f.codeFormat = true
      },
      // 找回密码 获取验证码
      async findBackGetCode(){
        let f = this.login.forgetMode
        console.log(f.phoneFormat)
        if(!f.phoneFormat) return false
        let data = await getPhoneVeriFG(f.phone)
        this.delayFun('findBack')
      },
      // 找回密码 验证验证码
      async verificationCode(){
        let f = this.login.forgetMode
        if(!f.phoneFormat || !f.codeFormat) return false
        let data = await getVeriVal(`phone=${f.phone}&code=${f.code}`)
        if(data.data.code == 4034){ messageFun('error','验证码无效'); return false }
        else if(data.data.code == 200){ f.step = 'two' }
        else messageFun('error','报错，验证失败')
      },
      // 找回密码 验证密码
      psFormat(){
        let t = this.login.forgetMode
        if(!this.reg.passwordReg1.test(t.newPassWord) || !this.reg.passwordReg2.test(t.newPassWord)){
          messageFun('error','请至少输入包含大小写字母、数字、特殊字符中任意2种的8-18个字符')
          t.newPassWordFormat = false
          return false
        }
        t.newPassWordFormat = true
      },
      // 找回密码 验证密码
      npsFormat(){
        let t = this.login.forgetMode
        if(t.newPassWord !== t.newPassWordAgain){
          messageFun('error','两次输入密码不一致，请核对后重新输入')
          t.newPassWordAgainFormat = false
          return false
        }
        t.newPassWordAgainFormat = true
      },
      // 找回密码 验证密码
      async c(){
        let t = this.login.forgetMode
        if(!t.newPassWordFormat || !t.newPassWordAgainFormat) return false
        let data = await editPS({
          phone: t.phone,
          code: t.code,
          password: t.newPassWord,
          repeatPassword: t.newPassWordAgain
        })
        if(data.data.code == 200){
          messageFun('success','修改成功')
          setTimeout(() => {
            this.login.mode = 'login'
            window.clearInterval(this.login.forgetMode.intervalFun)
            this.login.forgetMode = Object.assign(this.login.forgetMode,{
              phone: '',
              code: '',
              newPassWord: '',
              newPassWordAgain: '',
              verifShow: true,
              countdown: '60s',
              passwordEye: false,
              passwordEyeAgain: false,
              step: 'one',
              phoneFormat: false,
              codeFormat: false,
              newPassWordFormat: false,
              newPassWordAgainFormat: false,
            })
          },1000)
        }

      },
      // 获取个人信息
      async getUserInfo(){
        let data = await getInfo()
        if(data.data.code != 200) return false
        setInfo(data.data.data)
        this.$store.commit('changeLogin', false)                         // 打开导航
        this.$router.push('/')
      },
      // 用户服务协议
      async showPDF(){
        // window.open('@/assets/protocal.pdf', "_blank")
        let data = await getProtocal()
        exportDownloadFun(data, '《用户服务协议》', 'pdf', true)
      },
      // 5天自动登录
      autoLogin(boolean, phone, account, token){
        // 勾选
        if(boolean){
          document.cookie = `token=${token};max-age=43200`
          if(phone) document.cookie = `phone=${phone};max-age=43200`
          if(account) document.cookie = `account=${account};max-age=43200`
          return false
        }
        // 未勾选
        if(!document.cookie) return false
        let s = {},
            f = false
        document.cookie.split(';').forEach(curr => s[curr.split('=')[0].trim()] = curr.split('=')[1].trim() )
        if('phone' in s) f = s['phone'] == phone
        if('account' in s) f = s['account'] == account
        if(f){
          document.cookie = `token=${token};max-age=-1`
          if('phone' in s) document.cookie = `phone=${phone};max-age=-1`
          if('account' in s) document.cookie = `account=${account};max-age=-1`
        }
      },
    },
    watch: {
      'login.accountForm.passwordEye': function(val){
        if(val){
          this.$refs.pwinput.type = "text"
        }else{
          this.$refs.pwinput.type = 'password'
        }
      },
      'login.forgetMode.passwordEye': function(val){
        if(val){
          this.$refs.newPW.type = "text"
        }else{
          this.$refs.newPW.type = 'password'
        }
      },
      'login.forgetMode.passwordEyeAgain': function(val){
        if(val){
          this.$refs.newPWA.type = "text"
        }else{
          this.$refs.newPWA.type = 'password'
        }
      },
      'registered.passwordEye': function(val){
        if(val){
          this.$refs.passwordRegister.type = "text"
        }else{
          this.$refs.passwordRegister.type = 'password'
        }
      }
    },
    created() {
      sessionStorage.setItem('info',JSON.stringify({
        account: '',
        phone: '',
        level: '',
        balance: ''
      }))
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
    user-select: none;
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
      .findBack {
        position: absolute;
        top: 60px;
        cursor: pointer;
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
          .account,
          .forgetPW {
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
            margin-top: -46px;
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
            right: 10px;
            top: 10px;
          }
          .b {
            position: relative;
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
          margin-bottom: 30px;
        }
        .farm-input {
          /*margin-bottom: 12px;*/
          margin-bottom: 27px;
          height: 25px!important;
        }
        .c {
          margin-top: 4px;
          margin-bottom: 20px;
          label {
            font-size: 14px;
            color: rgba(255, 255, 255, 0.4);
          }
          .radio {
            vertical-align: super;
            margin-left: 30px;
            /deep/.el-radio .el-radio__label {
              font-size: 14px;
            }
          }
        }
        .registeredForm {
          .u,
          .v {
            position: relative;
            .swicthPWI {
              position: absolute;
              right: 0px;
              /*top: 14px;*/
              top: 7px;
            }
            .warnInfo {
              user-select: none;
              position: absolute;
              left: 0px;
              /*bottom: -6px;*/
              bottom: 9px;
              font-size: 11px;
              color: rgba(255, 62, 77, 0.79);
              line-height: 16px;
              width: 400px;
            }
            .i {
              position: absolute;
              width: 14px;
              right: -20px;
              /*top: 14px;*/
              top: 7px;
              &.canClick {
                cursor: pointer;
              }
            }
          }
        }
        .protocol {
          font-size:12px;
          font-weight:400;
          .protocolIcon {
            vertical-align: sub;
            cursor: pointer;
          }
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
        /*注册模块-btn*/
        .btnLogin {
          margin-top: 14px;
          width: 100%;
          height: 44px;
          background-color: RGBA(13, 71, 163, 0.5);
          border-radius: 22px;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          cursor: not-allowed;
          img {
            user-select: none;
            -webkit-user-drag: none;
          }
          &.canClick {
            cursor: pointer;
            background-color: RGBA(14, 71, 161, 1);
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
    .promptList {
      position: fixed;
      top: 0px;
      left: calc(50% + 300px);
      top: calc(50% - 142px);
      .prompt {
        display: block;
        width: 400px;
        margin-bottom: 18px;
        border-radius: 4px;
        padding: 10px;
        font-size: 12px;
        line-height: 1.2;
        min-width: 10px;
        background: #303133;
        color: rgba(255, 255, 255, 1);
        opacity: 0;
        &.show {
          opacity: 1;
        }
      }
    }
  }
  /deep/.el-switch__core {
    background-color: RGBA(29, 52, 94, 1);
    border: 1px solid RGBA(29, 52, 94, 1);
  }
  .verif {
    position: absolute;
    .btn {
      font-size: 14px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.4);
      &.canClick {
        color: rgba(255, 255, 255, 1);
        cursor: pointer;
      }
    }
    .delayDate {
      font-size: 14px;
      text-align: center;
      color: rgba(255, 255, 255, 1);

    }
  }
  .v {
    position: relative;
    .verif {
      /*top: 10px;*/
      top: 3px;
      right: 10px;
    }
  }
  .f {
    position: relative;
    .verif {
      top: 70px;
      right: 10px;
    }
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
    img {
      user-select: none;
      -webkit-user-drag: none;
    }
    &:hover {
      background:rgba(17, 21, 26, 1);
    }
  }
  .swicthPWI {
    position: absolute;
    right: 0px;
    cursor: pointer;
  }
  .kj {
    position: relative;
    .swicthPWI {
      position: absolute;
      right: 0px;
      top: 20px;
      cursor: pointer;
    }
  }
  .inputError {
    color: #f40!important;
  }
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #0f46a1 inset;
    border-bottom: 1px solid RGBA(33, 86, 168, 1)!important;
    -webkit-text-fill-color: #fff;
    caret-color: #fff;
    color: #fff!important;
  }
</style>
