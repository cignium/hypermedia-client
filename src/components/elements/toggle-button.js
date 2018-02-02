import { Component } from 'react'
import cx from 'classnames'

export default class ToggleButton extends Component {
  constructor(props) {
    super()
    this.state = {
      isButtonDisabled: false,
    }
  }

  buttonClicked() {
    this.props.api.executeAction(this.props.action.href, this.props.config)
    this.setState({
      isButtonDisabled: true,
    })
  }

  render() {
    	return (
        <button
          className='ct-action'
          key={this.props.action.href}
          onClick={() => this.buttonClicked()}
          disabled={this.state.isButtonDisabled}
        >
          {this.props.action.title}
        </button>
      )
  }
}
