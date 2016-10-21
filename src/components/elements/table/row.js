import factory from '../factory'
import cx from 'classnames'

export default ({ api, row }) => (
  <tr className='ct-table-row'>
    {row.map(cell => {
      const Element = factory(cell)
      return (
        <td key={cell.id} className='ct-table-cell'>
          <Element
            api={api}
            readOnly={cell.readOnly}
            className={cx('ct-table-element', {
              'ct-invalid': cell.errors && cell.errors.length,
            })}
            errors={cell.errors}
            property={cell} />
        </td>
      )
    })}
  </tr>
)
