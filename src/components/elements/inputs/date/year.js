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
  const day = date.getDate()
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate()

  return day > daysInMonth ? daysInMonth : day
}

function getYear(value) {
  return value ? value.getFullYear() : ''
}

function selectYear(year, date) {
  if (!year) {
    return null
  }

  if (!date) {
    return new Date(year, 0, 1)
  }

  date.setFullYear(year, date.getMonth(), calculateDay(year, date))
  return date
}
