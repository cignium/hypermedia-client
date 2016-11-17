import { Component } from 'react'
import cx from 'classnames'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask.js'
import emailMask from 'text-mask-addons/dist/emailMask.js'

export default class MaskedInputInput extends Component {
  constructor(props) {
    super()
    this.state = { displayValue: props.value || ''}
  }
  render() {
    const mask = this.getMask(this.props.property.format)

    return (
      <MaskedInput
        className={cx(this.props.className, 'ct-input', 'ct-text-input')}
        data-tip={this.props.errors}
        readOnly={this.props.property.disabled}
        id={this.props.property.name}
        mask={mask}
        onBlur={() => this.props.onCommit()}
        onChange={e => this.adjustAndUpdate(e.target.value)}
        title={this.props.property.title}
        type={{ telephone: 'tel' }[this.props.property.display] || 'text'}
        value={this.state.displayValue} />
    )
  }

  adjustAndUpdate(value) {
    this.state.displayValue = value
    this.setState(state)
    if (this.props.property.type !== 'number') {
      this.props.onUpdate(value)
      return
    }
    const decimalValue = value === '' ? null : parseFloat(value.substring(1).replace(/,/g, ''))
    this.props.onUpdate(decimalValue)
  }

  getMask(format) {
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
}
