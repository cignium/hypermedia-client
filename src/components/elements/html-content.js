export default ({ property }) => (
  <div
    className='ct-content'
    dangerouslySetInnerHTML={{ __html: property.content }}
    id={property.id} />
)
