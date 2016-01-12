import createProperty from './property'
import factory from './factory'

export default function(data, parent) {
  const array = { ...createProperty(data, parent), data }

  array.items = data.items.map(item => factory(item, array))

  return array
}
