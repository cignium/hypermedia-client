import React, { Component, PropTypes } from 'react'
import DateField from './date-field'
import NumberField from './number-field'
import StringField from './string-field'

const fieldTypes = {
  'date': DateField,
  'number': NumberField,
  'string': StringField,
}

export default class Fields extends Component {
  static get propTypes() {
    return {
      properties: PropTypes.array.isRequired,
      update: PropTypes.func,
    }
  }

  render() {
    return (
      <div className='ct-fields'>
        {this.props.properties.map(property => {
          const Field = fieldTypes[property.type]

          return (
            <div className='ct-field-wrap' key={property.id}>
              <label className='ct-field-label'>{property.title}</label>
              <Field property={property} update={this.props.update}  />
            </div>
          )
        })}
      </div>
    )
  }
}
