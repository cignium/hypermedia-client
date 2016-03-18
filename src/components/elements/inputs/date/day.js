import cx from 'classnames'
import { allDays } from './date-util'

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
    .concat(allDays(date).map(day => <option key={day} value={day}>{day}</option>))
}

function getDay(date) {
  return date && date.getUTCDate()
}

function selectDay(day, date) {
  if (!day) {
    return null
  }

  date.setUTCDate(day)

  return date
}
