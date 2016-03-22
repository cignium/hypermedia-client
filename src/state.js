import Freezer from 'freezer-js'
import { processRequestQueue } from './api'

function getAllLeafProperties(data) {
  const properties = []
  if (data.properties) {
    data.properties.forEach(p => {
      switch (p.type) {
        case 'html':
        case 'plain':
        case 'array':
          break
        case 'object':
          Array.prototype.push.apply(properties, getAllLeafProperties(p))
          break
        default:
          properties.push(p)
          break
      }
    })
  }
  return properties
}

export default instance => {
  const state = new Freezer({
    current: null,
    error: null,
    drafts: {},
    requests: {},
    resources: {},
  })

  state.on('update', ({ requests, resources }) => {
    if (resources.current) {
      instance.allProperties = getAllLeafProperties(resources[resources.current])
    }

    if (requests.current) {
      if (requests[requests.current]) {
        return
      }
      else {
        state.get().requests.remove('current')
      }
    }

    processRequestQueue(instance)
  })

  return state
}
