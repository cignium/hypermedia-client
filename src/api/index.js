import { request } from './http'
import Draft from './draft'
import factory from './factory'

const keys = {
  current: 'current',
  sitemap: 'sitemap',
}

function getAllLeafProperties(data) {
  const properties = []
  if (data.properties) {
    data.properties.forEach(p => {
      switch (p.type) {
        case 'html':
        case 'plain':
          break
        case 'array':
          p.items.forEach(i => Array.prototype.push.apply(properties, getAllLeafProperties(i)))
          break
        case 'object':
          Array.prototype.push.apply(properties, getAllLeafProperties(p))
          break
        default:
          properties.push(p)
          break
      }
    })
  }
  return properties
}

export default class Api {
  constructor(state, config) {
    this.requestCount = 0
    this.config = config
    this.draft = new Draft(state)
    this.state = state
    let loading = false

    state.on('update', ({ requests, resources, error }) => {
      if (resources.current) {
        this.allProperties = getAllLeafProperties(resources[resources.current])
      }

      if (requests.current) {
        if (requests[requests.current]) {
          return
        }
        else {
          state.get().requests.remove(keys.current)
        }
      }

      const wasLoading = loading
      loading = !!Object.keys(requests).length

      if (wasLoading != loading) {
        if (loading && config.onLoading) {
          config.onLoading()
        }
        if (!loading && config.onLoaded) {
          config.onLoaded()
        }
      }

      if (error && config.onError && !loading) {
        config.onError(error)
      }

      this.processRequestQueue()
    })
  }

  async updateResourceSitemap(resource) {
    if (!resource.links.sitemap) {
      this.state.get().resources.remove(keys.sitemap)

      return
    }

    const { href } = resource.links.sitemap

    if (this.state.get().resources[href]) {
      this.requestResource({
        href,
        method: 'get',
        resourceKey: keys.sitemap,
      })

      return
    }

    await this.requestResource({
      href,
      method: 'get',
      resourceKey: keys.sitemap,
    })
  }

  async processRequest({ data, href, id, method, resourceKey }) {
    try {
      const response = await request(method, href, data, this.config)

      if (this.config.onValueChange && data) {
        const propertyId = Object.keys(data)[0]
        const propertyName = this.allProperties.find(p => p.id === propertyId).name
        const resources = this.state.get().resources
        const formName = resources[resources.current].name
        this.config.onValueChange(formName, propertyName, data[propertyId])
      }

      if (response == null) {
        return
      }

      const resource = factory(response)
      this.draft.reload(href, resource)

      if (resourceKey != keys.sitemap) {
        await this.updateResourceSitemap(resource)
      }

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
      this.state.get().requests.set(keys.current, request.id)
      this.processRequest(request)
    }
  }

  requestResource(request) {
    this.state.get().set('error', null)
    const id = ('000000000000000' + this.requestCount++).substr(-16)
    this.state.get().requests.set(id, request)
  }

  executeAction(href) {
    this.requestResource({ href, method: 'post', resourceKey: keys.current })
  }

  navigate(href) {
    if (href === null) {
      this.state.get().resources.set(keys.current, null)
      return
    }

    this.requestResource({ href, method: 'get', resourceKey: keys.current })
  }

  submit(href) {
    const data = this.state.get().drafts[href]

    this.requestResource({
      data,
      href,
      method: 'post',
      resourceKey: keys.current,
    })
  }

  update(links, id, value) {
    if (links.update) {
      const href = links.update.href

      return this.requestResource({
        data: { [id]: value },
        href,
        method: 'post',
      })
    }
    else if (links.submit) {
      this.draft.update(links.submit.href, id, value)
      return
    }

    throw Error('Invalid operation, no update or submit link present')
  }

  deleteItem(links, item) {
    if (!links.deleteItems || links.deleteItems.length <= 0) {
      throw Error('Invalid operation, no delete-item link present')
    }

    const itemLink = links.deleteItems.find(link => link.item == item)
    if (!itemLink) {
      throw Error(`Invalid operation, no delete-item linkfound for item ${item}`)
    }
    const href = itemLink.href

    return this.requestResource({
      href,
      method: 'post',
    })
  }
}
