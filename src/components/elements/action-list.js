import ToggleButton from './toggle-button'

export default ({ api, config, links }) => (
  <div className='ct-action-list'>
    {links.actions.map(action => {
      return !config.actionListToggle ? (
        <button
          className='ct-action'
          key={action.href}
          onClick={() => api.executeAction(action.href, config)}>
          {action.title}
        </button>
      )
      : (
        <ToggleButton 
          api={api}
          action={action}
          config={config}
        />
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
