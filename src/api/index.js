import createResource from './resource'
import { request } from './http'
import state from '../state'

async function requestResource(href, method, data) {
  state.get().set('error', null)
  state.get().requests.set(href + method, true)

  try {
    const response = await request(method, href, data)
    const resource = createResource(response.data)

    state.get().resources.set(resource.links.self.href, resource)

    return resource
  }
  catch (e) {
    state.get().set('error', e)
    throw e
  }
  finally {
    state.get().requests.remove(href + method)
  }
}

function setCurrent(resource) {
  state.get().resources.set('current', resource.links.self.href)
}

export async function executeAction(href) {
  setCurrent(await requestResource(href, 'post'))
}

export async function navigate(href) {
  setCurrent(await requestResource(href, 'get'))
}

export function update(href, id, value) {
  requestResource(href, 'post', { [id]: value })
}
