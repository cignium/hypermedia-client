import { request } from './http'
import Draft from './draft'
import factory from './factory'

export default class Api {
  constructor(state, config) {
    this.config = config
    this.draft = new Draft(state)
    this.state = state

    state.on('update', ({ requests }) => {
      if (requests.current) {
        if (requests[requests.current]) {
          return
        }
        else {
          state.get().requests.remove('current')
        }
      }

      this.processRequestQueue()
    })
  }

  async loadSitemap(resource) {
    if (!resource.links.sitemap) {
      return
    }

    const { href } = resource.links.sitemap

    if (this.state.get().resources[href]) {
      this.requestResource({
        href,
        method: 'get',
        resourceKey: 'sitemap',
      })

      return
    }

    await this.requestResource({
      href,
      method: 'get',
      resourceKey: 'sitemap',
    })
  }

  async processRequest({ data, href, id, method, resourceKey, name }) {
    try {
      const response = await request(method, href, data, this.config)

      if (this.config.onValueChange && data) {
        this.config.onValueChange(name, data[Object.keys(data)[0]])
      }

      if (response == null) {
        return
      }

      const resource = factory(response)
      this.draft.reload(href, resource)
      await this.loadSitemap(resource)

      this.state.get().resources.set(resource.links.self.href, resource)

      if (resourceKey) {
        this.state.get().resources.set(resourceKey, resource.links.self.href)
      }
    }
    catch (e) {
      this.state.get().set('error', e)
      throw e
    }
    finally {
      this.state.get().requests.remove(id)
    }
  }

  getNextRequestFromQueue() {
    const { requests } = this.state.get()

    return Object.keys(requests).sort()
      .map(key => { return { ...requests[key], id: key }})[0]
  }

  processRequestQueue() {
    const request = this.getNextRequestFromQueue()

    if (request) {
      this.state.get().requests.set('current', request.id)
      this.processRequest(request)
    }
  }

  requestResource(request) {
    this.state.get().set('error', null)
    this.state.get().requests.set(new Date().getTime(), request)
  }

  executeAction(href) {
    this.requestResource({ href, method: 'post', resourceKey: 'current' })
  }

  navigate(href) {
    if (href === null) {
      this.state.get().resources.set('current', null)
      return
    }

    this.requestResource({ href, method: 'get', resourceKey: 'current' })
  }

  submit(href) {
    const data = this.state.get().drafts[href]

    this.requestResource({
      data,
      href,
      method: 'post',
      resourceKey: 'current',
    })
  }

  update(links, id, value, name) {
    if (links.update) {
      const href = links.update.href

      return this.requestResource({
        data: { [id]: value },
        href,
        method: 'post',
        name,
      })
    }
    else if (links.submit) {
      this.draft.update(links.submit.href, id, value)
      return
    }

    throw Error('Invalid operation, no update or submit link present')
  }
}
