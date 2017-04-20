import cx from 'classnames'
import { getAvailableDays, createDateTime, calculateMonth, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, minDate, maxDate, value }) => {
  return (
  <select
    className={cx(className, 'ct-input ct-day')}
    disabled={property && property.disabled}
    onChange={ e => onCommit(selectDay(e.target.value, value, minDate, maxDate))}
    value={getDay(value)}>
      {renderOptions(getAvailableDays(minDate, maxDate,
                                      value && value.getFullYear(),
                                      value && value.getMonth()))}
  </select>
  )
}

function renderOptions(days) {
  return [<option value='' key='placeholder'>Day...</option>]
    .concat(days.map(day => <option key={day} value={day}>{day}</option>))
}

function getDay(date) {
  return date ? date.getDate() : ''
}

function selectDay(day, date, minDate, maxDate) {
  if (!day) {
    return null
  }

  const selectedYear = date && date.getFullYear()
  const selectedMonth = date && date.getMonth()
  const selectedHours = date && date.getHours()
  const selectedMinutes = date && date.getMinutes()

  const month = calculateMonth(minDate, maxDate, selectedYear, selectedMonth)
  const hours = calculateHours(minDate, maxDate, selectedYear, selectedMonth, day, selectedHours)
  const minutes = calculateMinutes(minDate, maxDate, selectedYear, selectedMonth, day, hours, selectedMinutes)

  if (!date) {
    date = new Date()
  }

  date.setMonth(month, day)
  date.setHours(hours, minutes, 0)

  return date
}
