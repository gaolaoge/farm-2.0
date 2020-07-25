import api from './index.js'

// 项目设置-获取列表
export function getObjectList(data){
  return api({
    url: `/professional/project/getAllCustomerProject?${data}`,
    method: 'GET'
  })
}

// 项目设置-新建任务
export function createTask(data){
  return api({
    url: `/professional/project/addCustomerProject`,
    method: 'POST',
    data
  })
}

// 项目设置-删除任务
export function deleteTask(data){
  return api({
    url: `/professional/project/deleteCustomerProject`,
    method: 'DELETE',
    data
  })
}
