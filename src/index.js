import 'babel-polyfill'
import Client from './client'
import OptionsParser from './api/options-parser'
import '../themes/default/app.css'

let globalClient = null

export {
  Client,
  init,
  navigate,
}

function init(element, options) {
  if (globalClient) {
    throw Error('init has already been called.')
  }

  globalClient = new Client(options)
  globalClient.init(element)
}

function navigate(href) {
  if (!globalClient) {
    throw Error('init must be called before navigate can be called.')
  }

  globalClient.navigate(href)
}

function get(propertyName) {
  if (!globalClient) {
    throw Error('init must be called before get can be called.')
  }

  globalClient.get(propertyName)
}

function set(propertyName, value) {
  if (!globalClient) {
    throw Error('init must be called before set can be called.')
  }

  globalClient.set(propertyName, value)
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    init(element, OptionsParser(element))
  }
})
