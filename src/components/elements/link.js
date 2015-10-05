import React from 'react'

export default ({property}) => {
  return (
    <a
      className={'ct-link'}
      id={property.id}
      href={property.links.navigate.href}>
      {property.value}
    </a>
  )
}
