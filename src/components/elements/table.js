import factory from './factory'
import cx from 'classnames'

export default ({ api, property }) => {
  return (
    <div className='ct-table-container'>
        <table className='ct-table'>
        <caption className='ct-table-caption'>{property.title}</caption>
        { property.columns ?
        <thead>
            <tr className='ct-table-header-row'>
          { property.columns.map((column, rowIndex) => {
            return (
              <th key={column.id} className='ct-table-header'>
                {column.title}
              </th>
              )
          })
          }
            </tr>
          </thead>
          : null }
          <tbody>
          {property.rows.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className='ct-table-row'>
                  {row.map(cell => {
                    const Element = factory(cell)
                    return (
                      <td key={cell.id} className='ct-table-cell'>
                        <Element
                          api={api}
                          readOnly={cell.readOnly}
                          className={cx('ct-table-element', {
                            'ct-invalid': cell.errors && cell.errors.length,
                          }) }
                          errors={cell.errors}
                          property={cell} />
                      </td>
                    )
                  }) }
              </tr>)
          })
          }
            </tbody>
          </table>
  </div>
)}
