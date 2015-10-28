import Input from './inputs/input'
import Link from './link'
import List from './lists/list'
import Section from './section'
import Table from './lists/table'

function isTable(property) {
  return property.items[0] && property.items[0].properties.length
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
