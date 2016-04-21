import cx from 'classnames'

export default ({ api, className, property }) => (
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
        api.navigate(property.links.navigate.href)
        e.preventDefault()
      }
    }}>
    {property.content || property.value || property.title}
  </a>
)
