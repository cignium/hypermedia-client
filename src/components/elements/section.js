import StyleSheet from 'stilr'
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

const styles = StyleSheet.create({
  root: {
    margin: '5px 0',
  },

  nested: {
    background: 'rgba(0, 0, 0, 0.03)',
    border: 'solid 1px rgba(0, 0, 0, 0.03)',
    borderRadius: 3,
    padding: '0 15px 10px',
  },

  label: {
    color: '#444',
    display: 'block',
    fontSize: 14,
    fontWeight: 700,
    margin: '20px 0 5px',
  },
})
