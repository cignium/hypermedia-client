import React from 'react'

export default ({className, property, save, update, value}) => {
  return (
    <input
      className={`${className} ct-number-input`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => save()}
      onChange={e => update(e.target.valueAsNumber)}
      type='number'
      value={value} />
  )
}
