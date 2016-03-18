import cx from 'classnames'
import { allYears } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-year')}
    onChange={ e => onCommit(selectYear(e.target.value, value))}
    value={getYear(value)}>
      {renderOptions()}
  </select>
)

function renderOptions() {
  const options = [<option value='' key='placeholder'>Year...</option>]

  return options.concat(allYears().map(year => <option key={year} value={year}>{year}</option>))
}

function calculateDay(year, date) {
  const day = date.getUTCDate()
  const daysInMonth = new Date(Date.UTC(year, date.getUTCMonth() + 1, 0)).getUTCDate()

  return day > daysInMonth ? daysInMonth : day
}

function getYear(value) {
  return value ? value.getUTCFullYear() : ''
}

function selectYear(year, date) {
  if (!year) {
    return null
  }

  if (!date) {
    return new Date(Date.UTC(year, 0, 1))
  }

  date.setFullYear(year, date.getUTCMonth(), calculateDay(year, date))
  return date
}
