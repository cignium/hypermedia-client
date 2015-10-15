import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import { executeAction, update } from './api'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import State from './state'

export default class App extends Component {
  componentDidMount() {
    State.on('update', () => this.forceUpdate())
  }

  render() {
    const {
      error,
      requests,
      resources,
    } = State.get()

    return (
      <div className='ct-app'>
        <Tooltip effect='solid' place='bottom' type='error' />
        <ErrorMessage error={error} />
        <ActivityIndicator requests={requests} />
        <Document
          executeAction={executeAction}
          resource={resources[resources.current]}
          update={update} />
      </div>
    )
  }
}
