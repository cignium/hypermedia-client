import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { navigate } from './api'

export default {
  init(element, resource) {
    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    ReactDOM.render(<App />, element)
  },

  navigate(href) {
    navigate(href)
  }
}
