import createArrayProperty from './array-property'
import createObjectProperty from './object-property'

export default function(data) {
  if (data.type == 'array') {
    return { ...createArrayProperty(data), data }
  }
  else if (data.type == 'object') {
    return { ...createObjectProperty(data), data }
  }

  throw Error(`Unsupported resource type: '${data.type}.`)
}
