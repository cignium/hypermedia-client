import React, { Component } from 'react'
import factory from './factory'

export default class Input extends Component {
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

  render() {
    const Element = factory(this.props.property)
    let className = 'ct-input'

    if (this.props.property.errors.length) {
      className += ' ct-input-invalid'
    }

    return (
      <Element
        className={className}
        property={this.props.property}
        save={value => this.save(value)}
        update={value => this.setState({ value })}
        value={this.state.value} />
    )
  }

  save(value) {
    if (value === undefined) {
      value = this.state.value
    }
    else {
      this.setState({ value })
    }

    const { property } = this.props

    if (property.value !== value) {
      this.props.update(property.links.update.href, property.id, value)
    }
  }
}
