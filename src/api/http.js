export async function request(method, href, data) {
  const request = {
    body: data && JSON.stringify(data),
    credentials: 'include',
    headers: new Headers({ Accept: 'application/json' }),
    method,
  }

  const response = await fetch(href, request)

  if (response.status == 200) {
    return await response.json()
  }

  throw Error(`${response.status}: ${response.statusText}`)
}
