import React from 'react'

export default ({className, onCommit, property, value}) => {
  function getValue(checked, newValue) {
    if (!property.isArray) {
      return newValue
    }

    const values = [...value]

    if (checked) {
      values.push(newValue)
    }
    else {
      values.splice(values.indexOf(newValue), 1)
    }

    return values
  }

  function isChecked(newValue) {
    if (!property.isArray) {
      return value === newValue
    }

    for (const selection of value) {
      if (selection === newValue) {
        return true
      }
    }
  }

  return (
    <div className={`${className} ct-${property.display}-list`}>
      {property.options.map(option => {
        return (
          <div key={option.value}>
            <input
              checked={isChecked(option.value)}
              onChange={e => onCommit(getValue(e.target.checked, option.value))}
              name={property.id}
              type={property.isArray ? 'checkbox' : 'radio'}
              value={option.value} />
            {option.title}
          </div>
        )
      })}
    </div>
  )
}
