const createCalendar = function(date) {
  let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate()
  return { year, month, day }
}

const getDate = (year,month,day) => {
  return new Date(year,month,day)
}
export {
  createCalendar,
  getDate
}
