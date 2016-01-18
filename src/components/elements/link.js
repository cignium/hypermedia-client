import cx from 'classnames'

export default ({ className, property }) => (
  <a
    className={cx(className, 'ct-link')}
    id={property.id}
    href={property.links.navigate.href}>
    {property.value}
  </a>
)
