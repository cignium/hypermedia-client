import factory from '../factory'
import cx from 'classnames'
import Header from './header'
import Body from './body'

export default ({ api, property }) => (
  <div className='ct-table-container'>
    <label className='ct-element-label ct-table-label'>{property.title}</label>
    <table className='ct-table'>
      <Header api={api} property={property} />
      <Body api={api} property={property} />
    </table>
  </div>
)
