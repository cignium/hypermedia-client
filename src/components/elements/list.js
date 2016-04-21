import factory from './factory'
import Link from './link'
import cx from 'classnames'

export default ({ api, property }) => {
  return (
    <div className='ct-list'>
      {property.links.navigate ?
      <Link
        className={cx('ct-list-header',
          {'ct-invalid' : property.errors && property.errors.length})}
          errors={property.errors}
          key={property.id}
          property={property} />
      : property.title ?
        <label className='ct-list-header ct-element-label'>
          {property.title}
        </label>
      : undefined}
      <div className='ct-list-body'>
    {property.items.map(item => {
      const Element = factory(item)

      return (
        <Element
          api={api}
          className={cx('ct-list-item', {
            'ct-invalid' : item.errors && item.errors.length})}
          errors={item.errors}
          key={item.id}
          property={item} />
      )
    })}
    </div>
  </div>
)}
