import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

export default ({ resource }) => {
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
        <ActionList links={resource.links} />
      </div>
      <Element property={resource} topLevel />
      <JsonDebugger resource={resource} />
    </div>
  )
}
