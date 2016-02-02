import cx from 'classnames'

export default ({ className, property }) => (
  <p
    className={cx(className, 'ct-plain')}
    id={property.name}>
    {property.content}
  </p>
)
