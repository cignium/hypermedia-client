import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <Select
      className={cx(className, 'ct-day')}
      disabled={!value}
      onChange={ selected => onCommit(selectDay(selected && selected.value, value))}
      options={getOptions(value)}
      value={getDay(value)} />
  )
}

function getDay(date) {
  return date && date.getDate()
}

function getDays(date) {
  const days = []
  const lastDay = getLastDayOfMonth(date)
  for (let i = 1; i <= lastDay; i++) {
    days.push({ label: i, value: i })
  }

  return days
}

function getOptions(date) {
  if (!date) {
    return null
  }

  const days = getDays(date)
  return days && days.length && days.map(day => ({ label: day.label, value: day.value }))
}

function getLastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function selectDay(day, date) {
  if (!day) {
    return null
  }

  date.setDate(day)
  return date
}
