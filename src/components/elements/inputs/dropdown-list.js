import React from 'react'
import Select from 'react-select'
import Input from './input'

export default class DropdownList extends Input {
  onChange(value) {
    if (value === '') {
      value = null
    }

    if (value !== null && this.props.property.multiple) {
      value = value.split(',')
    }

    this.update(value)
  }

  render() {
    return (
      <Select
        multi={this.props.property.multiple}
        onChange={(value) => this.onChange(value)}
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
