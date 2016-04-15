import BooleanList from './boolean-list'
import Checkbox from './checkbox'
import DatePicker from './date/date-picker'
import DateTimePicker from './date/datetime-picker'
import DropdownList from './dropdown-list'
import MultilineTextInput from './multiline-text-input'
import NumberInput from './number-input'
import TextInput from './text-input'

export default function(property) {
  switch (property.type) {
    case 'boolean': return Checkbox
    case 'date': return DatePicker
    case 'datetime': return DateTimePicker
    case 'number': return NumberInput
    case 'string':
    case 'string[]':
      switch (property.display) {
        case 'checkbox':
        case 'radio': return BooleanList
        case 'select': return DropdownList
        case 'textarea': return MultilineTextInput
        default: return TextInput
      }
  }

  throw Error(`Unsupported input type '${property.type}'`)
}
