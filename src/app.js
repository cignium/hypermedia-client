import React, { Component } from 'react'
import StyleSheet from 'stilr'
import Tooltip from 'react-tooltip'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'
import { executeAction, update } from './api'
import state from './state'

export default class App extends Component {
  componentDidMount() {
    state.on('update', () => this.forceUpdate())
  }

  render() {
    document.getElementById('ct-styles').textContent = StyleSheet.render()

    const {
      error,
      requests,
      resources,
    } = state.get()

    return (
      <div className='ct-app'>
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

const styles = StyleSheet.create({
  errorTooltip: {
    backgroundColor: '#CC0302 !important',

    ':after': {
      borderBottomColor: '#CC0302 !important',
    },
  },
})
