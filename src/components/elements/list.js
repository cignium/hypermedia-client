import styles from './list.css'
import factory from './factory'

export default ({ property, executeAction }) => (
  <div className='ct-list'>
    {property.items.map(item => {
      const Element = factory(item)
      return (
        <Element
          className={`${styles.listItem} ct-list-item`}
          key={item.id}
          property={item} />
      )
    })}
  </div>
)
