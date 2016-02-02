import cx from 'classnames'

export default ({ className, property }) => (
  <div
    className={cx(className, 'ct-content')}
    dangerouslySetInnerHTML={{ __html: property.content }}
    id={property.id} />
)
