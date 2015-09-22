import React, { Component, PropTypes } from 'react'
import DateField from './fields/date'
import Field from './fields/field'
import LinkField from './fields/link'
import List from './list'
import NumberField from './fields/number'
import RadioField from './fields/radio'
import SelectField from './fields/select'
import Table from './table'
import TextareaField from './fields/textarea'

function getField(property) {
  switch (property.type) {
    case 'date': return DateField
    case 'number': return NumberField
    case 'string':
      if(property.links.navigate){
        return LinkField
      }
      switch (property.display) {
        case 'radio': return RadioField
        case 'select': return SelectField
        case 'textarea': return TextareaField
        default: return Field
      }
  }

  throw Error(`Unsupported property type '${property.type}`)
}

export default class Fieldset extends Component {
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
          switch (property.type) {
            case 'array': return this.renderArray(property)
            case 'object': return this.renderObject(property)
            default: return this.renderField(property)
          }
        })}
      </div>
    )
  }

  renderArray(property) {
    const firstItem = property.items[0]

    if (firstItem && firstItem.properties) {
      return <Table key={property.id} />
    }

    return <List key={property.id} />
  }

  renderField(property) {
    let Field = getField(property)

    return (
      <div className='ct-field-wrap' key={property.id}>
        <label className='ct-field-label'>{property.title}</label>
        <Field property={property} update={this.props.update} />
      </div>
    )
  }

  renderObject(property) {
    return (
      <div className='ct-object-wrap' key={property.id}>
        <label className='ct-object-label'>{property.title}</label>
        <Fieldset properties={property.properties} update={this.props.update} />
      </div>
    )
  }
}
