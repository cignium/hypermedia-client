import { Component } from 'react'
import cx from 'classnames'

export default class Header extends Component {
  constructor(props) {
    super()

    this.state = {
      sortedColumn: null,
      direction: null,
    }
  }

  render() {
    if (!this.props.columns) {
      return <thead />
    }
    return (
      <thead>
        <tr className='ct-table-header-row'>
          {this.props.columns.map((column, columnIndex) => {
            return (
              <th
                onClick={e => this.onSort(e, columnIndex) }
                key={column.id}
                className='ct-table-header'>
                <a href='#'
                  className={'ct-table-header-sort-link'}>
                  {column.title}</a>
                <span className={cx('ct-table-header-sort-direction', {
                  'ct-table-header-sort-ascending': this.state.sortedColumn == columnIndex &&
                    !this.state.direction,
                  'ct-table-header-sort-descending': this.state.sortedColumn == columnIndex &&
                    this.state.direction})}>
                </span>
              </th>
            )
          })
          }
        </tr>
      </thead>
    )
  }

  onSort(e, columnIndex) {
    e.preventDefault()
    this.setState({
      sortedColumn: columnIndex,
      direction: this.state.sortedColumn == columnIndex ? !this.state.direction : null,
    })
    this.props.sortBy(columnIndex)
  }
}
