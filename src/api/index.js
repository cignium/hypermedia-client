import { request } from './http'
import factory from './factory'
import draft from './draft'

async function loadSitemap({ instance, resource }) {
  if (!resource.links.sitemap) {
    return
  }

  const state = instance.state
  const { href } = resource.links.sitemap

  if (state.get().resources[href]) {
    requestResource({ instance, href, method: 'get', resourceKey: 'sitemap' })
    return
  }

  await requestResource({ instance, href, method: 'get', resourceKey: 'sitemap' })
}

async function processRequest({ instance, data, href, id, method, resourceKey }) {
  const state = instance.state
  try {
    const response = await request(method, href, data, instance)

    if (instance.options.onValueChange && data) {
      const propertyId = Object.keys(data)[0]
      const propertyName = instance.allProperties.find(p => p.id === propertyId).name
      const resources = state.get().resources
      const formName = resources[resources.current].name
      instance.options.onValueChange(formName, propertyName, data[propertyId])
    }

    if (response == null) {
      return
    }

    const resource = factory(response)

    draft.reload(state, href, resource)
    await loadSitemap({ instance, resource })

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

function getNextRequestFromQueue(instance) {
  const { requests } = instance.state.get()

  return Object.keys(requests).sort()
    .map(key => { return { ...requests[key], id: key, instance }})[0]
}

export function processRequestQueue(instance) {
  const request = getNextRequestFromQueue(instance)

  if (request) {
    instance.state.get().requests.set('current', request.id)
    processRequest(request)
  }
}

function requestResource(request) {
  request.instance.state.get().set('error', null)
  request.instance.state.get().requests.set(new Date().getTime(), request)
}

export function executeAction({ instance, href }) {
  requestResource({ instance, href, method: 'post', resourceKey: 'current' })
}

export function navigate({ instance, href }) {
  if (href === null) {
    instance.state.get().resources.set('current', null)
    return
  }

  requestResource({ instance, href, method: 'get', resourceKey: 'current' })
}

export function update({ instance, links, id, value }) {
  const state = instance.state

  if (links.update) {
    const href = links.update.href
    return requestResource({
      instance,
      data: { [id]: value },
      href,
      method: 'post',
    })
  }
  else if (links.submit) {
    draft.update(state, links.submit.href, id, value)
    return
  }

  throw Error('Invalid operation, no update or submit link present')
}

export function submit({ instance, href }) {
  const data = instance.state.get().drafts[href]
  requestResource({
    instance,
    data,
    href,
    method: 'post',
    resourceKey: 'current',
  })
}
