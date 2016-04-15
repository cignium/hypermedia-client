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
}
