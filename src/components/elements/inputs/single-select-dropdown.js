import React from 'react'
import Select from 'react-select'
import Input from './input'

export default class SingleSelectDropdown extends Input {
  onChange(value) {
    if (value === '') {
      value = null
    }

    this.update(value)
  }

  render() {
    return (
      <Select
        className='ct-dropdown-list'
        onChange={value => this.onChange(value)}
        options={this.props.property.options.map(({title, value}) => {
          return {
            label: title,
            value,
          }
        })}
        value={this.state.value} />
    )
  }
}
