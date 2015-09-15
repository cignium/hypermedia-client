import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { executeAction, navigate, update } from './actions'
import ActivityIndicator from './components/activity-indicator'
import Document from './components/document'
import ErrorMessage from './components/error-message'

class App extends Component {
  static get propTypes() {
    return {
      current: PropTypes.object,
      error: PropTypes.object,
      executeAction: PropTypes.func.isRequired,
      initialHref: PropTypes.string.isRequired,
      navigate: PropTypes.func.isRequired,
      requests: PropTypes.object,
      resources: PropTypes.object,
      update: PropTypes.func,
    }
  }

  componentDidMount() {
    this.props.navigate(this.props.initialHref)
  }

  render() {
    return (
      <div className='ct-app'>
        <ErrorMessage error={this.props.error} />
        <ActivityIndicator requests={this.props.requests} />
        <Document
          executeAction={this.props.executeAction}
          resource={this.props.current}
          update={this.props.update} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      current: state.resources[state.resources.current],
      error: state.error,
      requests: state.requests,
      resources: state.resources,
    }
  },
  (dispatch) => {
    return {
      executeAction: (href) => dispatch(executeAction(href)),
      navigate: (href) => dispatch(navigate(href)),
      update: (href, id, value) => dispatch(update(href, id, value)),
    }
  }
)(App)
