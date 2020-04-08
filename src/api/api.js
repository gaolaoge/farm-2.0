import api from './index.js'

// 登录页-注册 提交
export function register(data){
  return api({
    url: '/auth/signUp',
    method: 'POST',
    data
  })
}

// 登录页-注册 验证帐号
export function registerAccount(data){
  return api({
    url: `/auth/checkAccount/${data}`,
    method: 'GET',
  })
}

// 登录页-注册 验证手机号
export function registerPhone(data){
  return api({
    url: `/auth/checkPhone/${data}`,
    method: 'GET',
  })
}

// 登录页-帐号密码登录
export function accountLogin(data){
  return api({
    url: `/auth/accountLogin`,
    method: 'POST',
    data
  })
}

// 登录页-手机号登录 短信验证
export function phoneVerif(data){
  return api({
    url: `/auth/sendCode/${data}`,
    method: 'GET'
  })
}

// 登录页-手机号登录 登录
export function phoneLogin(data){
  return api({
    url: `/auth/codeLogin`,
    method: 'POST',
    data
  })
}
