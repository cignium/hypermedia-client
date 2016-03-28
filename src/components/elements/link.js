import ChildComponent from '../child-component'
import { navigate } from '../../api'
import cx from 'classnames'

export default class Link extends ChildComponent {
  render() {
    const { className, property } = this.props

    return (
      <a
        className={cx(className, 'ct-link', {
          'ct-visited' : property.links.navigate.visited,
          'ct-current' : property.links.navigate.current})}
        data-tip={property.errors}
        target={property.links.navigate.target}
        id={property.id}
        href={property.links.navigate.href}
        onClick={e => {
          if (!e.metaKey &&
          !e.ctrlKey &&
          !property.links.navigate.target) {
            this.context::navigate(property.links.navigate.href)
            e.preventDefault()
          }
        }}>
        {property.content || property.value || property.title}
      </a>
    )
  }
}
