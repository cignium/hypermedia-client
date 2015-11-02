import createArrayProperty from './array-property'
import createPrimitiveProperty from './primitive-property'
import createProperty from './property'

export default function createObjectProperty(data, parent) {
  const object = { ...createProperty(data, parent) }

  object.properties = data.properties.map(property => {
    if (property.type == 'array') {
      return createArrayProperty(property, object)
    }
    else if (property.type == 'object') {
      return createObjectProperty(property, object)
    }

    return createPrimitiveProperty(property, object)
  })

  for (const property of object.properties) {
    object[property.id] = property.value || property.items || property
  }

  return object
}
