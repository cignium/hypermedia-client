import React, { PropTypes } from 'react'
import Link from './link'
import List from './list'
import Table from './table'
import inputFactory from './inputs/factory'

function isTable(property) {
  return property.items[0] && property.items[0].properties
}

export default function Section({property, update}) {
  return (
    <div className='ct-section'>
      {property.properties.map(property => {
        let Element = null

        switch (property.type) {
          case 'array':
            Element = isTable(property) ? Table : List
            break
          case 'object':
            Element = Section
            break
          default:
            Element = property.links.navigate ? Link : inputFactory(property)
        }

        return (
          <div className='ct-element' key={property.id}>
            <label className='ct-element-label'>{property.title}</label>
            <Element property={property} update={update} />
          </div>
        )
      })}
    </div>
  )
}
