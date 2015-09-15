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
          className={`ct-field ct-text-field ct-multiline-text-field`}
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

    if (this.props.property.display === 'radio') {
      return (
        <div className={`ct-field ct-radio-field`}>
          {this.props.property.options.map((option) => {
            return (
              <div key={option.value}>
                <input
                  name="{this.props.property.id}"
                  type="radio" value={option.value} />
                {option.title}
              </div>
            )
          })}
        </div>
      )
    }

    return <div>Unsupported display type</div>
  }
}
