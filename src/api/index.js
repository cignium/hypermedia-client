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

async function processRequest({ data, href, id, method, navigate }) {
  try {
    const response = await request(method, href, data)
    const resource = factory(response)

    state.get().resources.set(resource.links.self.href, resource)

    if (navigate) {
      state.get().resources.set('current', resource.links.self.href)
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
  requestResource({ href, method: 'post', navigate: true })
}

export function navigate(href) {
  requestResource({ href, method: 'get', navigate: true })
}

export function update(href, id, value) {
  requestResource({ data: { [id]: value }, href, method: 'post' })
}
