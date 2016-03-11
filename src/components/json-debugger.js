export default ({ resource }) => {
  return (
    <pre className='ct-json-debugger'>
      {JSON.stringify(resource.data, null, 2)}
    </pre>
  )
}
