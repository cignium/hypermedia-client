import ObjectProperty from './object-property'
import PrimitiveProperty from './primitive-property'
import Property from './property'

export default class ArrayProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.items = data.items.map(item => {
      if (item.type == 'object') {
        return new ObjectProperty(item, this)
      }
      else if (item.type == 'array') {
        return new ArrayProperty(item, this)
      }

      return new PrimitiveProperty(item, this)
    })
  }
}
