import cx from 'classnames'

export default ({ className, errors, onCommit, onUpdate, property, value }) => (
  <input
    className={cx(className, 'ct-input', 'ct-number-input')}
    data-tip={errors}
    disabled={property.disabled}
    id={property.id}
    onBlur={() => onCommit()}
    onChange={e => onUpdate(e.target.value)}
    title={property.title}
    type='number'
    value={value} />
)
