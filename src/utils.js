export function add(object, key, item) {
  return freeze({...object, [key]: item})
}

export function freeze(object) {
  Object.freeze(object)

  const isFunction = typeof object === 'function'
  const hasOwnProp = Object.prototype.hasOwnProperty

  Object.getOwnPropertyNames(object).forEach(function(prop) {
    if (hasOwnProp.call(object, prop)
    && (isFunction ? prop !== 'caller' && prop !== 'callee'
      && prop !== 'arguments' : true)
    && object[prop] !== null
    && (typeof object[prop] === 'object' || typeof object[prop] === 'function')
    && !Object.isFrozen(object[prop])) {
      freeze(object[prop])
    }
  })

  return object
}

export function remove(object, key) {
  const copy = {...object}

  delete copy[key]

  return freeze(copy)
}

export function update(object, key, item) {
  const copy = {...object}

  copy[key] = item

  return freeze(copy)
}
