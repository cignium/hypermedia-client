import 'babel-polyfill'
import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'
import OptionsParser from './api/options-parser'
import State from './state'
import { get, set } from './accessors'
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

  const instance = { options }
  instance.state = State(instance)

  render(<App {...instance} />, element)

  if (typeof options.endpoint === 'string') {
    instance::navigate(options.endpoint)
  }

  return lastInstance = {
    navigate: href => instance::navigate(href),
    get: path => instance::get(path),
    set: (path, value) => instance::set(path, value),
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-endpoint]')
  for (let i = 0; i < elements.length; i++) {
    init(elements[i], OptionsParser(elements[i]))
  }
})

let lastInstance

function oldNavigate(href) {
  console.warn('Cignium.navigate(href) is obsolete. Use the instance method instead.')
  lastInstance.navigate(href)
}

export {
  init,
  oldNavigate as navigate,
}
