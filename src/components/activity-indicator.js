import styles from './activity-indicator.css'

export default ({ requests }) => {
  if (!Object.keys(requests).length) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-activity-indicator`}>
      loading...
    </div>
  )
}
