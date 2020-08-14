import {
  businessServer
} from './index.js'

// 站内信 - 获取列表
export function getMessageList(data) {
  return businessServer({
    url: `/professional/notice/message/getCustomerNoticeMessage?${data}`,
    method: 'GET'
  })
}

// 开票记录 - 批量设置已读
export function readMessages(data) {
  return businessServer({
    url: `/professional/notice/message/makeNoticeMessageIsRead`,
    method: 'POST',
    data
  })
}
