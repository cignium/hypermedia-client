import React from 'react'
import Field from './field'

export default class TextareaField extends Field {
  render() {
    return (
      <textarea
        className={'ct-field ct-text-field ct-multiline-text-field'}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        value={this.state.value} />
    )
  }
}
