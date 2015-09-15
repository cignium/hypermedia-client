import React, { Component, PropTypes } from 'react'
import Actions from './actions'
import Fields from './fields'
import JsonDebugger from './json-debugger'

export default class Document extends Component {
  static get propTypes() {
    return {
      executeAction: PropTypes.func.isRequired,
      resource: PropTypes.object,
      update: PropTypes.func,
    }
  }

  render() {
    const resource = this.props.resource

    if (!resource) {
      return null
    }

    return (
      <div className='ct-document'>
        <div className='ct-document-header'>
          <h1>{resource.title}</h1>
          <Actions
            actions={resource.links.actions}
            executeAction={this.props.executeAction} />
        </div>
        <Fields properties={resource.properties} update={this.props.update} />
        <JsonDebugger resource={resource} />
      </div>
    )
  }
}
