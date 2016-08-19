import cx from 'classnames'
import { getAvailableMonths, createDateTime, calculateDay, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && createDateTime(property.minDate)
  const maxDate = property && createDateTime(property.maxDate)

  return (
  <select
    className={cx(className, 'ct-input ct-month')}
    disabled={property ? property.disabled || !value : !value}
    onChange={ e => onCommit(selectMonth(e.target.value, value, minDate, maxDate))}
    value={getMonth(value)}>
      {renderOptions(getAvailableMonths(minDate, maxDate, value && value.getUTCFullYear()))}
  </select>
  )
}

function renderOptions(months) {
  return [<option key='placeholder' value=''>Month...</option>]
    .concat(months.map(month => <option key={month.value} value={month.value}>{month.label}</option>))
}

function getMonth(date) {
  return date ? date.getUTCMonth() : ''
}

function selectMonth(value, date, minDate, maxDate) {
  const month = parseInt(value)
  if (isNaN(month)) {
    return null
  }
  
  const selectedYear = date && date.getUTCFullYear()
  const selectedDay = date && date.getUTCDate()
  const selectedHour = date && date.getUTCHours()
  const selectedMinutes = date && date.getUTCMinutes()

  const day = calculateDay(minDate, maxDate, selectedYear, month, selectedDay)
  const hour = calculateHours(minDate, maxDate, selectedYear, month, day, selectedHour)
  const minutes = calculateMinutes(minDate, maxDate, selectedYear, month, day, hour, selectedMinutes)

  date.setUTCMonth(month, day)
  date.setUTCHours(hour, minutes)
  
  return date
}
