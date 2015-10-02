import React from 'react'
import Input from './input'

export default class CheckboxList extends Input {
  onChange(value) {
    this.setState({ value: [value] })
    this.onUpdate([value])
  }

  render() {
    return (
      <div className={'ct-input ct-checkbox-list'}>
        {this.props.property.options.map((option) => {
          let checked = false

          for (let item in this.state.value || []) {
            if (item.value === option.value) {
              checked = true
            }
          }

          return (
            <div key={option.value}>
              <input
                checked={checked}
                onChange={(e) => this.onChange([option.value])}
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
