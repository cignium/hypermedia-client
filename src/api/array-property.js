import createObjectProperty from './object-property'
import createPrimitiveProperty from './primitive-property'
import createProperty from './property'

export default function createArrayProperty(data, parent) {
  const object = { ...createProperty(data, parent) }

  object.items = data.items.map(item => {
    if (item.type == 'array') {
      return createArrayProperty(item, object)
    }
    else if (item.type == 'object') {
      return createObjectProperty(item, object)
    }

    return createPrimitiveProperty(item, object)
  })
}
