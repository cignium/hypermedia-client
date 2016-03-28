import { Component, PropTypes } from 'react'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import Sitemap from './components/sitemap'

export default class App extends Component {
  static childContextTypes = {
    state: PropTypes.object,
    options: PropTypes.object,
  };

  getChildContext() {
    return {
      state: this.props.state,
      options: this.props.options,
    }
  }

  constructor({ state }) {
    super()
    this.state = state.get()
  }

  componentDidMount() {
    this.props.state.on('update', state => this.setState(state))
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
        <Document resource={document} />
      </div>
    )
  }
}
