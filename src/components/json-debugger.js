import React from 'react'
import styles from './json-debugger.css'

const style = {
  display: process.env.NODE_ENV == 'production' ? 'none' : 'block',
}

export default ({resource}) => {
  return (
    <pre className={`${styles.jsonDebugger} ct-json-debugger`} style={style}>
      {JSON.stringify(resource.getData(), null, 2)}
    </pre>
  )
}
