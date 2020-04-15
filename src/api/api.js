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

// 首页 工作台下拉框
export function homeSelect(){
  return api({
    url: `/professional/home/zone`,
    method: 'GET',
  })
}

// 首页 任务状态 数据统计
export function homeT(data){
  return api({
    url: `/professional/home/statistics?zoneuuid=${data}`,
    method: 'GET',
  })
}

// 首页 echarts
export function echartsData(data){
  return api({
    url: `/professional/home/daystask?zoneuuid=${data}`,
    method: 'GET',
  })
}

// 个人信息
export function getInfo(){
  return api({
    url: `/customer/getCustomerByToken`,
    method: 'GET'
  })
}

// 新建任务 设置渲染模板-获取已存在记录
export function createTaskSet(){
  return api({
    url: `/professional/template/getCustomerTemplateList`,
    method: 'GET'
  })
}

// 新建任务 设置渲染模板-获取所有软件名和版本号
export function createTaskSetSoftware(){
  return api({
    url: `/professional/template/getSoftList`,
    method: 'GET'
  })
}

// 新建任务 设置渲染模板-获取指定软件指定版本的所有插件
export function createTaskSetPlugin(data){
  return api({
    url: `/professional/template/getPluginList?softUuid=${data}`,
    method: 'GET'
  })
}

// 新建任务 设置渲染模板-删除摸板
export function createTaskSetDeletePlugin(data){
  return api({
    url: `/professional/template/deleteTemplate/${data}`,
    method: 'DELETE'
  })
}


// 新建任务 设置渲染模板-新建模板-确定【新建】
export function createTaskSetNewPlugin(data){
  return api({
    url: `/professional/template/addCustomerTemplate`,
    method: 'POST',
    data
  })
}


// 新建任务 设置渲染模板-新建模板-确定【编辑】
export function createTaskSetEditPlugin(data){
  return api({
    url: `/professional/template/updateTemplate`,
    method: 'PUT',
    data
  })
}

// 新建任务 设置渲染模板-新建模板-【提交】
export function pushTask(data){
  return api({
    url: `/professional/task/addTasks`,
    method: 'POST',
    data
  })
}

// 账单 充值记录 获取table数据
export function getUpTopTable(data){
  return api({
    url: `/billing/recharge/getRechargeList?${data}`,
    method: 'GET'
  })
}

// 账单 充值记录 下载收据
export function downloadReceipt(data){
  return api({
    url: `/file/farmReceipt?${data}`,
    method: 'GET'
  })
}

// 账单 充值记录 导出记录
export function exportUpTopTable(data){
  return api({
    url: `/billing/recharge/getRechargeExcel?${data}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 账单 消费记录 获取所属项目List
export function getConsumptionSelectList(){
  return api({
    url: `/professional/project/getCustomerProjectList`,
    method: 'GET'
  })
}

// 账单 消费记录 获取table数据
export function getConsumptionTable(data){
  return api({
    url: `/billing/spending/getSpendingList?${data}`,
    method: 'GET'
  })
}

// 账单 消费记录 导出记录
export function exportConsumptionTable(data){
  return api({
    url: `/billing/spending/getSpendingExcel?${data}`,
    method: 'GET',
    responseType: 'blob',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 账单 消费记录 渲染消费详情
export function consumptionSeeMore(data){
  return api({
    url: `/billing/spending/getRenderSpendingDetailList/${data}`,
    method: 'GET',
  })
}

// 账单 消费记录 下载消费详情
export function upTopSeeMore(data){
  return api({
    url: `/billing/spending/getDownloadSpendingDetailList/${data}`,
    method: 'GET',
  })
}

// 上传场景文件
export function upTopCJ(data){
  return api({
    url: `/professional/file/uploadFile`,
    method: 'POST',
    data
  })
}

// 上传工程文件
export function upTopGC(data){
  return api({
    url: `/professional/file/uploadResource`,
    method: 'POST',
    data
  })
}
