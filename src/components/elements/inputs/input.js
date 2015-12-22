import { Component } from 'react'
import factory from './factory'
import styles from './input.css'

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
    let className = `ct-input`

    if (this.props.property.errors.length) {
      className += ` ${styles.invalid} ct-input-invalid`
    }

    return (
      <Element
        className={className}
        errors={this.props.property.errors.join('<br>')}
        property={this.props.property}
        onCommit={value => this.update(value)}
        onUpdate={value => this.setState({ value })}
        value={this.state.value} />
    )
  }

  update(value) {
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
