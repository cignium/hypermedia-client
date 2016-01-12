import factory from './elements/factory'

export default ({ executeAction, navigate, resource, update }) => {
  if (!resource) {
    return <div />
  }

  const Element = factory(resource)

  return (
    <div className={'ct-sitemap'}>
      <Element
        navigate={navigate}
        property={resource}
        update={update} />
    </div>
  )
}
