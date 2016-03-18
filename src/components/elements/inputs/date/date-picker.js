import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'

function getDateString(date) {
  return date && date.toISOString().split('T')[0]
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = value ? new Date(value) : null
  function handleChange(date) {
    onCommit(getDateString(date))
  }

  return (
    <div data-tip={errors} className={cx(className, 'ct-date-picker')}>
      <Year
        className={className}
        onCommit={date => handleChange(date)}
        value={date} />
      <Month
        className={className}
        onCommit={date => handleChange(date)}
        value={date} />
      <Day
        className={className}
        onCommit={date => handleChange(date)}
        value={date} />
    </div>
  )
}
