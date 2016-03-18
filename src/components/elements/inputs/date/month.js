import cx from 'classnames'
import { allMonths, lastDayInMonth } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-month')}
    disabled={!value}
    onChange={ e => onCommit(selectMonth(e.target.value, value))}
    value={getMonth(value)}>
      {renderOptions()}
  </select>
)

function renderOptions() {
  return [<option key='placeholder' value=''>Month...</option>]
    .concat(allMonths().map(month => <option key={month.value} value={month.value}>{month.label}</option>))
}

function calculateDay(month, date) {
  const day = date.getDate()
  const daysInMonth = lastDayInMonth(date.getFullYear(), month)

  return day > daysInMonth ? daysInMonth : day
}

function getMonth(date) {
  return date ? date.getMonth() : ''
}

function selectMonth(value, date) {
  const month = parseInt(value)
  if (isNaN(month)) {
    return null
  }

  date.setMonth(month, calculateDay(month, date))

  return date
}
