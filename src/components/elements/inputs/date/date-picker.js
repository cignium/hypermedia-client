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
  const date = value ? new Date(value) : null
  const onChange = handleChange.bind(undefined, onCommit)

  return (
    <div data-tip={errors} className={cx(className, 'ct-date-picker')}>
      <Year
        className={className}
        onCommit={onChange}
        value={date} />
      <Month
        className={className}
        onCommit={onChange}
        value={date} />
      <Day
        className={className}
        onCommit={onChange}
        value={date} />
    </div>
  )
}
