import factory from './elements/factory'

export default ({ instance, resource }) => {
  if (!resource) {
    return <div />
  }

  const Element = factory(resource)

  return (
    <div className='ct-sitemap'>
      <Element property={resource} instance={instance} />
    </div>
  )
}
