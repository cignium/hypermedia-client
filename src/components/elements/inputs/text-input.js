import React from 'react'

export default ({className, errors, onChange, onCommit, property, value}) => {
  return (
    <input
      className={`${className} ct-text-input`}
      data-tip={errors}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.value)}
      type={{ email: 'email', telephone: 'tel' }[property.display] || 'text'}
      value={value} />
  )
}
