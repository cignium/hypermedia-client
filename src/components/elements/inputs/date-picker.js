import DatePicker from 'react-datepicker'
import moment from 'moment'
import styles from './input-styles.css'
import 'react-datepicker/dist/react-datepicker.css'

function getDate(date) {
  return date.add(date.utcOffset(), 'm').toISOString().split('T')[0]
}

export default ({ className, errors, onCommit, property, value }) => (
  <div data-tip={errors}>
    <DatePicker
      className={`${className} ${styles.input} ct-date-picker`}
      disabled={property.disabled}
      id={property.id}
      onChange={date => onCommit(getDate(date))}
      selected={value ? moment(value) : value}
      title={property.title} />
  </div>
)
