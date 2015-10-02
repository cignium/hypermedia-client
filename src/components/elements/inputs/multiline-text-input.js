import React from 'react'
import Input from './input'

export default class MultilineTextInput extends Input {
  render() {
    return (
      <textarea
        className={'ct-input ct-multiline-text-input'}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        value={this.state.value} />
    )
  }
}
