import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import { createDate } from './date-util'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'

function getDateString(date) {
  if (!date || !date.isValid()) {
    return null
  }
  return date && date.format().split('T')[0]
}

export default ({ className, errors, onCommit, property, value }) => {
  const formats = ['MM/DD/YYYY', 'MM-DD-YYYY', 'YYYYMMDD', 'YYYY-MM-DD']
  momentLocalizer(Moment)
  const date = createDate(value)

  if (property) {
    property.minDate = createDate(property.minDate)
    property.maxDate = createDate(property.maxDate)
  }

  function handleChange(date) {
    onCommit(getDateString(date))
  }

  function renderDropdowms() {
    return (<span>
      <Month
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
      <Day
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
      <Year
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
      </span>)
  }

  function renderPicker() {
    return (<DateTimePicker
        disabled={property.disabled}
        value={date}
        format='L'
        parse={str => Moment(str, formats)}
        className={cx(className, 'ct-datetime-picker')}
        onChange={date => handleChange(Moment(date))}
        time={false} />)
  }

  return (
    <div data-tip={errors} className={cx(className, 'ct-date-picker')}>
      {!property || property.display === 'select' ? renderDropdowms() : renderPicker()}
    </div>
  )
}
