import styles from './action-list.css'

export default ({ links, executeAction, submit }) => (
  <div className='ct-action-list'>
    {links.actions.map(action => {
      return (
        <button
          className={`${styles.action} ct-action`}
          key={action.href}
          onClick={() => executeAction(action.href)}>
          {action.title}
        </button>
      )
    })}
    {links.submit ? (
      <button
        className={`${styles.action} ct-action`}
        key={links.submit.href}
        onClick={() => submit(links.submit.href)}>
        {links.submit.title}
      </button>
      )
      : undefined
    }
  </div>
)
