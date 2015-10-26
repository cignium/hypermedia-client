import React from 'react'
import styles from './link.css'

export default ({property}) => {
  return (
    <a
      className={`${styles.link} ct-link`}
      id={property.id}
      href={property.links.navigate.href}>
      {property.value}
    </a>
  )
}
