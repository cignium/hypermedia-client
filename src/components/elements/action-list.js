import { executeAction, submit } from '../../api'

export default ({ links, config }) => (
  <div className='ct-action-list'>
    {links.actions.map(action => {
      return (
        <button
          className='ct-action'
          key={action.href}
          onClick={() => executeAction(action.href, config)}>
          {action.title}
        </button>
      )
    })}
    {links.submit ? (
      <button
        className='ct-action'
        key={links.submit.href}
        onClick={() => submit(links.submit.href)}>
        {links.submit.title}
      </button>
      )
      : undefined
    }
  </div>
)
