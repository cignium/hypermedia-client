import React from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import Section from './elements/section'
import styles from './document.css'

export default ({executeAction, resource, update}) => {
  if (!resource) {
    return <div />
  }

  return (
    <div className={`${styles.document} ct-document`}>
      <div className={`${styles.header} ct-document-header`}>
        <h1>{resource.title}</h1>
        <ActionList
          actions={resource.links.actions}
          executeAction={executeAction} />
      </div>
      <Section property={resource} update={update} />
      <JsonDebugger resource={resource} />
    </div>
  )
}
