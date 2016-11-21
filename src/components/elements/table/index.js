import { Component } from 'react'
import factory from '../factory'
import Header from './header'
import Body from './body'

export default class Table extends Component {
  constructor(props) {
    super()

    this.state = {
      sortedRows: props.property.rows.slice(),
      currentColumnIndex: null,
      descending: false,
    }
  }

  render() {
    return (
      <div className='ct-table-container'>
        <label className='ct-element-label ct-table-label'>{this.props.property.title}</label>
        <table className='ct-table'>
          <Header
            api={this.props.api}
            descending={this.state.descending}
            sortedColumn={this.state.currentColumnIndex}
            columns={this.props.property.columns}
            sortBy={index => this.sortBy(index)} />
          <Body rows={this.state.sortedRows} />
        </table>
      </div>)
  }

  sortBy(columnIndex) {
    const rowsToSort = this.state.sortedRows
    let sorted = rowsToSort.sort((row1, row2) => {
      if (this.getRowValue(row1, columnIndex) > this.getRowValue(row2, columnIndex)) return 1
      if (this.getRowValue(row1, columnIndex) < this.getRowValue(row2, columnIndex)) return -1
      return 0
    })

    if (this.state.currentColumnIndex == columnIndex && !this.state.descending) {
      sorted = sorted.reverse()
    }

    this.setState({
      sortedRows: sorted,
      descending: this.state.currentColumnIndex == columnIndex ? !this.state.descending : false,
      currentColumnIndex: columnIndex,
    })
  }

  getRowValue(row, columnIndex) {
    if (row[columnIndex].type == 'html') {
      const doc = document.implementation.createHTMLDocument('')
      doc.documentElement.innerHTML = row[columnIndex].content

      return doc.getElementsByTagName('body')[0].innerText
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

    return row[columnIndex].value
  }
}

