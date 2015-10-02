import React, { PropTypes } from 'react'
import Element from './element'
import Link from './link'
import List from './list'
import Table from './table'
import inputFactory from './inputs/factory'

export default class Section extends Element {
  static get propTypes() {
    return {
      properties: PropTypes.array.isRequired,
      update: PropTypes.func,
    }
  }

  render() {
    return (
      <div className='ct-section'>
        {this.props.properties.map(property => {
          switch (property.type) {
            case 'array': return this.renderArray(property)
            case 'object': return this.renderSection(property)
            default:
              return property.links.navigate ?
                this.renderLink(property) :
                this.renderInput(property)
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

  renderInput(property) {
    let Input = inputFactory(property)

    return (
      <div className='ct-input-wrap' key={property.id}>
        <label className='ct-input-label'>{property.title}</label>
        <Input property={property} update={this.props.update} />
      </div>
    )
  }

  renderLink(property) {
    return (
      <div className='ct-link-wrap' key={property.id}>
        <label className='ct-link-label'>{property.title}</label>
        <Link property={property} />
      </div>
    )
  }

  renderSection(property) {
    return (
      <div className='ct-section-wrap' key={property.id}>
        <label className='ct-section-label'>{property.title}</label>
        <Section properties={property.properties} update={this.props.update} />
      </div>
    )
  }
}
