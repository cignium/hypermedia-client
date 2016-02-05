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

  if (response.status == 200) {
    if (contentType.startsWith(mediaType)) {
      return await response.json()
    }

    if (config && config.onProcessComplete) {
      let content = await response.text()
      content = config.onProcessComplete(response.url, content)
      if (content) {
        content.type = 'html'
        content.links = [{ rel: 'self', href: response.url }]
      }
      return content
    }

    location.href = response.url

    return null
  }

  throw Error(`${response.status}: ${response.statusText}`)
}
