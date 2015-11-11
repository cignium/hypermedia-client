import React from 'react'
import styles from './input-styles'

export default ({ className, errors, onChange, onCommit, property, value }) => (
  <input
    className={`${className} ${styles.input} ct-text-input`}
    data-tip={errors}
    disabled={property.disabled}
    id={property.id}
    onBlur={() => onCommit()}
    onChange={e => onChange(e.target.value)}
    title={property.title}
    type={{ email: 'email', telephone: 'tel' }[property.display] || 'text'}
    value={value} />
)
