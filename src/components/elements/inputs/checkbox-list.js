import React from 'react'
import Input from './input'

function isChecked(values, option) {
  for (let value of values || []) {
    if (option.value === value) {
      return true
    }
  }
}

export default class CheckboxList extends Input {
  onChange(e, value) {
    let values = [...this.state.value || []]

    if (e.target.checked) {
      values.push(value)
    }
    else {
      values.splice(values.indexOf(value), 1)
    }

    if (!values.length) {
      values = null
    }

    this.setState({ value: values })
    this.onUpdate(values)
  }

  render() {
    return (
      <div className={'ct-input ct-checkbox-list'}>
        {this.props.property.options.map((option) => {
          return (
            <div key={option.value}>
              <input
                checked={isChecked(this.state.value, option)}
                onChange={(e) => this.onChange(e, option.value)}
                name={this.props.property.id}
                type='checkbox'
                value={option.value} />
              {option.title}
            </div>
          )
        })}
      </div>
    )
  }
}
