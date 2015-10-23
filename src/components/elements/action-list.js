import React from 'react'
import styles from './action-list.css'

export default ({actions, executeAction}) => {
  if (!actions.length) {
    return <div />
  }

  return (
    <div className={`${styles.actionList} ct-action-list`}>
      {actions.map(action => {
        return (
          <button
            className={`${styles.action} ct-action`}
            key={action.href}
            onClick={() => executeAction(action.href)}>
            {action.title}
          </button>
        )
      })}
    </div>
  )
}
