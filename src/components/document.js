import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'
import styles from './document.css'

export default ({ executeAction, navigate, resource, update, submit }) => {
  if (!resource) {
    return <div />
  }

  const Element = factory(resource)

  return (
    <div className={`${styles.root} ct-document`}>
      <div className={`${styles.header} ct-document-header`}>
        <div className={`${styles.headerText} ct-document-header-text`}>
          {resource.title}
        </div>
        <ActionList
          links={resource.links}
          executeAction={executeAction} 
          submit={submit} />
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
