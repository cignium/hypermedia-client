import React from 'react'
import StyleSheet from 'stilr'

export default ({ property }) => {
  return (
    <a
      className={`${styles.link} ct-link`}
      id={property.id}
      href={property.links.navigate.href}>
      {property.value}
    </a>
  )
}

const styles = StyleSheet.create({
  root: {
    color: '#5DB0EA',
    flex: 1,
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
