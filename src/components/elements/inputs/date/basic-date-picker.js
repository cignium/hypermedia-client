import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'

function getDateString(date) {
  return date && date.toISOString().split('T')[0]
}

function handleChange(onChange, date) {
  console.log('handleChange was called with value: ' + date)
  onChange(getDateString(date))
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = new Date(value)
  const onChange = handleChange.bind(undefined, onCommit)

  return (
    <div data-tip={errors}>
      <Year
        className='ct-input'
        onCommit={onChange}
        value={date} />
      <Month
        className='ct-input'
        onCommit={onChange}
        value={date} />
      <Day
        className='ct-input'
        onCommit={onChange}
        value={date} />
    </div>
  )
}
