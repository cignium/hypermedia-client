import React from 'react'

export default ({actions, executeAction}) => {
  if (!actions.length) {
    return <div />
  }

  return (
    <div className='ct-action-list'>
      {actions.map(action => {
        return (
          <button
            className='ct-action'
            key={action.href}
            onClick={() => executeAction(action.href)}>
            {action.title}
          </button>
        )
      })}
    </div>
  )
}
