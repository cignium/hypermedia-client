function find(state, href) {
  return state.get().drafts[href]
}

function create(state, href, initial) {
  state.get().drafts.set(href, initial)
}

function remove(state, href) {
  state.get().drafts.remove(href)
}

function update(state, href, id, value) {
  const draft = find(state, href)
  const property = { [id]: value }
  if (draft) {
    draft.set(property)
  }
  else {
    create(state, href, property)
  }
}

function reload(state, href, resource) {
  const draft = find(state, href)
  if (!draft) {
    return
  }

  const navigatedAway = !resource.links.submit || resource.links.submit.href != href
  if (navigatedAway) {
    remove(state, href)
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
