import React from 'react'
import { executeAction, update } from './api'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import State from './state'

export default class App extends React.Component {
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
