import React from 'react'
import factory from './factory'
import styles from './section.css'

export default ({property, update}) => {
  return (
    <div className={`${styles.section} ct-section`}>
      {property.properties.map(property => {
        const Element = factory(property)

        return (
          <div className={`${styles.element} ct-element`} key={property.id}>
            <label className={`${styles.elementLabel} ct-element-label`}>
              {property.title}
            </label>
            <Element property={property} update={update} />
          </div>
        )
      })}
    </div>
  )
}
