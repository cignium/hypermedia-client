import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'
import OptionsParser from './api/options-parser'
import '../themes/default/app.css'

function init(element, options) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  render(<App {...options} />, element)
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    init(element, OptionsParser(element))

    const url = element.getAttribute('data-endpoint')

    if (url) {
      navigate(url)
    }
  }
})

export {
  init,
  navigate,
}
