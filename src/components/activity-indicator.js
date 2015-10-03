import React from 'react'

export default ({requests}) => {
  if (!Object.keys(requests).length) {
    return <div />
  }

  return (
    <div className='ct-activity-indicator'>
      loading...
    </div>
  )
}
