import {
  businessServer
} from './index.js'

// 任务 - 渲染下载 - 获取列表（效果图）
export function uploadTabGetList(data) {
  return businessServer({
    url: `/professional/design/task/getDesignTaskList?${data}`,
    method: 'GET'
  })
}

