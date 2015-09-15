import React, { Component, PropTypes } from 'react'

export default class ErrorMessage extends Component {
  static get propTypes() {
    return {
      error: PropTypes.object,
    }
  }

  render() {
    if (!this.props.error) {
      return null
    }

    return (
      <div className='ct-error-message'>
        {this.props.error.message}
      </div>
    )
  }
}
