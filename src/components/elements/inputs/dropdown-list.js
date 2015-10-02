import React from 'react'
import Input from './input'

export default class DropdownList extends Input {
  render() {
    return (
      <select
        className={'ct-input ct-dropdown-list'}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        value={this.state.value}>
        {this.props.property.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.title}
            </option>
          )
        })}
      </select>
    )
  }
}
