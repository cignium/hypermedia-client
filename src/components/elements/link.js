import { navigate } from '../../api'
import cx from 'classnames'

export default ({ className, property }) => (
  <a
    className={cx(className, 'ct-link')}
    id={property.id}
    href={property.links.navigate.href}
    onClick={e => {
      if (!e.metaKey) {
        navigate(property.links.navigate.href)
        e.preventDefault()
      }
    }}>
    {property.value}
  </a>
)
