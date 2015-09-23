import React from 'react'
import Field from './field'

export default class SelectField extends Field {
  render() {
    return (
      <select
        className={'ct-field ct-select-field'}
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
