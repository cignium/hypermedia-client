import React from 'react'
import styles from './input-styles'

export default ({ className, errors, onChange, onCommit, property, value }) => {
  return (
    <textarea
      className={`${className} ${styles.input} ct-multiline-text-input`}
      data-tip={errors}
      disabled={property.disabled}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.value)}
      value={value} />
  )
}
