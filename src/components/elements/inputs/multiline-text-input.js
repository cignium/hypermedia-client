import React from 'react'

export default ({className, onChange, onCommit, property, value}) => {
  return (
    <textarea
      className={`${className} ct-multiline-text-input`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.value)}
      value={value} />
  )
}
