import React from 'react'
import styles from './input-styles'

export default ({ className, errors, onChange, onCommit, property, value }) => {
  return (
    <input
      className={`${className} ${styles.input} ct-number-input`}
      data-tip={errors}
      disabled={property.disabled}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.valueAsNumber)}
      type='number'
      value={value} />
  )
}
