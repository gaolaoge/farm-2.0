let Base64 = require('js-base64').Base64

// 读取时间戳
const createCalendar = function(date) {
  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      hour = date.getHours(),
      minutes = date.getMinutes(),
      seconds = date.getSeconds()
  return { year, month, day, hour, minutes, seconds }
}

// 获得时间戳
const getDate = (year,month,day) => {
  return new Date(year,month,day)
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

export {
  createCalendar,
  getDate,
  exportDownloadFun
}
