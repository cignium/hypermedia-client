import React, { Component, PropTypes } from 'react'

export default class Field extends Component {
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

  render() {
    return (
      <input
        className={`ct-field ct-${this.type}-field`}
        id={this.props.property.id}
        onBlur={(e) => this.onBlur(e)}
        onChange={(e) => this.onChange(e)}
        type={this.type}
        value={this.state.value} />
    )
  }
}
