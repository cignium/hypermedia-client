import React from 'react'

export default ({className, onChange, onCommit, property, value}) => {
  return (
    <input
      className={`${className} ct-number-input`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.valueAsNumber)}
      type='number'
      value={value} />
  )
}
