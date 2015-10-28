import React from 'react'
import StyleSheet from 'stilr'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import factory from './elements/factory'

export default ({executeAction, resource, update}) => {
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
          actions={resource.links.actions}
          executeAction={executeAction} />
      </div>
      <Element property={resource} update={update} />
      <JsonDebugger resource={resource} />
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingBottom: 30,
  },

  header: {
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    display: 'flex',
    marginBottom: 30,
    padding: '10px 0 20px',
  },

  headerText: {
    flex: 1,
    fontSize: 30,
    fontWeight: 100,
    margin: '5px 0',
  },
})
