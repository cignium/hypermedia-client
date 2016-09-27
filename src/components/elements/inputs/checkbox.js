import cx from 'classnames'

export default ({ className, errors, onCommit, property, value }) => (
 property.readOnly ?
    <span key={property.id}>{value}</span> :
    <input
      checked={value}
      className={cx(className, 'ct-input', 'ct-checkbox')}
      data-tip={errors}
      disabled={property.disabled}
      id={property.name}
      onChange={e => onCommit(e.target.checked)}
      title={property.title}
      type='checkbox' />
)
