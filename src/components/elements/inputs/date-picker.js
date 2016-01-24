import cx from 'classnames'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

function getDate(date) {
  return date.add(date.utcOffset(), 'm').toISOString().split('T')[0]
}

export default ({ className, errors, onCommit, property, value }) => (
  <div data-tip={errors}>
    <DatePicker
      className={cx(className, 'ct-input', 'ct-date-picker')}
      disabled={property.disabled}
      id={property.name}
      onChange={date => onCommit(getDate(date))}
      selected={value ? moment(value) : value}
      title={property.title} />
  </div>
)
