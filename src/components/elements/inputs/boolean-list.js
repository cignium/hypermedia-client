import cx from 'classnames'

export default ({ className, errors, onCommit, property, value }) => {
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
    <div
      id={property.name}
      className={cx(className, 'ct-input', `ct-${property.display}-list`)}
      data-tip={errors}>
      {property.options.map(option => {
        const optionId = `${property.name}-${option.value}`
        return (
          <div className={`ct-${property.display}-option`} key={option.value}>
            <input
              className={`ct-${property.display}`}
              checked={isChecked(option.value)}
              disabled={property.disabled}
              onChange={e => onCommit(getValue(e.target.checked, option.value))}
              id={optionId}
              title={property.title}
              type={property.isArray ? 'checkbox' : 'radio'}
              value={option.value} />
            <label
              className={`ct-${property.display}-label`}
              htmlFor={optionId}>
                {option.title}
            </label>
          </div>
        )
      })}
    </div>
  )
}
