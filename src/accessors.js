import { update } from './api'

export function get(instance, propertyName) {
  let data = instance.state.get().resources
  data = data[data.current]

  if (propertyName) {
    return instance.allProperties.find(i => i.name === propertyName).value
  }

  const output = {}
  instance.allProperties.forEach(i => {
    output[i.name] = i.value
  })
  return output
}

export function set(instance, propertyName, value) {
  let data = instance.state.get().resources
  data = data[data.current]

  const property = instance.allProperties.find(i => i.name === propertyName)

  if (property.value !== value) {
    update({
      instance,
      links: property.links,
      id: property.id,
      value,
    })
  }
}
