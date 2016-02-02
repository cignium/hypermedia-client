import { navigate } from '../../api'
import cx from 'classnames'

export default ({ className, property }) => (
  <a
    className={cx(className, 'ct-link', {
      'ct-visited' : property.links.navigate.visited, 
      'ct-current' : property.links.navigate.current})}
    data-tip={property.errors}
    id={property.id}
    href={property.links.navigate.href}
    onClick={e => {
      if (!e.metaKey) {
        navigate(property.links.navigate.href)
        e.preventDefault()
      }
    }}>
    {property.content || property.value}
  </a>
)
