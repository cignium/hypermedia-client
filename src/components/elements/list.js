import factory from './factory'

export default ({ property }) => (
  <div className='ct-list'>
    {property.items.map(item => {
      const Element = factory(item)

      return (
        <Element
          className='ct-list-item'
          key={item.id}
          property={item} />
      )
    })}
  </div>
)
