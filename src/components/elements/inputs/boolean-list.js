import React from 'react'

export default ({className, property, save, value}) => {
  const onChange = (e, newValue) => {
    if (property.isArray) {
      const values = [...value]

      if (e.target.checked) {
        values.push(newValue)
      }
      else {
        values.splice(values.indexOf(newValue), 1)
      }

      newValue = values
    }

    save(newValue)
  }

  const isChecked = newValue => {
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
              onChange={e => onChange(e, option.value)}
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
