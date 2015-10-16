import Input from './inputs/input'
import Link from './link'
import List from './list'
import Section from './section'
import Table from './table'

function isTable(property) {
  return property.items[0] && property.items[0].properties
}

export default property => {
  if (property.links.navigate) {
    return Link
  }

  switch (property.type) {
    case 'array': return isTable(property) ? Table : List
    case 'object': return Section
    default: return Input
  }

  throw Error(`Unsupported element type '${property.type}'`)
}
