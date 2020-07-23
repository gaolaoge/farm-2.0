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

// 修改邮箱 - 验证码
export function getCodeFromEmail(data) {
  return api({
    url: '/customer/sendPhoneCode4ChangeEmail',
    method: 'GET',
    data
  })
}
