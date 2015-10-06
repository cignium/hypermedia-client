import React from 'react'
import Select from 'react-select'
import Input from './input'

export default class MultiSelectDropdown extends Input {
  onChange(value) {
    if (value === '') {
      value = null
    }

    if (value !== null) {
      value = value.split(',')
    }

    this.update(value)
  }

  render() {
    return (
      <Select
        className='ct-dropdown-list'
        multi
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
