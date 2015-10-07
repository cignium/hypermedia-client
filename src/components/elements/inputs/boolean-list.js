import React from 'react'
import Input from './input'

const isChecked = (values, option) => {
  for (const value of values || []) {
    if (option.value === value) {
      return true
    }
  }
}

export default class BooleanList extends Input {
  get isMulti() {
    return this.props.property.type === 'string[]'
  }

  onChange(e, value) {
    if (!this.isMulti) {
      return this.update(value)
    }

    const values = [...this.state.value || []]

    if (e.target.checked) {
      values.push(value)
    }
    else {
      values.splice(values.indexOf(value), 1)
    }

    this.update(values)
  }

  render() {
    return (
      <div className={`ct-input ct-${this.props.property.display}-list`}>
        {this.props.property.options.map(option => {
          return (
            <div key={option.value}>
              <input
                checked={isChecked(this.state.value, option)}
                onChange={e => this.onChange(e, option.value)}
                name={this.props.property.id}
                type={this.isMulti ? 'checkbox' : 'radio'}
                value={option.value} />
              {option.title}
            </div>
          )
        })}
      </div>
    )
  }
}
