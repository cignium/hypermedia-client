import React from 'react'
import Field from './field'

export default class DateField extends Field {
  getValue(target) {
    return target.valueAsDate
  }

  get type() {
    return 'date'
  }
}
