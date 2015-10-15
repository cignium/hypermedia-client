import React from 'react'

export default ({className, property, save, update, value}) => {
  const onChange = e => {
    update(e.target.value ? e.target.valueAsDate.toISOString() : null)
  }

  return (
    <input
      className={`${className} ct-date-picker`}
      data-tip={property.errors}
      id={property.id}
      onBlur={() => save()}
      onChange={onChange}
      type='date'
      value={value ? new Date(value).toISOString().substring(0, 10) : value} />
  )
}
