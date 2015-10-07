import React from 'react'
import Select from 'react-select'
import Input from './input'

export default class DropdownList extends Input {
  onChange(value) {
    if (this.props.property.isMulti) {
      value = value === '' ? [] : value.split(',')
    }

    this.update(value)
  }

  render() {
    return (
      <Select
        className='ct-dropdown-list'
        multi={this.props.property.isMulti}
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
