import cx from 'classnames'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import emailMask from 'text-mask-addons/dist/emailMask.js'

export default ({ className, errors, onCommit, onUpdate, property, value }) => {
  const mask = getMask(property.format)

  return (
    <MaskedInput
      className={cx(className, 'ct-input', 'ct-text-input')}
      data-tip={errors}
      disabled={property.disabled}
      id={property.name}
      mask={mask}
      onBlur={() => onCommit()}
      onChange={e => onUpdate(e.target.value)}
      title={property.title}
      type={{ telephone: 'tel' }[property.display] || 'text'}
      value={value} />
  )
}

function getMask(format) {
  switch (format.type.toLowerCase()) {
    case 'telephone': return format.useCountryCode ?
      ['1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] :
      ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    case 'currency': return createNumberMask({ prefix: '$', suffix: '', allowDecimal: true })
    case 'email': return emailMask
    case 'zip': return [/\d/, /\d/, /\d/, /\d/, /\d/]
    case 'ssn': return [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    default: throw new Error(`Format type '${format.type}' is not supported.`)
  }
}
