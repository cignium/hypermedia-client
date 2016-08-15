import cx from 'classnames'
import { getAvailableYears, createDateTime, calculateMonth, 
        calculateDay, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && createDateTime(property.minDate)
  const maxDate = property && createDateTime(property.maxDate)

  return (
  <select
    className={cx(className, 'ct-input ct-year')}
    onChange={ e => onCommit(selectYear(e.target.value, value, minDate, maxDate))}
    value={getYear(value)}
    disabled={property ? property.disabled : false}>
      {renderOptions(getAvailableYears(minDate, maxDate))}
  </select>
  )
}

function renderOptions(years) {
  const options = [<option value='' key='placeholder'>Year...</option>]
  
  return options.concat(years.map(year => <option key={year} value={year}>{year}</option>))
}

function getYear(value) {
  return value ? value.getUTCFullYear() : ''
}

function selectYear(year, date, minDate, maxDate) {
  if (!year) {
    return null
  }

  const selectedMonth = date && date.getUTCMonth()
  const selectedDay = date && date.getUTCDate()
  const selectedHours = date && date.getUTCHours()
  const selectedMinutes = date && date.getUTCMinutes()

  const month = calculateMonth(minDate, maxDate, year, selectedMonth)
  const day = calculateDay(minDate, maxDate, year, month, selectedDay)
  const hours = calculateHours(minDate, maxDate, year, month, day, selectedHours)
  const minutes = calculateMinutes(minDate, maxDate, year, month, day, hours, selectedMinutes)

  if (!date) {
    return new Date(Date.UTC(year, month, day, hours, minutes))
  }
  
  date.setUTCFullYear(year, month, day)
  date.setUTCHours(hours, minutes)

  return date
}
