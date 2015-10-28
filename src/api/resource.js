import ArrayProperty from './array-property'
import ObjectProperty from './object-property'

class ArrayResource extends ArrayProperty {
  constructor(data, profile) {
    super(data)
    this.getData = () => data
    this.profile = profile
  }
}

class ObjectResource extends ObjectProperty {
  constructor(data, profile) {
    super(data)
    this.getData = () => data
    this.profile = profile
  }
}

export default function(data, profile) {
  if (data.type == 'array') {
    return new ArrayResource(data, profile)
  }
  else if (data.type == 'object') {
    return new ObjectResource(data, profile)
  }

  throw Error(`Unsupported resource type: '${data.type}.`)
}
