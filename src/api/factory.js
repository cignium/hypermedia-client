import createHtmlContentProperty from './html-content-property'
import createObjectProperty from './object-property'
import createPrimitiveProperty from './primitive-property'
import createArrayProperty from './array-property'

export default function(data, parent) {
  if (data.type == 'object') {
    return createObjectProperty(data, parent)
  }
  else if (data.type == 'html') {
    return createHtmlContentProperty(data, parent)
  }
  else if (data.type == 'array') {
    return createArrayProperty(data, parent)
  }

  return createPrimitiveProperty(data, parent)
}
