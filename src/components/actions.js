import React, { Component, PropTypes } from 'react'

export default class Actions extends Component {
  static get propTypes() {
    return {
      actions: PropTypes.array.isRequired,
      executeAction: PropTypes.func.isRequired,
    }
  }

  render() {
    if (!this.props.actions.length) {
      return null
    }

    return (
      <div className='ct-actions'>
        {this.props.actions.map(action => {
          return (
            <button
              className='ct-action'
              key={action.href}
              onClick={() => this.props.executeAction(action.href)}>
              {action.title}
            </button>
          )
        })}
      </div>
    )
  }
}
