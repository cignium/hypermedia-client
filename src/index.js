import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { navigate } from './api'

function init(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  render(<App />, element)
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    Cignium.init(element)
    Cignium.navigate(element.dataset.endpoint)
  }
})

export default {
  init,
  navigate,
}
