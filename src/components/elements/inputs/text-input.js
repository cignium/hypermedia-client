import cx from 'classnames'

export default ({ className, errors, onCommit, onUpdate, property, value, readOnly }) => (
  property.readOnly ?
    <span key={property.id}>{property.display === 'password' ? value.replace(/./g, '*') : value}</span> :
	  <input
	    className={cx(className, 'ct-input', 'ct-text-input')}
	    data-tip={errors}
	    disabled={property.disabled}
	    id={property.name}
	    onBlur={() => onCommit()}
	    onChange={e => onUpdate(e.target.value)}
	    title={property.title}
	    type={{ email: 'email', telephone: 'tel', password: 'password' }[property.display] || 'text'}
	    value={value} />
)
