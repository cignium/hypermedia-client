import Input from './inputs/input'
import Link from './link'
import Section from './section'

export default property => {
  if (property.links.navigate) {
    return Link
  }

  switch (property.type) {
    case 'object': return Section
    default: return Input
  }

  throw Error(`Unsupported element type '${property.type}'`)
}
