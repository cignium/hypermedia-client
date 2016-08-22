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
                                      value && value.getUTCFullYear(),
                                      value && value.getUTCMonth(),
                                      value && value.getUTCDate()))}
  </select>
  )
}

function renderOptions(hours) {
  return [<option value='' key='placeholder'>H...</option>]
    .concat(hours.map(hour => <option key={hour} value={hour}>{hour}</option>))
}

function getHour(date) {
  return date ? date.getUTCHours() : ''
}

function selectHour(hour, date, minDate, maxDate) {
  if (hour === '') {
    return null
  }

  const selectedYear = date && date.getUTCFullYear()
  const selectedMonth = date && date.getUTCMonth()
  const selectedDay = date && date.getUTCDate()
  const selectedMinutes = date && date.getUTCMinutes()

  const minutes = calculateMinutes(minDate, maxDate, selectedYear, selectedMonth, selectedDay, hour, selectedMinutes)

  date.setUTCHours(hour, minutes)

  return date
}
