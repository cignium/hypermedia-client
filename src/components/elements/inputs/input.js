import React, { PropTypes } from 'react'
import Element from '../element'

export default class Input extends Element {
  static get propTypes() {
    return {
      property: PropTypes.object.isRequired,
      update: PropTypes.func,
    }
  }

  constructor(props) {
    super()

    this.state = {
      value: props.property.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentValue = this.props.property.value
    const nextValue = nextProps.property.value

    if (nextValue != currentValue) {
      this.setState({
        value: nextValue,
      })
    }
  }

  getValue(target) {
    return target.value
  }

  onBlur(e) {
    this.onUpdate(this.state.value)
  }

  onChange(e) {
    this.setState({
      value: e.target.value === '' ? null : this.getValue(e.target),
    })
  }

  onUpdate(value) {
    if (this.props.property.value != value) {
      const property = this.props.property
      const updateHref = property.links.update.href

      this.props.update(updateHref, property.id, value)
    }
  }
}
