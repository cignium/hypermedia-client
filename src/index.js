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

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    init(element, OptionsParser(element))
  }
})
