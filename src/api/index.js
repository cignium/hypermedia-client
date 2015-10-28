import resourceFactory from './resource'
import { request } from './http'
import { getResponseTransformer } from '../configuration'
import state from '../state'

function getProfileFromContentType(contentType) {
  return contentType
    .split(';')
    .find(item => item.startsWith('profile'))
    .split('=')[1]
}

async function transformResponse(response, profile) {
  const transformer = getResponseTransformer()

  if (transformer) {
    return await transformer({
      data: response.data,
      profile,
    })
  }

  return response.data
}

async function requestResource(href, method, data) {
  state.get().set('error', null)
  state.get().requests.set(href + method, true)

  try {
    const response = await request(method, href, data)
    const profile = getProfileFromContentType(response.contentType)
    const transformedResponse = await transformResponse(response, profile)
    const resource = resourceFactory(transformedResponse, profile)

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
