import React from 'react'
import StyleSheet from 'stilr'

export default ({ resource }) => {
  return (
    <pre className={`${styles.root} ct-json-debugger`}>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}

const styles = StyleSheet.create({
  root: {
    background: '#eee',
    bottom: 0,
    display: process.env.NODE_ENV == 'production' ? 'none' : 'block',
    margin: 0,
    opacity: 0.9,
    overflow: 'auto',
    padding: 10,
    position: 'fixed',
    right: 0,
    top: 0,
    width: 500,
    zIndex: 1000000,
  },
})
