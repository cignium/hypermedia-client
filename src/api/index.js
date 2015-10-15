import { request } from './http'
import Resource from './resource'
import State from '../state'

async function requestResource(href, method, data) {
  State.get().set('error', null)
  State.get().requests.set(href + method, true)

  try {
    const response = await request(method, href, data)
    const resource = new Resource(response)
    State.get().resources.set(resource.links.self.href, resource)

    return resource
  }
  catch (e) {
    State.get().set('error', e)
    throw e
  }
  finally {
    State.get().requests.remove(href + method)
  }
}

function setCurrent(resource) {
  State.get().resources.set('current', resource.links.self.href)
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
