import styles from './section.css'
import factory from './factory'

export default ({ navigate, property, topLevel, update }) => (
  <div className={`${styles.root} ${!topLevel && styles.nested} ct-section`}>
    {property.properties.map(property => {
      const Element = factory(property)

      return (
        <div className='ct-element' key={property.id}>
          <label className={`${styles.label} ct-element-label`}>
            {property.title}
          </label>
          <Element
            navigate={navigate}
            property={property}
            update={update} />
        </div>
      )
    })}
  </div>
)
