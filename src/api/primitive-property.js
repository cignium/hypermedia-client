import Property from './property'

export default class PrimitiveProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.display = data.display
    this.id = data.id
    this.options = data.options
    this.value = data.value
    this.isArray = this.type === 'string[]'
  }
}
