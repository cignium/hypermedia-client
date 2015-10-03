import React from 'react'
import ActionList from './elements/action-list'
import JsonDebugger from './json-debugger'
import Section from './elements/section'

export default ({executeAction, resource, update}) => {
  if (!resource) {
    return <div />
  }

  return (
    <div className='ct-document'>
      <div className='ct-document-header'>
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
