import { request } from './http'
import factory from './factory'
import state from '../state'
import draft from './draft'

state.on('update', ({ requests }) => {
  if (requests.current) {
    if (requests[requests.current]) {
      return
    }
    else {
      state.get().requests.remove('current')
    }
  }

  processRequestQueue()
})

async function loadSitemap(resource) {
  if (!resource.links.sitemap) {
    return
  }

  const { href } = resource.links.sitemap

  if (state.get().resources[href]) {
    requestResource({ href, method: 'get', resourceKey: 'sitemap' })
    return
  }

  await requestResource({ href, method: 'get', resourceKey: 'sitemap' })
}

async function processRequest({ data, href, id, method, resourceKey, name, config }) {
  try {
    const response = await request(method, href, data, config)

    if (config && config.onValueChange && data) {
      config.onValueChange(name, data[Object.keys(data)[0]])
    }

    if (response == null) {
      return
    }

    const resource = factory(response)
    draft.reload(href, resource)
    await loadSitemap(resource)

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
  const { requests } = state.get()

  return Object.keys(requests).sort()
    .map(key => { return { ...requests[key], id: key }})[0]
}

function processRequestQueue() {
  const request = getNextRequestFromQueue()

  if (request) {
    state.get().requests.set('current', request.id)
    processRequest(request)
  }
}

function requestResource(request) {
  state.get().set('error', null)
  state.get().requests.set(new Date().getTime(), request)
}

export function executeAction(href, config) {
  requestResource({ href, method: 'post', resourceKey: 'current', config })
}

export function navigate(href, config) {
  requestResource({ href, method: 'get', resourceKey: 'current', config })
}

export function update(links, id, value, name, config) {
  if (links.update) {
    const href = links.update.href
    return requestResource({
      data: { [id]: value },
      href,
      method: 'post',
      name,
      config,
    })
  }
  else if (links.submit) {
    draft.update(links.submit.href, id, value)
    return
  }

  throw Error('Invalid operation, no update or submit link present')
}

export function submit(href) {
  const data = state.get().drafts[href]
  requestResource({
    data,
    href,
    method: 'post',
    resourceKey: 'current',
  })
}
