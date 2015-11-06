import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { navigate } from './api'
import 'babel-polyfill'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-select/dist/default.css'
import './index.css'

function init(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  const style = document.createElement('style')
  style.id = 'ct-styles'
  document.head.appendChild(style)

  render(<App />, element)
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    Cignium.init(element)
    Cignium.navigate(element.getAttribute('data-endpoint'))
  }
})

export default {
  init,
  navigate,
}
