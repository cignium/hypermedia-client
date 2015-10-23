import React from 'react'
import styles from './activity-indicator.css'

export default ({requests}) => {
  if (!Object.keys(requests).length) {
    return <div />
  }

  return (
    <div className={`${styles.activityIndicator} ct-activity-indicator2`}>
      loading...
    </div>
  )
}
