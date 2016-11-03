import cx from 'classnames'
import { createDate } from './inputs/date/date-util'

export default ({ className, property }) => {
  let value = property.value

  if (property.type == 'number') {
    value = Number(value).toLocaleString()
  }

  if (property.display == 'date') {
    const date = createDate(value)
    value = date == null ? null : date.toLocaleDateString()
  }

  if (property.type == 'datetime') {
    const date = value ? new Date(value) : null
    value = date == null ? null : date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  return (
    <span
      className={cx(className)}
      id={property.id}
      title={value}>
      { value }
    </span>
  )
}
