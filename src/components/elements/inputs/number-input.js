import cx from 'classnames'

export default ({ className, errors, onCommit, onUpdate, property, value }) => (
  property.readOnly ?
    <span key={property.id}>{value}</span> :
  <input
    className={cx(className, 'ct-input', 'ct-number-input')}
    data-tip={errors}
    disabled={property.disabled}
    id={property.name}
    onBlur={() => onCommit(value == '' ? null : value)}
    onChange={e => onUpdate(parseInput(e.target.value))}
    title={property.title}
    type='number'
    value={value} />
)

function parseInput(input) {
  if (input == null || isNaN(parseFloat(input))) {
    return ''
  }

  return parseFloat(input)
}
