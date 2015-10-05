import ObjectProperty from './object-property'

export default class Resource extends ObjectProperty {
  constructor(data, parent) {
    super(data, parent)
    this.getData = () => data
  }
}
