import React from 'react'

export default ({className, property, save, update, value}) => {
  return (
    <input
      className={`${className} ct-text-input`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => save()}
      onChange={e => update(e.target.value)}
      type={{ email: 'email', telephone: 'tel' }[property.display] || 'text'}
      value={value} />
  )
}
