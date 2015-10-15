import React from 'react'
import Select from 'react-select'

export default ({className, property, save, value}) => {
  const onChange = value => {
    save(property.isArray ? value === '' ? [] : value.split(',') : value)
  }

  return (
    <Select
      className='ct-dropdown-list'
      multi={property.isArray}
      onChange={onChange}
      options={property.options.map(({title, value}) => {
        return { label: title, value }
      })}
      value={value} />
  )
}
