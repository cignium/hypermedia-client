import Links from './links'

export default class Property {
  constructor(data, parent) {
    this.links = new Links(data.links, parent && parent.links)
    this.errors = data.errors
    this.id = data.id || this.links.self.href
    this.title = data.title
    this.type = data.type
  }
}
