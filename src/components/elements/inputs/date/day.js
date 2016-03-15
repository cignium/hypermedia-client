import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

function setDay(day, date) {
  const curr = date.getDate()
  date.setDate(day)
  return date
}

function getDay(date) {
  return date && date.getDate()
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = new Date(value)

  return (
    <Select
      className='ct-input'
      onChange={({ value }) => onCommit(setDay(value, date))}
      options={getDays().map(day => {
        return { label: day.label, value: day.value }
      })}
      value={getDay(date)} />
  )
}

function getDays() {
  const days = []
  for (let i = 1; i < 32; i++) {
    days.push({ label: i, value: i })
  }

  return days
}
