import React, { Component } from 'react'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import { executeAction, update } from './api'
import state from './state'
import styles from './app.css'

export default class App extends Component {
  componentDidMount() {
    state.on('update', () => this.forceUpdate())
  }

  render() {
    const {
      error,
      requests,
      resources,
    } = state.get()

    return (
      <div className={`${styles.app} ct-app`}>
        <Tooltip
          class={`${styles.errorTooltip} ct-error-tooltip`}
          effect='solid'
          multiline
          place='bottom'
          type='error' />
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
