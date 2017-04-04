import { Component } from 'react'
import factory from '../factory'
import Header from './header'
import Body from './body'

export default class Table extends Component {
  constructor(props) {
    super()

    this.state = {
      currentColumnIndex: null,
      descending: false,
    }
  }

  render() {
    const sortedRows = this.getSortedRows()
    return (
      <div className='ct-table-container'>
        <label className='ct-element-label ct-table-label'>{this.props.property.title}</label>
        <table className='ct-table'>
          <Header
            descending={this.state.descending}
            sortedColumn={this.state.currentColumnIndex}
            columns={this.props.property.columns}
            sortBy={index => this.setSortingState(index)} />
          <Body rows={sortedRows} />
        </table>
      </div>)
  }

  setSortingState(columnIndex) {
    this.setState({
      descending: this.state.currentColumnIndex == columnIndex ? !this.state.descending : false,
      currentColumnIndex: columnIndex,
    })
  }

  getSortedRows() {
    const columnIndex = this.state.currentColumnIndex
    const rowsToSort = this.props.property.rows.slice()

    if (columnIndex == null || columnIndex == undefined) {
      return rowsToSort
    }

    const sorted = rowsToSort.sort((row1, row2) => {
      if (this.getRowValue(row1, columnIndex) > this.getRowValue(row2, columnIndex)) return 1
      if (this.getRowValue(row1, columnIndex) < this.getRowValue(row2, columnIndex)) return -1
      return 0
    })

    if (this.state.descending) {
      return sorted
    }

    return sorted.reverse()
  }

  getRowValue(row, columnIndex) {
    if (row[columnIndex].type == 'html') {
      const regex = /(<([^>]+)>)/ig
      return row[columnIndex].content.replace(regex, '')
    }

    if (row[columnIndex].type == 'number') {
      return parseFloat(row[columnIndex].value)
    }

    if (row[columnIndex].type == 'date' || row[columnIndex].type == 'datetime') {
      return new Date(row[columnIndex].value)
    }

    if (row[columnIndex].type == 'boolean') {
      return row[columnIndex].value.toLowerCase() === 'true'
    }

    return row[columnIndex].value && row[columnIndex].value.toLowerCase()
  }
}
