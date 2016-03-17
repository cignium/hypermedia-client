import 'babel-polyfill'
import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'
import OptionsParser from './api/options-parser'
import State from './state'
import { get, set } from './accessors'
import '../themes/default/app.css'

function init(element, config) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  if (!config) {
    config = {}
  }
  else {
    if (typeof config.onValueChange !== 'function') {
      delete config.onValueChange
    }
    if (typeof config.onUrlChange !== 'function') {
      delete config.onUrlChange
    }
    if (typeof config.onRedirect !== 'function') {
      delete config.onRedirect
    }
  }
  if (['top', 'bottom', 'both'].indexOf(config.actionListPosition) < 0) {
    config.actionListPosition = 'top'
  }

  config.state = State(config)

  render(<App {...config} />, element)

  if (typeof config.endpoint === 'string') {
    navigate({ config, href: config.endpoint })
  }

  return lastInstance = {
    navigate: href => navigate({href, config}),
    get: path => get(config, path),
    set: (path, value) => set(config, path, value),
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[data-endpoint]')
  for (let i = 0; i < elements.length; i++) {
    init(elements[i], OptionsParser(elements[i]))
  }
})

let lastInstance

function bindToLastInstance(methodName) {
  return function() {
    console.warn(`Cignium.${methodName}() is obsolete. Use the instance method instead.`)
    return lastInstance[methodName].apply(lastInstance, arguments)
  }
}

exports.init = init
exports.navigate = bindToLastInstance('navigate')
exports.get = bindToLastInstance('get')
exports.set = bindToLastInstance('set')
