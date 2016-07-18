const mediaType = 'application/vnd.cignium.resource+json'

export async function request(method, href, data, config) {
  const request = {
    body: data && JSON.stringify(data),
    credentials: 'include',
    headers: new Headers({ Accept: 'application/json' }),
    method,
  }

  const response = await fetch(href, request)
  const contentType = response.headers.get('Content-Type')

  if (response.status == 401) {
    if (config && config.onRedirect) {
      return getResponse(response, config)
    }

    location.href = method.toLowerCase() == 'get' ? response.url : location.href
    return
  }

  if (response.status >= 400 && response.status < 600) {
    throw Error(`${response.status}: ${response.statusText}`)
  }

  if (contentType.startsWith(mediaType)) {
    return await response.json()
  }

  if (config && config.onRedirect) {
    return getResponse(response, config)
  }

  location.href = response.url

  return null
}

async function getResponse(response, config) {
  let content = await response.text()
  content = config.onRedirect(response.url, content, response.status)

  if (content) {
    content.type = content.type || 'html'
    content.links = content.links || [{ rel: 'self', href: response.url }]
  }

  return content
}
