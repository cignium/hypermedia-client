import React from 'react'

export default ({error}) => {
  if (!error) {
    return <div />
  }

  return (
    <div className='ct-error-message'>
      {error.message}
    </div>
  )
}
