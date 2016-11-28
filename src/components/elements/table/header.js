import { Component } from 'react'
import cx from 'classnames'

export default ({ columns, sortedColumn, descending, sortBy }) => {
  if (!columns) {
    return <thead />
  }
  return (
    <thead>
      <tr className='ct-table-header-row'>
        {columns.map((column, columnIndex) =>
          <th
            onClick={e => {
              e.preventDefault()
              sortBy(columnIndex)
            }}
            key={column.id}
            className='ct-table-header'>
            <a href='#'
              className={'ct-table-header-sort-link'}>
              {column.title}</a>
            <span className={cx('ct-table-header-sort-direction', {
              'ct-table-header-sort-ascending': sortedColumn == columnIndex &&
              !descending,
              'ct-table-header-sort-descending': sortedColumn == columnIndex &&
              descending,
            })}>
            </span>
          </th>
          )
        }
      </tr>
    </thead>
  )
}
