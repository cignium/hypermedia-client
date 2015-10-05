export default class Links {
  constructor(links, parentLinks) {
    this.actions = links.filter(link => link.rel == 'action')
    this.navigate = links.filter(link => link.rel == 'navigate')[0]
    this.self = links.filter(link => link.rel == 'self')[0]
    this.update = links.filter(link => link.rel == 'update')[0]

    if (!this.update && parentLinks) {
      this.update = parentLinks.update
    }
  }
}
