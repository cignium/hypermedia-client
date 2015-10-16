import React from 'react'

export default ({className, errors, onChange, onCommit, property, value}) => {
  return (
    <input
      className={`${className} ct-number-input`}
      data-tip={errors}
      id={property.id}
      onBlur={() => onCommit()}
      onChange={e => onChange(e.target.valueAsNumber)}
      type='number'
      value={value} />
  )
}
