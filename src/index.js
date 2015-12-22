import { render } from 'react-dom'
import { navigate } from './api'
import App from './app'

function init(element, options) {
  if (typeof element === 'string') {
    element = document.getElementById(element)
  }

  render(<App {...options} />, element)
}

function getOptions(element) {
  const options = {}

  Array.prototype.slice.call(element.attributes)
    .filter(attr => attr.name.startsWith('data-'))
    .map(attr => { options[getName(attr)] = getValue(attr) })

  return options
}

function getName(attribute) {
  return attribute.name
    .slice(5)
    .replace(/-([a-z])/g, match => {
      return match[1].toUpperCase()
    })
}

function getValue(attribute) {
  return attribute.value == '' ? true : attribute.value
}

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('[data-endpoint]')

  if (element) {
    init(element, getOptions(element))

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
