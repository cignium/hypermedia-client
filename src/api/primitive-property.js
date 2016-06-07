import createProperty from './property'

export default function(data, parent) {
  return {
    ...createProperty(data, parent),
    disabled: data.disabled,
    display: data.display,
    id: data.id,
    options: data.options,
    value: data.value,
    isArray: data.type === 'string[]' || data.type === 'file[]',
  }
}
