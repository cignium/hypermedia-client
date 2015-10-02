import React, { Component, PropTypes } from 'react'
import { executeAction, navigate, update } from './api'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import State from './state'

export default class App extends Component {
  componentDidMount() {
    State.on('update', () => this.forceUpdate())
    navigate(this.props.initialHref)
  }

  render() {
    const {
      current,
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
          resource={resources[current]}
          update={update} />
      </div>
    )
  }
}
