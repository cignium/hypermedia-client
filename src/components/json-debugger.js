export default ({ resource }) => {
  let className = 'ct-json-debugger'

  if (process.env.NODE_ENV == 'production') {
    className += ' hide'
  }

  return (
    <pre className={className}>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}
