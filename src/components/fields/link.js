import React from 'react'
import Field from './field'

export default class LinkField extends Field {
  render() {
    return (
      <a
        className={`ct-field ct-link-field`}
        id={this.props.property.id}
        href={this.props.property.links.navigate.href}>
        {this.props.property.value}
      </a>
    )
  }
}
