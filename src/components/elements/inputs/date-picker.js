import React from 'react'
import Input from './input'

export default class DatePicker extends Input {
  getValue(target) {
    return target.valueAsDate.toISOString()
  }

  render() {
    const value = this.state.value ?
      new Date(this.state.value).toISOString().substring(0, 10) :
      this.state.value

    return (
      <input
        className={`ct-input ct-date-picker`}
        id={this.props.property.id}
        onBlur={() => this.onBlur()}
        onChange={e => this.onChange(e)}
        type='date'
        value={value} />
    )
  }
}
