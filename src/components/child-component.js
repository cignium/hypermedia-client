import { Component, PropTypes } from 'react'

export default class ChildComponent extends Component {
  static contextTypes = {
    state: PropTypes.object,
    options: PropTypes.object,
  };
}
