import React from 'react'
import StyleSheet from 'stilr'

export default ({actions, executeAction}) => {
  if (!actions.length) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-action-list`}>
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

const styles = StyleSheet.create({
  root: {
    flex: 'none',
  },

  action: {
    background: '#76BFF3',
    border: 'solid 1px #5DB0EA',
    borderRadius: 3,
    color: 'white',
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 500,
    padding: '10px 20px',

    ':hover': {
      background: '#81C8FB',
    },

    ':active': {
      background: '#5DB0EA',
    },
  },
})
