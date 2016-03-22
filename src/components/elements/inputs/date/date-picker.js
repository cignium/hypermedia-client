import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'

function getDateString(date) {
  return date && date.toISOString().split('T')[0]
}

function createDate(value) {
  if (!value) {
    return null
  }

  const dateParts = value.split('-')

  return new Date(Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, dateParts[2]))
}

export default ({ className, errors, onCommit, property, value }) => {
  const date = createDate(value)
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
