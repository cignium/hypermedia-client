import { combineReducers } from 'redux'
import { add, freeze, remove, update } from './utils'
import {
  NAVIGATE_TO,
  NAVIGATED_TO,
  REQUEST_RESOURCE,
  REQUEST_RESOURCE_FAILURE,
  REQUEST_RESOURCE_SUCCESS,
} from './actions'

function error(state = null, action) {
  switch (action.type) {
    case REQUEST_RESOURCE:
      return null

    case REQUEST_RESOURCE_FAILURE:
      return action.error

    default:
      return state
  }
}

function requests(state = freeze({}), action) {
  switch (action.type) {
    case REQUEST_RESOURCE:
      return add(state, action.method + action.href, true)

    case REQUEST_RESOURCE_FAILURE:
    case REQUEST_RESOURCE_SUCCESS:
      return remove(state, action.method + action.href)

    default:
      return state
  }
}

function resources(state = freeze({}), action) {
  switch (action.type) {
    case NAVIGATE_TO:
      if (state[action.href]) {
        return update(state, 'current', action.href)
      }

      return state

    case NAVIGATED_TO:
      return update(state, 'current', action.href)

    case REQUEST_RESOURCE_SUCCESS:
      const self = action.resource.links.self.href

      if (state[self]) {
        return update(state, self, action.resource)
      }

      return add(state, self, action.resource)

    default:
      return state
  }
}

export default combineReducers({
  error,
  requests,
  resources,
})
