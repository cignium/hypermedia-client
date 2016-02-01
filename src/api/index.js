import { request } from './http'
import factory from './factory'
import state from '../state'

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

async function processRequest({ data, href, id, method, resourceKey, onDone }) {
  try {
    const response = await request(method, href, data)

    onDone && onDone()

    if (response == null) {
      return
    }

    const resource = factory(response)
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

export function executeAction(href) {
  requestResource({ href, method: 'post', resourceKey: 'current' })
}

export function navigate(href) {
  requestResource({ href, method: 'get', resourceKey: 'current' })
}

export function update(href, id, value, name, config) {
  requestResource({
    data: { [id]: value },
    href,
    method: 'post',
    onDone: config.onValueChange.bind(null, name, value),
  })
}
