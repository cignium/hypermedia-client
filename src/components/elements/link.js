export default ({ className, property }) => (
  <a
    className={`${className} ct-link`}
    id={property.id}
    href={property.links.navigate.href}>
    {property.value}
  </a>
)
