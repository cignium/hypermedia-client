import factory from './factory'
import cx from 'classnames'

export default ({ property }) => (
  <div className='ct-list'>
    {property.items.map(item => {
      const Element = factory(item)

      return (
        <Element
          className={cx('ct-list-item', {
            'ct-invalid' : item.errors && item.errors.length})}
          errors={item.errors}
          key={item.id}
          property={item} />
      )
    })}
  </div>
)
