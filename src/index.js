import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'
import OptionsParser from './api/options-parser'
import '../themes/default/app.css'

function init(element, options) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  if (!options) {
    options = {}
  }
  if (typeof options.onValueChange !== 'function') {
    options.onValueChange = () => {}
  }
  if (typeof options.onUrlChange !== 'function') {
    options.onUrlChange = () => {}
  }

  render(<App {...options} />, element)

  if (options.endpoint) {
    navigate(options.endpoint)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')
  if (element) {
    init(element, OptionsParser(element))
  }
})

export {
  init,
  navigate,
}
