import React from 'react'
import styles from './input-styles'

export default ({ className, errors, onCommit, property, value }) => {
  return (
    <input
      checked={value}
      className={`${className} ${styles.input} ct-checkbox`}
      data-tip={errors}
      disabled={property.disabled}
      id={property.id}
      onChange={e => onCommit(e.target.checked)}
      type='checkbox' />
  )
}
