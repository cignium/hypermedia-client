import { update } from './api'

function _get(data) {
  const obj = {}
  data.properties.forEach(p => {
    switch (p.type) {
      case 'html':
      case 'plain':
        obj[p.name] = p.content
        break
      case 'object':
        obj[p.name] = _get(p)
        break
      case 'array' :
        obj[p.name] = p.items.map(_get)
        break
      default:
        obj[p.name] = p.value
        break
    }
  })
  return obj
}

function _getProperty(data, path) {
  path.forEach(step => {
    switch (data.type) {
      case 'object':
        data = data.properties.find(p => p.name === step)
        break
      case 'array' :
        data = data.items[step]
        break
      default:
        throw Error(`Property '${data.name}' can not contain properties`)
    }
    if (!data) {
      throw Error(`Property '${step}' does not exist`)
    }
  })

  return data
}

export function get(config, path) {
  let data = config.state.get().resources
  data = data[data.current]

  if (path) {
    return _getProperty(data, path).value
  }

  return _get(data, path)
}

export function set(config, path, value) {
  let data = config.state.get().resources
  data = data[data.current]

  const property = _getProperty(data, path)

  if (property.value !== value) {
    update(property.links, property.id, value, property.name, config)
  }
}
