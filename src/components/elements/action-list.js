export default ({ api, config, links }) => (
  <div className='ct-action-list'>
    {links.actions.map(action => {
      return (
        <button
          className='ct-action'
          key={action.href}
          onClick={() => api.executeAction(action.href, config)}>
          {action.title}
        </button>
      )
    })}
    {links.submit ? (
      <button
        className='ct-action'
        key={links.submit.href}
        onClick={() => api.submit(links.submit.href)}>
        {links.submit.title}
      </button>
      )
      : undefined
    }
  </div>
)
