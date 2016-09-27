import cx from 'classnames'
import factory from './factory'
import ActionList from './action-list'

export default ({ api, config, property, topLevel }) => (
  <div className={cx('ct-element', `ct-${property.type}-element`)}>
      {!topLevel ? <label className='ct-element-label'>
      {property.title}
    </label>
    : null}
    <div className={cx({'ct-nested': !topLevel}, 'ct-section')}>
      {property.properties.map(property => {
        const Element = factory(property)

        return (
          <Element
            api={api}
            config={config}
            key={property.id}
            property={property}/>
        )
      })}
      {!topLevel ? <ActionList api={api} config={config} links={property.links} /> : null}
    </div>
  </div>
)
