import styles from './json-debugger.css'

export default ({ resource }) => {
  return (
    <pre className={`${styles.root} ct-json-debugger`}>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}
