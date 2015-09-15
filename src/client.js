import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './app'
import store from './store'
import { navigate } from './actions'

let initialized = false

window.Cignium = {
  init(element, resource) {
    if (!initialized) {
      if (typeof element === 'string') {
        element = document.getElementById(element)
      }

      ReactDOM.render(
        <Provider store={store}>
          <App initialHref={resource} />
        </Provider>,
        element
      )

      initialized = true
    }
    else {
      store.dispatch(navigate(resource))
    }
  },
}
