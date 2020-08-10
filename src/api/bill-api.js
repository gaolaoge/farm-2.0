import {
  businessServer
} from './index.js'

// 开票记录 - 获取列表
export function getInvoiceList(data) {
  return businessServer({
    url: `/billing/invoice/getInvoicePage?${data}`,
    method: 'GET'
  })
}
