import createProperty from './property'
import factory from './factory'

export default function(data, parent) {
  const table = { ...createProperty(data, parent), data }
  table.rows = data.rows.map(row => row.map(cell => factory(cell, table)))
  table.columns = data.columns ? data.columns.map(column => factory(column, table)) : null

  return table
}
