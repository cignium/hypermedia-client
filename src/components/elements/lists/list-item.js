import React from 'react'
import StyleSheet from 'stilr'

export default ({ item, navigate }) => {
  const { href, title } = item.links.self

  return (
    <a
      className={`${styles.root} ct-list-item`}
      href={href}
      onClick={e => {
        navigate(href)
        e.preventDefault()
      }}>
      {title}
    </a>
  )
}

const styles = StyleSheet.create({
  root: {
    color: 'red',
    display: 'block',
  },
})
