import React from 'react'
import Select from 'react-select'
import styles from './dropdown-list.css'
import selectStyles from 'react-select/dist/default.css'

export default ({className, onCommit, property, value}) => {
  function getValue(value) {
    return property.isArray ? value === '' ? [] : value.split(',') : value
  }

  return (
    <Select
      className={`${className} ${styles.dropdownList} ct-dropdown-list`}
      disabled={property.disabled}
      multi={property.isArray}
      onChange={value => onCommit(getValue(value))}
      options={property.options.map(({title, value}) => {
        return { label: title, value }
      })}
      value={value} />
  )
}
