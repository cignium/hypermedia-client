import cx from 'classnames'
import { allHours } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-hour')}
    disabled={!value}
    onChange={ e => onCommit(selectHour(e.target.value, value))}
    value={getHour(value)}>
      {renderOptions(value)}
  </select>
)

function renderOptions(date) {
  return [<option value='' key='placeholder'>H...</option>]
    .concat(allHours().map(hour => <option key={hour} value={hour}>{hour}</option>))
}

function getHour(date) {
  return date && date.getUTCHours()
}

function selectHour(hour, date) {
  if (hour === '') {
    return null
  }

  date.setUTCHours(hour)

  return date
}
