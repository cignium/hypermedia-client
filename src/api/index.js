import { request } from './http'
import factory from './factory'
import draft from './draft'

async function loadSitemap({ config, resource }) {
  if (!resource.links.sitemap) {
    return
  }

  const state = config.state
  const { href } = resource.links.sitemap

  if (state.get().resources[href]) {
    requestResource({ config, href, method: 'get', resourceKey: 'sitemap' })
    return
  }

  await requestResource({ config, href, method: 'get', resourceKey: 'sitemap' })
}

async function processRequest({ config, data, href, id, method, resourceKey, name }) {
  const state = config.state
  try {
    const response = await request(method, href, data, config)

    if (config && config.onValueChange && data) {
      config.onValueChange(name, data[Object.keys(data)[0]])
    }

    if (response == null) {
      return
    }

    const resource = factory(response)

    draft.reload(state, href, resource)
    await loadSitemap({ config, resource })

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

function getNextRequestFromQueue(config) {
  const { requests } = config.state.get()

  return Object.keys(requests).sort()
    .map(key => { return { ...requests[key], id: key }})[0]
}

export function processRequestQueue(config) {
  const request = getNextRequestFromQueue(config)

  if (request) {
    config.state.get().requests.set('current', request.id)
    request.config = config
    processRequest(request)
  }
}

function requestResource(request) {
  request.config.state.get().set('error', null)
  request.config.state.get().requests.set(new Date().getTime(), request)
}

export function executeAction({ config, href }) {
  requestResource({ config, href, method: 'post', resourceKey: 'current' })
}

export function navigate({ config, href }) {
  if (href === null) {
    config.state.get().resources.set('current', null)
    return
  }

  requestResource({ config, href, method: 'get', resourceKey: 'current' })
}

export function update(links, id, value, name, config) {
  const state = config.state

  if (links.update) {
    const href = links.update.href
    return requestResource({
      config,
      data: { [id]: value },
      href,
      method: 'post',
      name,
    })
  }
  else if (links.submit) {
    draft.update(state, links.submit.href, id, value)
    return
  }

  throw Error('Invalid operation, no update or submit link present')
}

export function submit({ config, href }) {
  const data = config.state.get().drafts[href]
  requestResource({
    config,
    data,
    href,
    method: 'post',
    resourceKey: 'current',
  })
}
