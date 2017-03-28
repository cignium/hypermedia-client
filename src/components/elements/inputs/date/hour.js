import cx from 'classnames'
import { getAvailableHours, createDateTime, calculateMinutes, isAmPmFormat } from './date-util'

export default ({ className, errors, onCommit, property, value, format }) => {
  const minDate = property && createDateTime(property.minDate)
  const maxDate = property && createDateTime(property.maxDate)

  return (
  <select
    className={cx(className, 'ct-input ct-hour')}
    disabled={property ? property.disabled || !value : !value}
    onChange={ e => onCommit(selectHour(e.target.value, value, minDate, maxDate, format))}
    value={getHour(value, format)}>
      {renderOptions(getAvailableHours(minDate, maxDate,
                                      value && value.getFullYear(),
                                      value && value.getMonth(),
                                      value && value.getDate(),
                                      format), format)}
  </select>
  )
}

function renderOptions(hours, format) {
  if (isAmPmFormat(format)) {
    hours = hours.filter(hour => hour <= 12)
  }
  return [<option value='' key='placeholder'>H...</option>]
    .concat(hours.map(hour => <option key={hour} value={hour}>{hour}</option>))
}

function getHour(date, format) {
  if (!date) {
    return ''
  }
  let hours = date.getHours()

  if (isAmPmFormat(format) && hours > 12) {
    hours -= 12
  }
  return hours
}

function selectHour(hour, date, minDate, maxDate, format) {
  if (isAmPmFormat(format) && date.getHours() >= 12) {
    hour = parseInt(hour) + 12
  }

  if (hour === '') {
    return null
  }

  const selectedYear = date && date.getFullYear()
  const selectedMonth = date && date.getMonth()
  const selectedDay = date && date.getDate()
  const selectedMinutes = date && date.getMinutes()

  const minutes = calculateMinutes(minDate, maxDate, selectedYear, selectedMonth, selectedDay, hour, selectedMinutes)

  date.setHours(hour, minutes)

  return date
}
