import cx from 'classnames'
import { getAvailableHours, createDateTime, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && createDateTime(property.minDate)
  const maxDate = property && createDateTime(property.maxDate)

  return (
  <select
    className={cx(className, 'ct-input ct-hour')}
    disabled={property ? property.disabled || !value : !value}
    onChange={ e => onCommit(selectHour(e.target.value, value, minDate, maxDate))}
    value={getHour(value)}>
      {renderOptions(getAvailableHours(minDate, maxDate,
                                      value && value.getFullYear(),
                                      value && value.getMonth(),
                                      value && value.getDate()))}
  </select>
  )
}

function renderOptions(hours) {
  return [<option value='' key='placeholder'>H...</option>]
    .concat(hours.map(hour => <option key={hour} value={hour}>{hour}</option>))
}

function getHour(date) {
  return date ? date.getHours() : ''
}

function selectHour(hour, date, minDate, maxDate) {
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
