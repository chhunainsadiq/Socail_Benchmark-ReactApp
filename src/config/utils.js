const validateEmail = email => {
  let re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const log = (string, variable) => {
  console.log(string, ': ', variable)
}

const timeConverter = datetimeString => {
  let monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let dt = new Date()
  let dateString = `${datetimeString.substring(
    0,
    10
  )} ${datetimeString.substring(11, 19)}`
  let re = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
  let [, year, month, day, hours, minutes] = re.exec(dateString)
  return `${monthNames[parseInt(month) - 1]} ${day}, ${year} ${formatTime(
    parseInt(hours - dt.getTimezoneOffset() / 60),
    parseInt(minutes)
  )}`
}

const formatTime = (hours, minutes) => {
  let ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours || 12
  minutes = minutes < 10 ? `0${minutes}` : minutes
  return `${hours}:${minutes} ${ampm}`
}

// Temporary
const pageSize = 10

export { validateEmail, log, pageSize, timeConverter, formatTime }
