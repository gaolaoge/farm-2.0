import api from './index.js'

// 修改基本信息 【昵称】【头像】【性别】【生日】
export function editBasicInfo(data) {
  return api({
    url: '/customer/updateCustomerInfo',
    method: 'PUT',
    data
  })
}

// 修改密码 - 验证码
export function getCodeFromPS(data) {
  return api({
    url: '/customer/sendPhoneCode4ChangePassword',
    method: 'GET',
    data
  })
}

// 修改密码
export function editPassWord(data) {
  return api({
    url: '/customer/updatePassword',
    method: 'PUT',
    data
  })
}

// 修改邮箱 - 获取手机验证码
export function getPhoneCodeFromEmail() {
  return api({
    url: '/customer/sendPhoneCode4ChangeEmail',
    method: 'GET',
  })
}

// 修改邮箱 - 获取新邮箱验证码
export function getEmailCodeFromEmail(data) {
  return api({
    url: `/customer/sendEmailCode4CheckOwn/${data}`,
    method: 'GET'
  })
}

// 修改邮箱 - 修改
export function editEmail(data) {
  return api({
    url: `/customer/changeEmailByPhoneCode`,
    method: 'PUT',
    data
  })
}
