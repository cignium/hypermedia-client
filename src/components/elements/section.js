import cx from 'classnames'
import factory from './factory'

export default ({ property, topLevel }) => (
  <div className={cx('ct-element', `ct-${property.type}-element`)}>
      {!topLevel ? <label className='ct-element-label'>
      {property.title}
    </label>
    : null}
    <div className={cx({'ct-nested': !topLevel}, 'ct-section')}
    key={property.id}>
      {property.properties.map(property => {
        const Element = factory(property)

        return (
          <Element property={property} key={property.id} />
        )
      })}
    </div>
  </div>
)
