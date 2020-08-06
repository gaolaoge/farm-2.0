import {
  businessServer
} from './index.js'

// 项目设置 - 获取列表
export function getObjectList(data){
  return businessServer({
    url: `/professional/project/getAllCustomerProject?${data}`,
    method: 'GET'
  })
}

// 项目设置 - 新建任务
export function createTask(data){
  return businessServer({
    url: `/professional/project/addCustomerProject`,
    method: 'POST',
    data
  })
}

// 项目设置 - 删除任务
export function deleteTask(data){
  return businessServer({
    url: `/professional/project/deleteCustomerProject`,
    method: 'DELETE',
    data
  })
}

// 渲染设置 - 获取设定参数
export function getSetData(){
  return businessServer({
    url: `/professional/setting/render/getRenderSetting`,
    method: 'GET'
  })
}

// 渲染设置 - 设定参数
export function setSetData(data){
  return businessServer({
    url: `/professional/setting/render/updateRenderSetting`,
    method: 'PUT',
    data
  })
}
