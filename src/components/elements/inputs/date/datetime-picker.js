import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import Hour from './hour'
import Minute from './minute'
import AmPm from './am-pm'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import { isAmPmFormat } from './date-util'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'

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

  function handleChange(date) {
    onCommit(getDateString(date))
  }

  function renderDropdowms(format) {
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
      <Hour
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        format={format}
        property={property} />
      <span className={cx(className, 'ct-time-separator')}>: </span>
      <Minute
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
      {isAmPmFormat(format) ? <AmPm
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} /> : null}
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
      {!property || property.display === 'select' ? renderDropdowms(property.format.type) : renderPicker()}
    </div>
  )
}
