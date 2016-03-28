import { request } from './http'
import factory from './factory'
import draft from './draft'

async function loadSitemap(resource) {
  if (!resource.links.sitemap) {
    return
  }

  const state = this.state
  const { href } = resource.links.sitemap

  if (state.get().resources[href]) {
    this::requestResource({ href, method: 'get', resourceKey: 'sitemap' })
    return
  }

  await this::requestResource({ href, method: 'get', resourceKey: 'sitemap' })
}

async function processRequest({ data, href, id, method, resourceKey }) {
  const state = this.state
  try {
    const response = await this::request(method, href, data)

    if (this.options.onValueChange && data) {
      const propertyId = Object.keys(data)[0]
      const propertyName = this.allProperties.find(p => p.id === propertyId).name
      const resources = state.get().resources
      const formName = resources[resources.current].name
      this.options.onValueChange(formName, propertyName, data[propertyId])
    }

    if (response == null) {
      return
    }

    const resource = factory(response)

    this::draft.reload(href, resource)
    await this::loadSitemap(resource)

    state.get().resources.set(resource.links.self.href, resource)

    if (resourceKey) {
      state.get().resources.set(resourceKey, resource.links.self.href)
    }
  }
  catch (e) {
    state.get().set('error', e)
    throw e
  }
  finally {
    state.get().requests.remove(id)
  }
}

function getNextRequestFromQueue() {
  const { requests } = this.state.get()

  return Object.keys(requests).sort()
    .map(key => { return { ...requests[key], id: key }})[0]
}

export function processRequestQueue() {
  const request = this::getNextRequestFromQueue()

  if (request) {
    this.state.get().requests.set('current', request.id)
    this::processRequest(request)
  }
}

function requestResource(request) {
  this.state.get().set('error', null)
  this.state.get().requests.set(new Date().getTime(), request)
}

export function executeAction(href) {
  this::requestResource({ href, method: 'post', resourceKey: 'current' })
}

export function navigate(href) {
  if (href === null) {
    this.state.get().resources.set('current', null)
    return
  }

  this::requestResource({ href, method: 'get', resourceKey: 'current' })
}

export function update(links, id, value) {
  if (links.update) {
    const href = links.update.href
    return this::requestResource({
      data: { [id]: value },
      href,
      method: 'post',
    })
  }
  else if (links.submit) {
    this::draft.update(links.submit.href, id, value)
    return
  }

  throw Error('Invalid operation, no update or submit link present')
}

export function submit(href) {
  const data = this.state.get().drafts[href]
  this::requestResource({
    data,
    href,
    method: 'post',
    resourceKey: 'current',
  })
}
