import ArrayProperty from './array-property'
import PrimitiveProperty from './primitive-property'
import Property from './property'

export default class ObjectProperty extends Property {
  constructor(data, parent) {
    super(data, parent)

    this.properties = data.properties.map(property => {
      if (property.type == 'object') {
        return new ObjectProperty(property, this)
      }
      else if (property.type == 'array') {
        return new ArrayProperty(property, this)
      }

      return new PrimitiveProperty(property, this)
    })
  }

  get(id) {
    const property = this.properties.find(p => p.id == id)

    return property.value || property
  }
}
