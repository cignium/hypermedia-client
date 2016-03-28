import { update } from './api'

export function get(propertyName) {
  let data = this.state.get().resources
  data = data[data.current]

  if (propertyName) {
    return this.allProperties.find(i => i.name === propertyName).value
  }

  const output = {}
  this.allProperties.forEach(i => {
    output[i.name] = i.value
  })
  return output
}

export function set(propertyName, value) {
  let data = this.state.get().resources
  data = data[data.current]

  const property = this.allProperties.find(i => i.name === propertyName)

  if (property.value !== value) {
    this::update(property.links, property.id, value)
  }
}
