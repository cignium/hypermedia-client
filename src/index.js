import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import { navigate } from './api'

let initialized = false

export default {
  init(element, resource) {
    if (!initialized) {
      if (typeof element === 'string') {
        element = document.getElementById(element)
      }

      ReactDOM.render(<App initialHref={resource} />, element)
      initialized = true
    }
    else {
      navigate(resource)
    }
  },
}
