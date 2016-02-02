import contentProperty from './content-property'
import createObjectProperty from './object-property'
import createPrimitiveProperty from './primitive-property'
import createArrayProperty from './array-property'

export default function(data, parent) {
  if (data.type == 'object') {
    return createObjectProperty(data, parent)
  }
  if (data.type == 'html' || data.type == 'plain') {
    return contentProperty(data, parent)
  }
  if (data.type == 'array') {
    return createArrayProperty(data, parent)
  }

  return createPrimitiveProperty(data, parent)
}
