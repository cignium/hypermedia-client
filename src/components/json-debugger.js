import React from 'react'
import StyleSheet from 'stilr'

export default ({resource}) => {
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
    boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.1)',
    display: process.env.NODE_ENV == 'production' ? 'none' : 'block',
    margin: 0,
    opacity: 0.9,
    overflow: 'auto',
    padding: 10,
    position: 'fixed',
    right: 0,
    top: 55,
    width: 500,
    zIndex: 1000000,
  },
})
