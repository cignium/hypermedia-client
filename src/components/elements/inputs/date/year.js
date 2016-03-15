import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

function setYear(year, date) {
  if (!date) {
    return new Date(Date.UTC(year, 0, 1))
  }

  date.setYear(year)
  return date
}

function getYear(value) {
  return value && value.getFullYear()
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = new Date(value)

  return (
    <Select
      className='ct-input'
      onChange={({ value }) => onCommit(setYear(value, date))}
      options={getYears().map(year => {
        return { label: year, value: year }
      })}
      value={getYear(date)} />
  )
}

function getYears() {
  const year = new Date().getFullYear()
  let current = 1970
  const years = []
  while (current <= year) {
    years.push(current ++)
  }

  return years
}
