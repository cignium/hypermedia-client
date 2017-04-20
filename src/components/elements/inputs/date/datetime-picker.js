import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import Hour from './hour'
import Minute from './minute'
import AmPm from './am-pm'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'
import { createDateTime } from './date-util'

function getDateString(date) {
  if (!date || !date.isValid()) {
    return null
  }
  return date.format()
}

export default ({ className, errors, onCommit, property, value }) => {
  const formats = ['MM/DD/YYYY HH:mm A', 'MM/DD/YYYY H:mm A', 'MM-DD-YYYY HH:mm A',
    'MM-DD-YYYY H:mm A', 'MM/DD/YYYY', 'MM-DD-YYYY','YYYYMMDD HH:mm', 'YYYY-MM-DD HH:mm']
  const date = value ? new Date(value) : null
  momentLocalizer(Moment)
  const minDate = property && createDateTime(property.minValue)
  const maxDate = property && createDateTime(property.maxDate)

  function handleChange(date) {
    onCommit(getDateString(date))
  }

  function renderDropdowms() {
    return (<span>
      <Month
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
      <Day
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
      <Year
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
      <Hour
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
      <span className={cx(className, 'ct-time-separator')}>: </span>
      <Minute
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
      <AmPm
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property}
        minDate={minDate}
        maxDate={maxDate} />
    </span>)
  }

  function renderPicker() {
    return (<DateTimePicker
      disabled={property.disabled}
      value={date}
      parse={str => Moment(str, formats)}
      className={cx(className, 'ct-datetime-picker')}
      format='L LT'
      onChange={date => handleChange(Moment(date))}
      />)
  }

  return (
    <div data-tip={errors} className={cx(className, 'ct-datetime-picker')}>
      {!property || property.display === 'select' ? renderDropdowms() : renderPicker()}
    </div>
  )
}
