import React, { Component, PropTypes } from 'react'

export default class ActivityIndicator extends Component {
  static get propTypes() {
    return {
      requests: PropTypes.object,
    }
  }

  render() {
    if (!Object.keys(this.props.requests).length) {
      return null
    }

    return (
      <div className='ct-activity-indicator'>
        loading...
      </div>
    )
  }
}
