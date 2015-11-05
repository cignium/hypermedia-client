import createProperty from './property'
import factory from './factory'

export default function(data, parent) {
  const object = { ...createProperty(data, parent) }

  object.properties = data.properties.map(property => factory(property, object))

  for (const property of object.properties) {
    object[property.id] = property.value || property.items || property
  }

  return object
}
