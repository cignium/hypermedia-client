import Input from './inputs/input'
import HtmlContent from './html-content'
import Link from './link'
import Section from './section'
import List from './list'
import Table from './table'
import Plain from './plain'
import ReadOnly from './read-only'

export default property => {
  if (property.links.navigate && property.type !== 'array') {
    return Link
  }

  if (property.readOnly && property.type !== 'html') {
    return ReadOnly
  }

  switch (property.type) {
    case 'html': return HtmlContent
    case 'plain': return Plain
    case 'object': return Section
    case 'array': return List
    case 'table' : return Table
    default: return Input
  }

  throw Error(`Unsupported element type '${property.type}'`)
}
