import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import styles from './input-styles'

function getDate(date) {
  const offset = date.toDate().getTimezoneOffset() * 60000

  return (new Date(date - offset)).toISOString().slice(0,-1)
}

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <div data-tip={errors}>
      <DatePicker
        className={`${className} ${styles.input} ct-date-picker`}
        disabled={property.disabled}
        id={property.id}
        onChange={date => onCommit(getDate(date))}
        selected={value ? moment(value) : value} />
    </div>
  )
}
