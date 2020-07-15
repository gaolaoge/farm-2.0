export default {
  title: '这是一个demo',
  // 登录页
  login_page: {
    nav_phoneText: '短信验证登录',
    nav_accountText: '账号密码登录',
    loginText: '登录',
    // 短信验证
    SMS_verif: {
      phone_placeholder: '请输入手机号',
      phone_warnInfo: '手机号格式错误',
      code_placeholder: '请输入验证码',
      auto_login: '5天内自动登录',
      getCodeBtn: '获取验证码',

    },
    // 账号验证
    account_verif: {
      ac_placeholder: '请输入账号/手机号',
      ps_placeholder: '请输入密码',
      auto_login: '5天内自动登录',
      forgetPw: '忘记密码',
      register: '注册',
    },
    // 忘记密码
    forgetMode: {
      tit: '找回密码',
      btn: '获取验证码',
      phone_placeholder: '请输入手机号',
      code_placeholder: '请输入验证码',
      ps_new: '请输入新密码',
      ps_again: '请再次输入新密码',
      return: '返回登录',
      confirm: '确定'
    },
    // 注册
    register: {
      label : '注册',
      text1: '我已阅读并同意',
      text2: '《用户服务协议》',
      text: '获取验证码',
      type: '类型',
      typeRadio: ['影视版', '效果图'],
      ac_placeholder: '请输入帐号',
      ps_placeholder: '请输入密码',
      ph_placeholder: '请输入手机号',
      code_placeholder: '手机验证码',
      rl1: '已有账号，',
      rl2: '马上登录',
      warnInfo: {
        code: '验证码未填写或填写格式错误'
      },
      prompt: {
        account: '8-14个字符，至少输入包含大小写字母、汉字、数字、下划线中任意2种',
        password: '8-18个字符，至少包含大小写字母、数字、特殊字符中任意2种'
      },
    },
    message: {
      phoneTypeErr_one: '手机号码格式错误',
      phoneTypeErr_two: '手机号已存在',
      phoneTypeErr_three: '已输入手机号格式错误',
      codeTypeErr_one: '验证码未填写或填写错误',
      codeTypeErr_two: '请正确输入验证码',
      codeTypeErr_three: '还未获取验证码',
      tickTypeErr_one: '请阅读用户服务协议',
      psTypeErr_one: '请至少输入包含大小写字母、数字、特殊字符中任意2种的8-18个字符',
      psTypeErr_two: '两次输入密码不一致，请核对后重新输入',
      registerSuc: '注册成功',
      registerErr: '报错，注册失败',
      registerCodeErr: '报错，验证码错误',
      verifErr: '报错，验证失败',
      ac_verif_one: '请输入框8-14个字符',
      ac_verif_two: '请在大小写字母、汉字、数字、下划线中设置帐号且至少包含任意2种',
      ac_verif_three: '该账号已注册，请重新输入',
      ps_verif_one: '请至少包含大小写字母、数字、特殊字符中任意2种字符',
      ps_verif_two: '请输入8-18个字符',
      ac_ps_null: '帐号或密码未输入',
      ps_err: '密码错误',
      code_err: '验证码错误',
      code_err_two: '验证码无效',
      ph_err: '未输入手机号或输入格式有误',
      code_is_coming: '验证信息已发送',
      need_to_register: '当前手机号未注册，请先注册',
      no_sms: '还未做短信验证',
      login_suc: '登录成功',
      edit_suc: '修改成功',
    },
    // 备案
    record: {
      text1: '京ICP备11017824号-4 / 京ICP证130164号 北京市公安局朝阳分局备案编号:110105000501',
      text2: 'Copyright © 2018-2020 国家电影云制作服务平台'
    }
  }
}
