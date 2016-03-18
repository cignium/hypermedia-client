import cx from 'classnames'

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <select
      className={cx(className, 'ct-input ct-day')}
      disabled={!value}
      onChange={ e => onCommit(selectDay(e.target.value, value))}
      value={getDay(value)}>
        {renderOptions(value)}
    </select>
  )
}

function renderOptions(date) {
  const options = [<option value='' key='placeholder'>Day...</option>]

  return options
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

  const lastDay = getLastDayOfMonth(date)
  for (let i = 1; i <= lastDay; i++) {
    days.push(i)
  }

  return days
}

function getLastDayOfMonth(date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
}

function selectDay(day, date) {
  if (!day) {
    return null
  }

  date.setUTCDate(day)
  return date
}
