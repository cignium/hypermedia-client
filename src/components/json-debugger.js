import styles from './json-debugger.css'

export default ({ resource }) => {
  let className = `${styles.root} ct-json-debugger`

  if (process.env.NODE_ENV == 'production') {
    className += ` ${styles.hide}`
  }

  return (
    <pre className={`${className}`}>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}
