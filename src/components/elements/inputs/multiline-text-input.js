import cx from 'classnames'

export default ({ className, errors, onCommit, onUpdate, property, value }) => (
  <textarea
    className={cx(className, 'ct-input', 'ct-multiline-text-input')}
    data-tip={errors}
    disabled={property.disabled}
    id={property.name}
    onBlur={() => onCommit()}
    onChange={e => onUpdate(e.target.value)}
    title={property.title}
    value={value} />
)
