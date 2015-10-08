import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { navigate } from './api'

export default {
  init(element) {
    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    render(<App />, element)
  },

  navigate,
}
