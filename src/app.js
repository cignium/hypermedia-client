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
      <div className={`${styles.root} ct-app`}>
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

  root: {
    alignSelf: 'center',
    background: 'white',
    border: 'solid 1px #eee',
    borderRadius: 5,
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    minHeight: 22,
    padding: '10px 30px',
    position: 'relative',
    width: 500,
  },
})
