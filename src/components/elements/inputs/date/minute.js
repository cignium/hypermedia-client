import cx from 'classnames'
import { allMinutes } from './date-util'

export default ({ className, errors, onCommit, property, value }) => (
  <select
    className={cx(className, 'ct-input ct-minute')}
    disabled={!value}
    onChange={ e => onCommit(selectMinute(e.target.value, value))}
    value={getMinute(value)}>
      {renderOptions(value)}
  </select>
)

function renderOptions(date) {
  return [<option value='' key='placeholder'>M...</option>]
    .concat(allMinutes().map(minute => <option key={minute} value={minute}>{padLeft(minute, '00')}</option>))
}

function getMinute(date) {
  return date && date.getUTCMinutes()
}

function selectMinute(minute, date) {
  if (minute === '') {
    return null
  }

  date.setUTCMinutes(minute)

  return date
}

function padLeft(number, pad) {
  const str = '' + number
  return pad.substring(0, pad.length - str.length) + str
}
