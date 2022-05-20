import createLinks from './links'

export default function(data, parent) {
  const links = createLinks(data.links, parent && parent.links)

  const property = {
    errors: data.errors,
    links,
    id: data.id || links.self.href,
    name: data.name,
    order: data.order,
    title: data.title,
    type: data.type,
  }

  if (data.active !== undefined) {
    property.active = data.active
  }

  return property
}
