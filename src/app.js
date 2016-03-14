import { Component } from 'react'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import Sitemap from './components/sitemap'
import state from './state'

export default class App extends Component {
  constructor() {
    super()
    this.state = state.get()
  }

  componentDidMount() {
    state.on('update', state => this.setState(state))
  }

  render() {
    const sitemap = this.state.resources[this.state.resources.sitemap]
    const document = this.state.resources[this.state.resources.current]

    return (
      <div className='ct-app'>
        <Tooltip
          class='ct-error-tooltip'
          effect='solid'
          multiline
          place='bottom'
          type='error' />
        <ErrorMessage requestError={this.state.error} documentErrors={document ? document.errors : null} />
        <ActivityIndicator requests={this.state.requests} />
        <Sitemap resource={sitemap} />
        <Document resource={document} config={this.props} />
      </div>
    )
  }
}
