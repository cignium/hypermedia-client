import { render } from 'react-dom'
import Freezer from 'freezer-js'
import Api from './api'
import App from './app'

export default class Client {
  constructor(options = {}) {
    this.state = new Freezer({
      current: null,
      error: null,
      drafts: {},
      requests: {},
      resources: {},
    })

    this.config = { actionListPosition: 'top', ...options}
    this.api = new Api(this.state, this.config)
  }

  init(element) {
    if (typeof element === 'string') {
      element = document.getElementById(element)
    }

    render(<App api={this.api} config={this.config} state={this.state} />, element)

    if (typeof this.config.endpoint === 'string') {
      this.navigate(this.config.endpoint)
    }
  }

  navigate(href) {
    this.api.navigate(href)
  }

  get(propertyName) {
    let data = this.state.get().resources
    data = data[data.current]
  
    if (propertyName) {
      return this.api.allProperties.find(i => i.name === propertyName).value
    }
  
    const output = {}
    this.api.allProperties.forEach(i => {
      output[i.name] = i.value
    })
    return output
  }
  
  set(propertyName, value) {
    let data = this.state.get().resources
    data = data[data.current]
  
    const property = this.api.allProperties.find(i => i.name === propertyName)
  
    if (property.value !== value) {
      if (!property.links.update) {
        property.set('value', value)
      }
      this.api.update(property.links, property.id, value)
    }
  }
}
