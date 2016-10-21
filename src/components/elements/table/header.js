import cx from 'classnames'

export default ({ api, property }) => {
  if (!property.columns) {
    return <thead/>
  }
  return (
    <thead>
      <tr className='ct-table-header-row'>
        {property.columns.map((column, rowIndex) => {
          return (
            <th key={column.id} className='ct-table-header'>
              {column.title}
            </th>
          )
        })
        }
      </tr>
    </thead>
  )
}
