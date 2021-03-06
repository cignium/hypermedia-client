import cx from 'classnames'
import { getAvailableMonths, createDateTime, calculateDay, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, minDate, maxDate, value }) => {
  return (
  <select
    className={cx(className, 'ct-input ct-month')}
    disabled={property && property.disabled}
    onChange={ e => onCommit(selectMonth(e.target.value, value, minDate, maxDate))}
    value={getMonth(value)}>
      {renderOptions(getAvailableMonths(minDate, maxDate, value && value.getFullYear()))}
  </select>
  )
}

function renderOptions(months) {
  return [<option key='placeholder' value=''>Month...</option>]
    .concat(months.map(month => <option key={month.value} value={month.value}>{month.label}</option>))
}

function getMonth(date) {
  return date ? date.getMonth() : ''
}

function selectMonth(value, date, minDate, maxDate) {
  const month = parseInt(value)
  if (isNaN(month)) {
    return null
  }

  const selectedYear = date && date.getFullYear()
  const selectedDay = date && date.getDate()
  const selectedHour = date && date.getHours()
  const selectedMinutes = date && date.getMinutes()

  const day = calculateDay(minDate, maxDate, selectedYear, month, selectedDay)
  const hour = calculateHours(minDate, maxDate, selectedYear, month, day, selectedHour)
  const minutes = calculateMinutes(minDate, maxDate, selectedYear, month, day, hour, selectedMinutes)

  if (!date) {
    date = new Date()
  }

  date.setMonth(month, day)
  date.setHours(hour, minutes, 0)

  return date
}
