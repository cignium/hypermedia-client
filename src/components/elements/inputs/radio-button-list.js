import React from 'react'
import Input from './input'

export default class RadioButtonList extends Input {
  onChange(value) {
    this.setState({ value: value })
    this.onUpdate(value)
  }

  render() {
    return (
      <div className={'ct-input ct-radio-button-list'}>
        {this.props.property.options.map((option) => {
          return (
            <div key={option.value}>
              <input
                checked={this.state.value == option.value}
                onChange={(e) => this.onChange(option.value)}
                name={this.props.property.id}
                type='radio'
                value={option.value} />
              {option.title}
            </div>
          )
        })}
      </div>
    )
  }
}
