import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-select/dist/react-select.css'
import './index.css'

function init(element) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  render(<App />, element)
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
