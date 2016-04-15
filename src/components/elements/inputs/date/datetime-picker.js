import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import Hour from './hour'
import Minute from './minute'

function getDateString(date) {
  return date && date.toISOString()
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = value ? new Date(value) : null
  function handleChange(date) {
    onCommit(getDateString(date))
  }

  return (
    <div data-tip={errors} className={cx(className, 'ct-datetime-picker')}>
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
      <Hour
        className={className}
        onCommit={date => handleChange(date)}
        value={date} />
      <span className={cx(className, 'ct-time-separator')}>:</span>
      <Minute
        className={className}
        onCommit={date => handleChange(date)}
        value={date} />
    </div>
  )
}
