import state from '../state'

function find(href) {
  return state.get().drafts[href]
}

function create(href, initial) {
  state.get().drafts.set(href, initial)
}

function remove(href) {
  state.get().drafts.remove(href)
}

function update(href, id, value) {
  const draft = find(href)
  const property = { [id]: value }
  if (draft) {
    draft.set(property)
  }
  else {
    create(href, property)
  }
}

function reload(href, resource) {
  const draft = find(href)
  if (!draft) {
    return
  }

  const navigatedAway = !resource.links.submit || resource.links.submit.href != href
  if (navigatedAway) {
    remove(href)
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
