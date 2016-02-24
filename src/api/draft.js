import state from '../state'

function update(href, id, value) {
  const drafts = state.get().drafts
  const current = drafts[href]
  const property = { [id]: value }
  if (current) {
    current.set(property)
  }
  else {
    drafts.set(href, property)
  }
}

function reload(href, resource) {
  const current = state.get().drafts[href]
  if (!current) {
    return
  }

  Object.keys(current).forEach(key => {
    if (resource[key]) {
      resource[key].value = current[key]
    }
  })
}

export default {
  update,
  reload,
}
