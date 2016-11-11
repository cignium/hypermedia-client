import BooleanList from './boolean-list'
import Checkbox from './checkbox'
import DatePicker from './date/date-picker'
import DateTimePicker from './date/datetime-picker'
import DropdownList from './dropdown-list'
import MaskedInput from './masked-input'
import MultilineTextInput from './multiline-text-input'
import NumberInput from './number-input'
import TextInput from './text-input'
import FileInput from './file-input'

export default function(property) {
  switch (property.type) {
    case 'boolean': return Checkbox
    case 'date': return DatePicker
    case 'datetime': return DateTimePicker
    case 'file':
    case 'file[]': return FileInput
    case 'number': return useMask(property) ? MaskedInput : NumberInput
    case 'string':
    case 'string[]':
      switch (property.display) {
        case 'checkbox':
        case 'radio': return BooleanList
        case 'select': return DropdownList
        case 'textarea': return MultilineTextInput
        default: return useMask(property) ? MaskedInput : TextInput
      }
  }

  throw Error(`Unsupported input type '${property.type}'`)
}

const formats = [
  'telephone',
  'currency',
  'email',
  'zip',
  'ssn',
]

function useMask({ format }) {
  return format && formats.some(f => f == format.type.toLowerCase())
}
