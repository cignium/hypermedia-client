import React from 'react'
import Input from './input'

export default class NumberInput extends Input {
  getValue(target) {
    return target.valueAsNumber
  }

  render() {
    return (
      <input
        className={`ct-input ct-number-input`}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        type='number'
        value={this.state.value} />
    )
  }
}
