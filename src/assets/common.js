import {
  Message,
  MessageBox
} from 'element-ui'

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
const exportDownloadFun = (data, name, type) => {
  let blob = null
  if(type == 'xlsx'){

    blob = new Blob([data.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const a = document.createElement("a"),
      url = window.URL.createObjectURL(blob),
      filename = name + '.pdf'
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)

  }
}

// table 筛选icon样式
const createTableIconList = function(){
  setTimeout(() => {
    // 筛选图标
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

const messageFun = function(type,message){
  return Message({
    message: message,
    type: type,
    showClose: true,
    duration: 3000
  })
}

export {
  createCalendar,
  createDateFun,
  getDate,
  exportDownloadFun,
  consum,
  createTableIconList,
  messageFun
}


