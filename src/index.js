import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'

function init(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  const useDefaultStyling = element
    .getAttribute('data-disable-default-styling') == null

  render(<App defaultStyling={useDefaultStyling} />, element)
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    init(element)

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
