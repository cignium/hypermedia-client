const mediaType = 'application/vnd.cignium.resource+json'

export async function request(method, href, data) {
  const request = {
    body: data && JSON.stringify(data),
    credentials: 'include',
    headers: new Headers({ Accept: 'application/json' }),
    method,
  }

  const response = await fetch(href, request)
  const contentType = response.headers.get('Content-Type')

  if (response.status == 401 && contentType && contentType.startsWith('text/html')) {
    location.href = method.toLowerCase() == 'get' ? response.url : location.href
    return
  }

  if (response.status >= 400 && response.status < 600) {
    throw Error(`${response.status}: ${response.statusText}`)
  }

  if (contentType.startsWith(mediaType)) {
    return await response.json()
  }

  if (this.options.onRedirect) {
    let content = await response.text()
    content = this.options.onRedirect(response.url, content)

    if (content) {
      content.type = 'html'
      content.links = [{ rel: 'self', href: response.url }]
    }

    return content
  }

  location.href = response.url

  return null
}
