import Resource from './resource'

export const NAVIGATE_TO = 'NAVIGATE_TO'
export const NAVIGATED_TO = 'NAVIGATED_TO'
export const REQUEST_RESOURCE = 'REQUEST_RESOURCE'
export const REQUEST_RESOURCE_FAILURE = 'REQUEST_RESOURCE_FAILURE'
export const REQUEST_RESOURCE_SUCCESS = 'REQUEST_RESOURCE_SUCCESS'

function navigateTo(href) {
  return {
    href,
    type: NAVIGATE_TO,
  }
}

function navigatedTo(href) {
  return {
    href,
    type: NAVIGATED_TO,
  }
}

function requestResource(href, method) {
  return {
    href,
    method,
    type: REQUEST_RESOURCE,
  }
}

function requestResourceSuccess(href, method, resource) {
  return {
    href,
    method,
    resource,
    type: REQUEST_RESOURCE_SUCCESS,
  }
}

function requestResourceFailure(href, method, error) {
  return {
    error,
    href,
    method,
    type: REQUEST_RESOURCE_FAILURE,
  }
}

function dispatchRequest(href, method, data, callback) {
  return (dispatch) => {
    let request = {
      method: method,
    }

    if (data) {
      request.body = JSON.stringify(data)
    }

    dispatch(requestResource(href, method, data))

    return fetch(href, request)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response.json()
        }

        throw Error(`${response.status}: ${response.statusText}`)
      })
      .then(json => new Resource(json))
      .then(resource => {
        dispatch(requestResourceSuccess(href, method, resource))
        callback && dispatch(callback(resource))
      })
      .catch(error => dispatch(requestResourceFailure(href, method, error)))
  }
}

export function executeAction(href) {
  return dispatchRequest(href, 'post', null,
    resource => navigatedTo(resource.links.self.href)
  )
}

export function navigate(href) {
  return dispatchRequest(href, 'get', null,
    resource => navigatedTo(resource.links.self.href)
  )
}

export function update(href, id, value) {
  return dispatchRequest(href, 'post', { [id]: value })
}
