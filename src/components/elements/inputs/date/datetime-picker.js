import cx from 'classnames'
import Year from './year'
import Month from './month'
import Day from './day'
import Hour from './hour'
import Minute from './minute'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import Moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import 'react-widgets/dist/css/react-widgets.css'

function getDateString(date) {
  if (!date || !date.isValid()) {
    return null
  }
  return date.toISOString()
}

export default ({ className, errors, onCommit, property, value }) => {
  const formats = ['MM/DD/YYYY HH:mm A', 'MM/DD/YYYY H:mm A', 'MM-DD-YYYY HH:mm A',
    'MM-DD-YYYY H:mm A', 'MM/DD/YYYY', 'MM-DD-YYYY','YYYYMMDD HH:mm', 'YYYY-MM-DD HH:mm']
  const date = value ? new Date(value) : null
  momentLocalizer(Moment)

  function handleChange(date) {
    onCommit(getDateString(date))
  }

  function renderDropdowms() {
    return (<span>
      <Year
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
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
      <Hour
        className={className}
        onCommit={date => handleChange(Moment(date))}
        value={date}
        property={property} />
      <span className={cx(className, 'ct-time-separator')}>: </span>
      <Minute
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
      parse={str => Moment(str, formats)}
      className={cx(className, 'ct-datetime-picker')}
      format='L LT'
      onChange={date => handleChange(Moment(date))}
      />)
  }

  return (
    <div data-tip={errors} className={cx(className, 'ct-datetime-picker')}>
      {property.display === 'select' ? renderDropdowms() : renderPicker()}
    </div>
  )
}
