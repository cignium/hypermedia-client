import React, { PropTypes } from 'react'
import Element from './element'

export default class Link extends Element {
  static get propTypes() {
    return {
      property: PropTypes.object.isRequired,
    }
  }

  render() {
    return (
      <a
        className={'ct-link'}
        id={this.props.property.id}
        href={this.props.property.links.navigate.href}>
        {this.props.property.value}
      </a>
    )
  }
}
