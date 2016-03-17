import { Component } from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

function getHref(resource) {
  return resource && resource.links.self && resource.links.self.href
}

export default class Document extends Component {
  componentDidUpdate(previousProps, previousState) {
    if (this.props.instance.options.onUrlChange) {
      const previous = getHref(previousProps.resource)
      const current = getHref(this.props.resource)
      if (previous !== current) {
        const formName = this.props.resource.name
        this.props.instance.options.onUrlChange(current, formName)
      }
    }
  }

  render() {
    const { resource, instance } = this.props
    if (!resource) {
      return <div />
    }

    const Element = factory(resource)
    const actions = <ActionList links={resource.links} instance={instance} />
    const footer = instance.options.actionListPosition !== 'top' && (
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
          {instance.options.actionListPosition !== 'bottom' && actions}
        </div>
        <Element property={resource} instance={instance} topLevel />
        {footer}
        {instance.options.debug && <JsonDebugger resource={resource} />}
      </div>
    )
  }
}
