import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

export default ({ executeAction, navigate, resource, update }) => {
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
        <ActionList
          actions={resource.links.actions}
          executeAction={executeAction} />
      </div>
      <Element
        navigate={navigate}
        property={resource}
        topLevel
        update={update} />
      <JsonDebugger resource={resource} />
    </div>
  )
}
