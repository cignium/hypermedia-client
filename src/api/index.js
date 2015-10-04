import Resource from './resource'
import State from '../state'

function request(href, method, navigate, data, callback) {
  const request = {
    body: data && JSON.stringify(data),
    method,
  }

  State.get().set('error', null)
  State.get().requests.set(href + method, true)

  return fetch(href, request)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response.json()
      }

      throw Error(`${response.status}: ${response.statusText}`)
    })
    .then(json => new Resource(json))
    .then(resource => {
      State.get().resources.set(resource.links.self.href, resource)
      navigate && State.get().resources.set('current', resource.links.self.href)
    })
    .catch(error => State.get().set('error', error))
    .then(() => State.get().requests.remove(href + method))
}

export function executeAction(href) {
  request(href, 'post', true)
}

export function navigate(href) {
  request(href, 'get', true)
}

export function update(href, id, value) {
  request(href, 'post', false, { [id]: value })
}
