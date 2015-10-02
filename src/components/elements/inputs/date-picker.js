import React from 'react'
import Input from './input'

export default class DatePicker extends Input {
  getValue(target) {
    return target.valueAsDate
  }

  render() {
    return (
      <input
        className={`ct-input ct-date-picker`}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        type='date'
        value={this.state.value} />
    )
  }
}
