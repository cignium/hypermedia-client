import React, { Component, PropTypes } from 'react'

export default class Element extends Component {
  static get propTypes() {
    return {
      property: PropTypes.object.isRequired,
    }
  }
}
