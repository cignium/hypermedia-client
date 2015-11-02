import createObjectProperty from './object-property'
import createPrimitiveProperty from './primitive-property'
import createProperty from './property'

export default function createArrayProperty(data, parent) {
  return {
    ...createProperty(data, parent),
    items: data.items.map(item => {
      if (item.type == 'array') {
        return createArrayProperty(item, this)
      }
      else if (item.type == 'object') {
        return createObjectProperty(item, this)
      }

      return createPrimitiveProperty(item, this)
    }),
  }
}
