import React from 'react'
import Input from './input'

export default class TextInput extends Input {
  render() {
    return (
      <input
        className={`ct-input ct-text-input`}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        type='text'
        value={this.state.value} />
    )
  }
}
