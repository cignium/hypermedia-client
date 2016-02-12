import { render } from 'react-dom'
import { navigate, update } from './api'
import App from './app'
import OptionsParser from './api/options-parser'
import state from './state'
import '../themes/default/app.css'

function init(element, options) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  if (!options) {
    options = {}
  }
  else {
    if (typeof options.onValueChange !== 'function') {
      delete options.onValueChange
    }
    if (typeof options.onUrlChange !== 'function') {
      delete options.onUrlChange
    }
    if (typeof options.onRedirect !== 'function') {
      delete options.onRedirect
    }
  }
  if (['top', 'bottom', 'both'].indexOf(options.actionListPosition) < 0) {
    options.actionListPosition = 'top'
  }

  render(<App {...options} />, element)

  if (typeof options.endpoint === 'string') {
    navigate(options.endpoint, options)
  }
}

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

function get(path) {
  let data = state.get().resources
  data = data[data.current]

  if (path) {
    return _getProperty(data, path).value
  }

  return _get(data, path)
}

function set(path, value) {
  let data = state.get().resources
  data = data[data.current]

  const property = _getProperty(data, path)

  if (property.value !== value) {
    update(property.links, property.id, value, property.name)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')
  if (element) {
    init(element, OptionsParser(element))
  }
})

export {
  init,
  navigate,
  get,
  set,
}
