import Freezer from 'freezer-js'
import { processRequestQueue } from './api'

export default config => {
  const state = new Freezer({
    current: null,
    error: null,
    drafts: {},
    requests: {},
    resources: {},
  })

  state.on('update', ({ requests }) => {
    if (requests.current) {
      if (requests[requests.current]) {
        return
      }
      else {
        state.get().requests.remove('current')
      }
    }

    processRequestQueue(config)
  })

  return state
}
