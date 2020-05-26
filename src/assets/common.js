import {
  Message,
  MessageBox
} from 'element-ui'
import store from '../store'

// 读取时间戳
const createCalendar = function(date) {
  let year = date.getFullYear(),
      month = date.getMonth() > 8 ? date.getMonth() + 1 : '0' + ( date.getMonth() + 1 ),
      day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate(),
      hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours(),
      minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes(),
      seconds = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return { year, month, day, hour, minutes, seconds }
}

// 获得日期时间
const createDateFun = function(date) {
  if(date.getFullYear() == '1970') return '-'
  let { year, month, day, hour, minutes, seconds } = createCalendar(date)
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

// 耗时
const consum = function(time){
  let result = ''
  if(time >= 1000) {
    let day = parseInt(time / (24*60*60*1000)),
        hour = parseInt((time % (24*60*60*1000)) / (60*60*1000)),
        minute = parseInt(((time % (24*60*60*1000)) % (60*60*1000)) / (60*1000)),
        second = parseInt((((time % (24*60*60*1000)) % (60*60*1000)) % (60*1000)) / 1000)
    if(day != 0) {
      result += day + '天'
    }
    if(hour != 0 || result != '') {
      result += hour + '小时'
    }
    if(minute != 0 || result != '') {
      result += minute + '分'
    }
    if(second != 0 || result != '') {
      result += second + '秒'
    }
  }
  return result == '' ? '0秒' : result
}

// 获得时间戳
const getDate = (year,month,day) => {
  return new Date(year,month - 1,day)
}

// 下载
const exportDownloadFun = (data, name, type, isProtocal) => {
  // arguments isProtocal=>用户协议
  let blob = null
  if(type == 'xlsx'){
    blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const a = document.createElement("A"),
      url = window.URL.createObjectURL(blob),
      filename = name
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }else if(type == 'pdf'){
    let url = window.URL.createObjectURL(new Blob([data.data],{type: `application/pdf;charset-UTF-8`})),
        link = document.createElement('A')
    link.style.display = 'none'
    if(isProtocal) link.setAttribute('target','_blank')
    link.href = url
    if(!isProtocal) link.setAttribute('download', name + '.pdf')
    document.body.appendChild(link)
    link.click()
  }else {
    let url = window.URL.createObjectURL(new Blob([data.data],{'type': data.headers['content-type']})),
        a = document.createElement('A')
    a.style.display = 'none'
    a.target = '_blank'
    a.href = url
    a.download = name
    a.click()
  }
}

// table 筛选icon样式
const createTableIconList = function(){
  setTimeout(() => {
    // 筛选图标
    if(document.getElementsByClassName('iconshaixuan').length) return false
    let t = [...document.getElementsByClassName('el-icon-arrow-down')]
    t.forEach(curr => {
      let i = document.createElement('I'),
        ii = document.createElement('I')
      i.classList.add('iconfont')
      i.classList.add('iconshaixuan')
      ii.classList.add('iconfont')
      ii.classList.add('iconshaixuan1')
      curr.appendChild(i)
      curr.appendChild(ii)
    })
    // 排序图标
    let q = [...document.getElementsByClassName('ascending')]
    q.forEach(curr => {
      let i = document.createElement('I')
      i.classList.add('el-icon-arrow-up')
      i.classList.add('k')
      curr.appendChild(i)
    })
    let w = [...document.getElementsByClassName('descending')]
    w.forEach(curr => {
      let i = document.createElement('I')
      i.classList.add('el-icon-arrow-up')
      i.classList.add('k')
      curr.appendChild(i)
    })
  },0)
}

 // message 信息
const messageFun = function(type,message){
  return Message({
    message: message,
    type: type,
    showClose: true,
    duration: 3000
  })
}

// 渲染帧范围
const renderingRange = function(min,max,interval){
  let a = [min],
      m = min + interval
  while(m <= max){
    a.push(m)
    m += interval
  }
  return a
}

//
const itemDownloadStatus = function(num){
  switch(num){
    case 1:
      return '等待'
      break
    case 2:
      return '渲染中'
      break
    case 3:
      return '渲染完成'
      break
    case 4:
      return '渲染暂停'
      break
    case 5:
      return '待全速渲染'
      break
    case 6:
      return '渲染放弃'
      break
  }
}

// Uuid
const UuidFun = function () {
  var s = []
  var hexDigits = "0123456789abcdef"
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = "4"                                                        // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)      // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-"

  var uuid = s.join("")
  return uuid
}

const setInfo = function(data) {
  sessionStorage.setItem('info',JSON.stringify({
    account: data.account,
    phone: data.phone,
    level: data.vipLevel,
    balance: data.goldBalance
  }))
  store.commit('changeUserName',data.account)                                           // 帐号
  store.commit('changeUserBalance',data.goldBalance.toFixed(3))            // 现余额
  store.commit('changePayAmount',data.cumulativeRecharge.toFixed(3))       // 累计支付金额
  store.commit('changeGoldCoins',data.totalArrival.toFixed(3))             // 累计到账金币
  store.commit('changeConsumption',data.cumulativeConsume.toFixed(2))      // 累计消费金币
}

export {
  createCalendar,
  createDateFun,
  getDate,
  exportDownloadFun,
  consum,
  createTableIconList,
  messageFun,
  renderingRange,
  itemDownloadStatus,
  UuidFun,
  setInfo
}


