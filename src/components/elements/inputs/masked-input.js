import { Component } from 'react'
import cx from 'classnames'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import emailMask from 'text-mask-addons/dist/emailMask.js'

export default class MaskedInputInput extends Component {
  render() {
    const mask = this.getMask(this.props.property.format)

    return (
      <MaskedInput
        className={cx(this.props.className, 'ct-input', 'ct-text-input')}
        data-tip={this.props.errors}
        readOnly={this.props.property.disabled}
        id={this.props.property.name}
        mask={mask}
        onBlur={() => this.onCommit()}
        onKeyPress={e => this.onKeyPress(e)}
        onChange={e => { this.props.onUpdate(e.target.value) }}
        title={this.props.property.title}
        type={{ telephone: 'tel' }[this.props.property.display] || 'text'}
        value={this.props.value} />
    )
  }

  onKeyPress(event) {
    if (this.getReservedChars().some(char => char == event.key)) {
      event.preventDefault()
    }
  }

  onCommit() {
    const value = this.props.value

    if (this.props.property.type !== 'number') {
      this.props.onCommit(value)
      return
    }

    const decimalValue = value === '' ? null : parseFloat(value.substring(1).replace(/,/g, ''))
    this.props.onCommit(decimalValue)
  }

  getReservedChars() {
    return ['*']
  }

  getMask(format) {
    const digit = new RegExp(`[\\d${this.getReservedChars().join('')}]`)
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
}
