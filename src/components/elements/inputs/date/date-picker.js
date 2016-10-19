import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import { createDate } from './date-util'

function getDateString(date) {
  return date && date.toISOString().split('T')[0]
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = createDate(value)
  function handleChange(date) {
    onCommit(getDateString(date))
  }
  return (
    <div data-tip={errors} className={cx(className, 'ct-date-picker') }>
        <Year
          className={className}
          onCommit={date => handleChange(date)}
          value={date}
          property={property} />
        <Month
          className={className}
          onCommit={date => handleChange(date)}
          value={date}
          property={property} />
        <Day
          className={className}
          onCommit={date => handleChange(date)}
          value={date}
          property={property} />
    </div>
  )
}
