import cx from 'classnames'

export default ({ resource }) => {
  return (
    <pre className={cx(
      'ct-json-debugger', 
      {'hide': process.env.NODE_ENV == 'production'})}>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}
