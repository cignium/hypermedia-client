import React from 'react'

const pre = {
  background: '#eee',
  position: 'fixed',
  opacity: 0.9,
  overflow: 'auto',
  padding: 10,
  right: 0,
  top: 0,
  zIndex: 1000000,
  width: 1000,
}

export default ({resource}) => {
  return (
    <pre className='ct-json-debugger' style={pre}>
      {JSON.stringify(resource.getData(), null, 2)}
    </pre>
  )
}
