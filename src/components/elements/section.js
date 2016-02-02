import cx from 'classnames'
import factory from './factory'

export default ({ property, topLevel }) => (
  <div className={cx({'ct-nested': !topLevel}, 'ct-section')}>
    {property.properties.map(property => {
      const Element = factory(property)

      return (
        <div
          className={cx('ct-element', `ct-${property.type}-element`)}
          key={property.id}>
          <label className='ct-element-label'>
            {property.title}
          </label>
          <Element property={property} />
        </div>
      )
    })}
  </div>
)
