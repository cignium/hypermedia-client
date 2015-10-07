import DatePicker from './inputs/date-picker'
import DropdownList from './inputs/dropdown-list'
import Link from './link'
import List from './list'
import MultilineTextInput from './inputs/multiline-text-input'
import NumberInput from './inputs/number-input'
import BooleanList from './inputs/boolean-list'
import Section from './section'
import Table from './table'
import TextInput from './inputs/text-input'

const isTable = property => {
  return property.items[0] && property.items[0].properties
}

export default property => {
  switch (property.type) {
    case 'array': return isTable(property) ? Table : List
    case 'date': return DatePicker
    case 'number': return NumberInput
    case 'object': return Section
    case 'string':
    case 'string[]':
      if (property.links.navigate) {
        return Link
      }

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
