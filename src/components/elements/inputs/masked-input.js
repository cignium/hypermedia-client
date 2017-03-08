import { Component } from 'react'
import cx from 'classnames'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import emailMask from 'text-mask-addons/dist/emailMask.js'

export default ({ className, errors, onCommit, onUpdate, property, value }) => {
  const mask = getMask(property.format)

  function onKeyPress(event) {
    if (getReservedChars().some(char => char == event.key)) {
      event.preventDefault()
    }
  }

  function commit(value) {
    if (property.type !== 'number') {
      onCommit(value)
      return
    }

    const decimalValue = !value || value === '' 
                          ? null 
                          : isNumeric(value)
                            ? value 
                            : parseFloat(value.substring(1).replace(/,/g, ''))
    onCommit(decimalValue)
  }

  function isNumeric(value) {
    return parseFloat(value) == value
  }

  function getReservedChars() {
    return ['*']
  }

  function getMask(format) {
    const digit = new RegExp(`[\\d${getReservedChars().join('')}]`)
    switch (format.type.toLowerCase()) {
      case 'telephone': return format.useCountryCode ?
        ['1', ' ', '(', /[1-9]/, digit, digit, ')', ' ', digit, digit, digit, '-', digit, digit, digit, digit] :
        ['(', /[1-9]/, digit, digit, ')', ' ', digit, digit, digit, '-', digit, digit, digit, digit]
      case 'currency': return createNumberMask({ prefix: '$', suffix: '', allowDecimal: true })
      case 'email': return emailMask
      case 'zip': return [digit, digit, digit, digit, digit]
      case 'ssn': return [digit, digit, digit, '-', digit, digit, '-', digit, digit, digit, digit]
      default: throw new Error(`Format type '${format.type}' is not supported.`)
    }
  }

  return (
    <MaskedInput
      className={cx(className, 'ct-input', 'ct-text-input')}
      data-tip={errors}
      readOnly={property.disabled}
      id={property.name}
      mask={mask}
      onBlur={() => commit(value)}
      onKeyPress={e => onKeyPress(e)}
      onChange={e => { onUpdate(e.target.value) }}
      title={property.title}
      type={{ telephone: 'tel' }[property.display] || 'text'}
      value={value} />
  )
}
