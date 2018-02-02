import { Component } from 'react'
import cx from 'classnames'

export default class ToggleButton extends Component {
  constructor(props) {
    super()
    this.state = {
      requests: props.requests,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      requests: nextProps.requests,
    })
  }

  buttonClicked() {
    this.props.api.executeAction(this.props.action.href, this.props.config)
  }

  render() {
    	return (
        <button
          className='ct-action'
          key={this.props.action.href}
          onClick={() => this.buttonClicked()}
          disabled={Object.keys(this.state.requests).length}
        >
          {this.props.action.title}
        </button>
      )
  }
}
