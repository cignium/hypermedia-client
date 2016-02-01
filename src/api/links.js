export default function(links, parentLinks) {
  let update = links.filter(link => link.rel == 'update')[0]

  if (!update) {
    update = parentLinks && parentLinks.update
  }

  return {
    actions: links.filter(link => link.rel == 'action'),
    navigate: links.find(link => link.rel == 'navigate'),
    parent: links.filter(link => link.rel == 'parent')[0],
    self: links.filter(link => link.rel == 'self')[0],
    sitemap: links.find(link => link.rel == 'sitemap'),
    update,
  }
}
