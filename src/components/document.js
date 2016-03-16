import { Component } from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

function getHref(resource) {
  return resource && resource.links.self && resource.links.self.href
}

export default class Document extends Component {
  componentDidUpdate(previousProps, previousState) {
    if (this.props.config.onUrlChange) {
      const previous = getHref(previousProps.resource)
      const current = getHref(this.props.resource)
      if (previous !== current) {
        this.props.config.onUrlChange(current)
      }
    }
  }

  render() {
    const { resource, config } = this.props
    if (!resource) {
      return <div />
    }

    const Element = factory(resource)
    const actions = <ActionList links={resource.links} config={config} />
    const footer = config.actionListPosition !== 'top' && (
      <div className='ct-document-footer'>
        {actions}
      </div>
    )

    return (
      <div className='ct-document'>
        <div className='ct-document-header'>
          <div className='ct-document-header-text'>
            {resource.title}
          </div>
          {config.actionListPosition !== 'bottom' && actions}
        </div>
        <Element property={resource} config={config} topLevel />
        {footer}
        {config.debug && <JsonDebugger resource={resource} />}
      </div>
    )
  }
}
