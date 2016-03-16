import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <Select
      className={cx(className, 'ct-month')}
      disabled={!value}
      onChange={selected => onCommit(selectMonth(selected && selected.value, value))}
      options={getMonths().map(month => ({ label: month.label, value: month.value }))}
      placeholder='Select month'
      value={getMonth(value)} />
  )
}

function calculateDay(month, date) {
  const day = date.getDate()
  const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate()

  return day > daysInMonth ? daysInMonth : day
}

function getMonth(date) {
  return date && date.getMonth()
}

function getMonths() {
  const months = []
  const language = window.navigator.userLanguage || window.navigator.language
  const formatter = new Intl.DateTimeFormat(language, { month: 'long' })
  const current = new Date(2016, 0)

  for (let i = 1; i < 13; i++) {
    months.push({ label: formatter.format(current), value: i-1 })
    current.setMonth(i)
  }

  return months
}

function selectMonth(month, date) {
  if (month == null || month == undefined )   {
    return null
  }

  date.setMonth(month, calculateDay(month, date))
  return date
}
