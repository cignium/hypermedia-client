import StyleSheet from 'stilr'

export default ({ property }) => (
  <a
    className={`${styles.root} ct-link`}
    id={property.id}
    href={property.links.navigate.href}>
    {property.value}
  </a>
)

const styles = StyleSheet.create({
  root: {
    color: '#5DB0EA',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 300,
    padding: '5px 0',
    textDecoration: 'none',

    ':hover': {
      color: '#76BFF3',
      textDecoration: 'underline',
    },
  },
})
