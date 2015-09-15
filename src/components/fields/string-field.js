import React from 'react'
import Field from './field'

export default class StringField extends Field {
  get type() {
    return 'text'
  }

  render() {
    if (!this.props.property.display) {
      return super.render()
    }

    if (this.props.property.display === 'textarea') {
      return (
        <textarea
          className={`ct-field ct-${this.type}-field`}
          id={this.props.property.id}
          onBlur={(e) => this.onBlur(e)}
          onChange={(e) => this.onChange(e)}
          value={this.state.value} />
      )
    }

    if (this.props.property.display === 'select') {
      return (
        <select
          className={`ct-field ct-select-field`}
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

    return <div>Unsupported display type</div>
  }
}
