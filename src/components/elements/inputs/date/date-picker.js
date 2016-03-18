import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import { getFormattedDate } from './date-util'

function getDate(value) {
  if (value === null)
    return null

  const dateParts = value.split('-')
  return new Date(dateParts[0], dateParts[1]-1, dateParts[2])
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = getDate(value)
  function handleChange(date) {
    onCommit(getFormattedDate(date))
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
