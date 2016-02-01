function getName(attribute) {
  return attribute.name
    .slice(5)
    .replace(/-([a-z])/g, match => {
      return match[1].toUpperCase()
    })
}

function getValue(attribute) {
  return attribute.value == '' ? true : attribute.value
}

export default function(element) {
  const options = {}

  Array.prototype.slice.call(element.attributes)
    .filter(attr => attr.name.startsWith('data-'))
    .map(attr => { options[getName(attr)] = getValue(attr) })

  return options
}
