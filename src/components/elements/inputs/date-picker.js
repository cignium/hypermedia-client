import React from 'react'
import styles from './input-styles'

function getDate(input) {
  return input.value ? input.valueAsDate.toISOString() : null
}

export default ({ className, errors, onChange, onCommit, property, value }) => {
  return (
    <input
      className={`${className} ${styles.input} ct-date-picker`}
      data-tip={errors}
      disabled={property.disabled}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(getDate(e.target))}
      type='date'
      value={value ? new Date(value).toISOString().substring(0, 10) : value} />
  )
}
