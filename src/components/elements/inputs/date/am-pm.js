import cx from 'classnames'
import Moment from 'moment'

export default ({ className, errors, onCommit, value }) => {
  function toggleAmPm(date) {
    const moment = Moment(date)
    if (moment.format('A') == 'AM') {
      return moment.add(12, 'hours')
    }
    return moment.add(-12, 'hours')
  }

  return (
    <button
      className={cx(className, 'ct-am-pm ct-action')}
      onClick={ e => onCommit(toggleAmPm(value))}>
      {Moment(value).format('A')}
    </button>
  )
}
