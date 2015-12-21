import styles from './error-message.css'

export default ({ error }) => {
  if (!error) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-error-message`}>
      {error.message}
    </div>
  )
}
