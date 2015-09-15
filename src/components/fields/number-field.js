import React from 'react'
import Field from './field'

export default class NumberField extends Field {
  getValue(target) {
    return target.valueAsNumber
  }

  get type() {
    return 'number'
  }
}
