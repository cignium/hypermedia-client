import cx from 'classnames'
import { getAvailableMinutes, createDateTime } from './date-util'

export default ({ className, errors, onCommit, property, value }) => {
  const minDate = property && property.minDate
  const maxDate = property && property.maxDate

  return (
  <select
    className={cx(className, 'ct-input ct-minute')}
    disabled={property ? property.disabled || !value : !value}
    onChange={ e => onCommit(selectMinute(e.target.value, value))}
    value={getMinute(value)}>
      {renderOptions(getAvailableMinutes(minDate, maxDate,
                                        value && value.getFullYear(),
                                        value && value.getMonth(),
                                        value && value.getDate(),
                                        value && value.getHours()))}
  </select>
  )
}

function renderOptions(minutes) {
  return [<option value='' key='placeholder'>M...</option>]
    .concat(minutes.map(minute => <option key={minute} value={minute}>{padLeft(minute, '00')}</option>))
}

function getMinute(date) {
  return date ? date.getMinutes() : ''
}

function selectMinute(minute, date) {
  if (minute === '') {
    return null
  }

  date.setMinutes(minute)

  return date
}

function padLeft(number, pad) {
  const str = '' + number
  return pad.substring(0, pad.length - str.length) + str
}
