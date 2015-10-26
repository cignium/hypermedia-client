import React from 'react'
import styles from './error-message.css'

export default ({error}) => {
  if (!error) {
    return <div />
  }

  return (
    <div className={`${styles.errorMessage} ct-error-message`}>
      {error.message}
    </div>
  )
}
