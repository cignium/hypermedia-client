import { Component } from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

function getHref(resource) {
  return resource && resource.links.self && resource.links.self.href
}

export default class Document extends Component {
  componentDidUpdate(prevProps, prevState) {
    const prev = getHref(prevProps.resource)
    const curr = getHref(this.props.resource)
    if (prev !== curr) {
      this.props.config.onUrlChange(curr)
    }
  }

  render() {
    const { resource, config } = this.props
    if (!resource) {
      return <div />
    }

    const Element = factory(resource)

    return (
      <div className='ct-document'>
        <div className='ct-document-header'>
          <div className='ct-document-header-text'>
            {resource.title}
          </div>
          <ActionList actions={resource.links.actions} />
        </div>
        <Element property={resource} config={config} topLevel />
        <JsonDebugger resource={resource} />
      </div>
    )
  }
}
