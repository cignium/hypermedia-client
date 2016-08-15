import cx from 'classnames'
import { getAvailableDays, createDateTime, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && createDateTime(property.minDate)
  const maxDate = property && createDateTime(property.maxDate)

  return (
  <select
    className={cx(className, 'ct-input ct-day')}
    disabled={!value}
    onChange={ e => onCommit(selectDay(e.target.value, value, minDate, maxDate))}
    value={getDay(value)}>
      {renderOptions(getAvailableDays(minDate, maxDate,
                                      value && value.getUTCFullYear(),
                                      value && value.getUTCMonth()))}
  </select>
  )
}

function renderOptions(days) {
  return [<option value='' key='placeholder'>Day...</option>]
    .concat(days.map(day => <option key={day} value={day}>{day}</option>))
}

function getDay(date) {
  return date && date.getUTCDate()
}

function selectDay(day, date, minDate, maxDate) {
  if (!day) {
    return null
  }

  const selectedYear = date && date.getUTCFullYear()
  const selectedMonth = date && date.getUTCMonth()
  const selectedHours = date && date.getUTCHours()
  const selectedMinutes = date && date.getUTCMinutes()

  const hours = calculateHours(minDate, maxDate, selectedYear, selectedMonth, day, selectedHours)
  const minutes = calculateMinutes(minDate, maxDate, selectedYear, selectedMonth, day, hours, selectedMinutes)

  date.setUTCDate(day)
  date.setUTCHours(hours, minutes)

  return date
}
