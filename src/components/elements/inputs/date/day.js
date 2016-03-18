import cx from 'classnames'
import { lastDayInMonth } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-day')}
    disabled={!value}
    onChange={ e => onCommit(selectDay(e.target.value, value))}
    value={getDay(value)}>
      {renderOptions(value)}
  </select>
)

function renderOptions(date) {
  return [<option value='' key='placeholder'>Day...</option>]
    .concat(getDays(date).map(day => <option key={day} value={day}>{day}</option>))
}

function getDay(date) {
  return date && date.getUTCDate()
}

function getDays(date) {
  const days = []
  if (!date) {
    return days
  }

  const lastDay = lastDayInMonth(date.getUTCFullYear(), date.getUTCMonth())
  for (let i = 1; i <= lastDay; i++) {
    days.push(i)
  }

  return days
}

function selectDay(day, date) {
  if (!day) {
    return null
  }

  date.setUTCDate(day)

  return date
}
