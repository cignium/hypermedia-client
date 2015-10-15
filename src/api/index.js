import { request } from './http'
import Resource from './resource'
import State from '../state'

async function requestResource(href, method, navigate, data) {
  State.get().set('error', null)
  State.get().requests.set(href + method, true)

  try {
    const response = await request(method, href, data)
    const resource = new Resource(response)
    State.get().resources.set(resource.links.self.href, resource)
    navigate && State.get().resources.set('current', resource.links.self.href)
  }
  catch (e) {
    State.get().set('error', e)
    throw e
  }
  finally {
    State.get().requests.remove(href + method)
  }
}

export function executeAction(href) {
  requestResource(href, 'post', true)
}

export function navigate(href) {
  requestResource(href, 'get', true)
}

export function update(href, id, value) {
  requestResource(href, 'post', false, { [id]: value })
}
