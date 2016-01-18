import { Component } from 'react'
import cx from 'classnames'
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

    return (
      <Element
        className={cx({
          'ct-input-invalid': this.props.property.errors.length,
        })} 
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
