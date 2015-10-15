import React from 'react'

export default ({className, property, save, update, value}) => {
  return (
    <textarea
      className={`${className} ct-multiline-text-input`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => save()}
      onChange={e => update(e.target.value)}
      value={value} />
  )
}
