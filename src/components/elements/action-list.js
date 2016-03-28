import ChildComponent from '../child-component'
import { executeAction, submit } from '../../api'

export default class ActionList extends ChildComponent {
  render() {
    const { links } = this.props
    return (
      <div className='ct-action-list'>
        {links.actions.map(action => {
          return (
            <button
              className='ct-action'
              key={action.href}
              onClick={() => this.context::executeAction(action.href)}>
              {action.title}
            </button>
          )
        })}
        {links.submit && (
          <button
            className='ct-action'
            key={links.submit.href}
            onClick={() => this.context::submit(links.submit.href)}>
            {links.submit.title}
          </button>
          )
        }
      </div>
    )
  }
}
