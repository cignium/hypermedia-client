import styles from './link.css'

export default ({ property }) => (
  <a
    className={`${styles.root} ct-link`}
    id={property.id}
    href={property.links.navigate.href}>
    {property.value}
  </a>
)
