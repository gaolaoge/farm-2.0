import api from './index.js'

// 获取Echarts查询条件
export function getQueryConditions(){
  return api({
    url: '/professional/countProjects',
    method: 'GET'
  })
}
