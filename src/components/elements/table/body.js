import Row from './row'

export default ({ rows }) => {
  return (
    <tbody>
    {rows.map((row, rowIndex) => {
      return (<Row row={row} key={rowIndex} />)
    })}
  </tbody>)
}
