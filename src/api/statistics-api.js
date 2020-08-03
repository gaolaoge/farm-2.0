import {
  businessServer
} from './index.js'

// 获取Echarts查询条件
export function getQueryConditions(){
  return businessServer({
    url: '/professional/countProjects',
    method: 'GET'
  })
}
