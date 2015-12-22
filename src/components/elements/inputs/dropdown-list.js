import Select from 'react-select'
import 'react-select/dist/react-select.css'

export default ({ className, errors, onCommit, property, value }) => {
  function getValue(option) {
    return option ? property.isArray ? option.map(option => option.value) :
      option.value : null
  }

  return (
    <div data-tip={errors}>
      <Select
        className={`${className} ct-dropdown-list`}
        disabled={property.disabled}
        id={property.id}
        multi={property.isArray}
        onChange={option => onCommit(getValue(option))}
        options={property.options.map(({ title, value }) => {
          return { label: title, value }
        })}
        title={property.title}
        value={value} />
    </div>
  )
}
