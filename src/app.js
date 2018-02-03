import { Component } from 'react'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import Sitemap from './components/sitemap'

export default class App extends Component {
  constructor(props) {
    super( )
    this.state = props.state.get()
  }

  componentDidMount() {
    this.props.state.on('update', state => this.setState(state))
  }

  render() {
    const sitemap = this.state.resources[this.state.resources.sitemap]
    const document = this.state.resources[this.state.resources.current]

    Tooltip.rebuild()

    return (
      <div className='ct-app'>
        <Tooltip
          class='ct-error-tooltip'
          effect='solid'
          multiline
          place='top'
          type='error' />
        <ErrorMessage
          documentErrors={document ? document.errors : null}
          requestError={this.state.error} />
        <ActivityIndicator requests={this.state.requests} />
        <Sitemap api={this.props.api} resource={sitemap} />
        <Document
          api={this.props.api}
          config={this.props.config}
          resource={document}
          requests={this.state.requests} />
      </div>
    )
  }
}
