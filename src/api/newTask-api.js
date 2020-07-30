import api from './index.js'

// 准备工作 - 识别【一键版】or【专业版】
export function identify(){
  return api({
    url: `/professional/task/createTaskQuery`,
    method: 'GET'
  })
}

// 准备工作 - 获取网盘目录
export function catalogue(){
  return api({
    url: `/file/assets/upload/getCustomerUnfoldFileList`,
    method: 'GET'
  })
}
