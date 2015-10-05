import React from 'react'
import factory from './factory'

export default ({property, update}) => {
  return (
    <div className='ct-section'>
      {property.properties.map(property => {
        const Element = factory(property)

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
