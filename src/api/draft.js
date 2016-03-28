function find(href) {
  return this.state.get().drafts[href]
}

function create(href, initial) {
  this.state.get().drafts.set(href, initial)
}

function remove(href) {
  this.state.get().drafts.remove(href)
}

function update(href, id, value) {
  const draft = this::find(href)
  const property = { [id]: value }
  if (draft) {
    draft.set(property)
  }
  else {
    this::create(href, property)
  }
}

function reload(href, resource) {
  const draft = this::find(href)
  if (!draft) {
    return
  }

  const navigatedAway = !resource.links.submit || resource.links.submit.href != href
  if (navigatedAway) {
    this::remove(href)
    return
  }

  Object.keys(draft).forEach(key => {
    if (resource[key]) {
      resource[key].value = draft[key]
    }
  })
}

export default {
  update,
  reload,
}
