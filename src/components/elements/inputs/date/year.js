import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <Select
      className={cx(className, 'ct-year')}
      onChange={selected => onCommit(selectYear(selected && selected.value, value))}
      options={getYears().map(year => {
        return { label: year, value: year }
      })}
      value={getYear(value)} />
  )
}

function calculateDay(year, date) {
  const day = date.getDate()
  const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate()

  return day > daysInMonth ? daysInMonth : day
}

function getYear(value) {
  return value && value.getFullYear()
}

function getYears() {
  const years = []
  let current = new Date().getFullYear() - 100
  for (let i = 0; i <= 200; i++) {
    years.push(current++)
  }

  return years
}

function selectYear(year, date) {
  if (!year) {
    return null
  }

  if (!date) {
    return new Date(Date.UTC(year, 0, 1))
  }

  date.setFullYear(year, date.getMonth(), calculateDay(year, date))
  return date
}
