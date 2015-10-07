export function request(method, href, data, callback) {
  const req = new XMLHttpRequest()

  req.open(method, href)
  req.onload = () => {
    if (req.status === 200) {
        return callback(JSON.parse(req.response))
    }

    throw Error(`${req.statusText} for ${method} ${href}`)
  }

  req.onerror = () => {
    throw Error(`Unknown error for ${method} ${href}`)
  }

  if (data) {
    req.setRequestHeader('Content-Type', 'application/json')
    req.send(JSON.stringify(data))
  } else {
    req.send()
  }
}

