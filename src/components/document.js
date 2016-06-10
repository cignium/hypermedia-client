import { Component } from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

function getHref(resource) {
  return resource && resource.links.self && resource.links.self.href
}

export default class Document extends Component {
  componentDidUpdate(previousProps, previousState) {
    const previous = getHref(previousProps.resource)
    const current = getHref(this.props.resource)
    if (previous !== current) {
      if (this.props.config.scrollToTop) {
        React.findDOMNode(this).scrollIntoView()
      }

      if (this.props.config.onUrlChange) {
        const formName = this.props.resource.name
        this.props.config.onUrlChange(current, formName)
      }
    }
  }

  render() {
    const { api, config, resource } = this.props

    if (!resource) {
      return <div />
    }

    const Element = factory(resource)
    const actions = <ActionList api={api} config={config} links={resource.links} />

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
        <Element api={api} config={config} property={resource} topLevel />
        {footer}
        {config.debug ? <JsonDebugger resource={resource} /> : null}
      </div>
    )
  }
}
