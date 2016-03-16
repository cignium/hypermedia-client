import factory from './elements/factory'

export default ({ config, resource }) => {
  if (!resource) {
    return <div />
  }

  const Element = factory(resource)

  return (
    <div className='ct-sitemap'>
      <Element property={resource} config={config} />
    </div>
  )
}
