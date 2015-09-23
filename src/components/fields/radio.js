import React from 'react'
import Field from './field'

export default class RadioField extends Field {
  render() {
    return (
      <div className={'ct-field ct-radio-field'}>
        {this.props.property.options.map((option) => {
          return (
            <div key={option.value}>
              <input
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
