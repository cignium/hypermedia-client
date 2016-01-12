import styles from './link.css'

export default ({ className, property }) => (
  <a
    className={`${className} ${styles.root} ct-link`}
    id={property.id}
    href={property.links.navigate.href}>
    {property.value}
  </a>
)
