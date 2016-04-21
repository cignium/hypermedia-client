import factory from './elements/factory'

export default ({ api, resource }) => {
  if (!resource) {
    return <div />
  }

  const Element = factory(resource)

  return (
    <div className='ct-sitemap'>
      <Element api={api} property={resource} />
    </div>
  )
}
