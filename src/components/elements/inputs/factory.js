import React, { PropTypes } from 'react'
import CheckboxList from './checkbox-list'
import DatePicker from './date-picker'
import DropdownList from './dropdown-list'
import MultilineTextInput from './multiline-text-input'
import NumberInput from './number-input'
import RadioButtonList from './radio-button-list'
import TextInput from './text-input'

export default function factory(property) {
  switch (property.type) {
    case 'date': return DatePicker
    case 'number': return NumberInput
    case 'string':
      switch (property.display) {
        case 'checkbox': return CheckboxList
        case 'radio': return RadioButtonList
        case 'select': return DropdownList
        case 'textarea': return MultilineTextInput
        default: return TextInput
      }
  }

  throw Error(`Unsupported input type '${property.type}'`)
}
