import Row from './row'

export default ({ api, property }) => {
  return (
    <tbody>
    {property.rows.map((row, rowIndex) => {
      return (<Row row={row} key={rowIndex} />)
    })}
  </tbody>)
}
