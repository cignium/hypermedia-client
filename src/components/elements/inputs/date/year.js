import cx from 'classnames'
import { getAvailableYears, createDateTime, calculateMonth,
        calculateDay, calculateHours, calculateMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && property.minDate
  const maxDate = property && property.maxDate

  return (
  <select
    className={cx(className, 'ct-input ct-year')}
    onChange={ e => onCommit(selectYear(e.target.value, value, minDate, maxDate))}
    value={getYear(value)}
    disabled={property && property.disabled}>
      {renderOptions(getAvailableYears(minDate, maxDate))}
  </select>
  )
}

function renderOptions(years) {
  const options = [<option value='' key='placeholder'>Year...</option>]

  return options.concat(years.map(year => <option key={year} value={year}>{year}</option>))
}

function getYear(value) {
  return value ? value.getFullYear() : ''
}

function selectYear(year, date, minDate, maxDate) {
  if (!year) {
    return null
  }

  const selectedMonth = date && date.getMonth()
  const selectedDay = date && date.getDate()
  const selectedHours = date && date.getHours()
  const selectedMinutes = date && date.getMinutes()

  const month = calculateMonth(minDate, maxDate, year, selectedMonth)
  const day = calculateDay(minDate, maxDate, year, month, selectedDay)
  const hours = calculateHours(minDate, maxDate, year, month, day, selectedHours)
  const minutes = calculateMinutes(minDate, maxDate, year, month, day, hours, selectedMinutes)

  if (!date) {
    return new Date(year, month, day, hours, minutes)
  }

  date.setFullYear(year, month, day)
  date.setHours(hours, minutes)

  return date
}
