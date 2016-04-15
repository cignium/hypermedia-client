import ChildComponent from './child-component'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

function getHref(resource) {
  return resource && resource.links.self && resource.links.self.href
}

export default class Document extends ChildComponent {
  componentDidUpdate(previousProps, previousState) {
    if (this.context.options.onUrlChange) {
      const previous = getHref(previousProps.resource)
      const current = getHref(this.props.resource)
      if (previous !== current) {
        const formName = this.props.resource.name
        this.context.options.onUrlChange(current, formName)
      }
    }
  }

  render() {
    const { resource } = this.props
    const { options } = this.context
    if (!resource) {
      return <div />
    }

    const Element = factory(resource)
    const actions = <ActionList links={resource.links} />
    const footer = options.actionListPosition !== 'top' && (
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
          {options.actionListPosition !== 'bottom' && actions}
        </div>
        <Element property={resource} topLevel />
        {footer}
        {options.debug && <JsonDebugger resource={resource} />}
      </div>
    )
  }
}
