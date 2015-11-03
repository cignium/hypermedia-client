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

  if (response.status == 200) {
    if (contentType.startsWith(mediaType)) {
      return await response.json()
    }

    location.href = response.url

    return null
  }

  throw Error(`${response.status}: ${response.statusText}`)
}
