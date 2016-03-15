import cx from 'classnames'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

function setMonth(month, date) {
  console.log('Set Month')
  const day = date.getDate()
  date.setMonth(month)
  return date
}

function getMonth(date) {
  return date && date.getMonth()
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = new Date(value)

  return (
    <Select
      className='ct-input'
      onChange={({ value }) => onCommit(setMonth(value, date))}
      options={getMonths().map(month => {
        return { label: month.label, value: month.value }
      })}
      value={getMonth(date)} />
  )
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
