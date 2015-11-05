import createProperty from './property'

export default function(data, parent) {
  return { ...createProperty(data, parent), content: data.content }
}
