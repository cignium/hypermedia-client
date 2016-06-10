import { Component } from 'react'
import cx from 'classnames'

export default class FileInput extends Component {

  render() {
    const opts = {}
    if (this.props.property.isArray) {
      opts['multiple'] = 'multiple'
    }
    return (

      <div className={cx(this.props.className, 'ct-file-input') }>
        <input
          {...opts}
          id={this.props.property.name}
          onChange={e => this.handleFiles(e).then(file => this.props.onSave(file))}
          type={'file'}
          style={{ display: 'none' }}
          ref={inputElement => this.fileInput = inputElement}
          />
        <button
          className={'ct-action'}
          title={this.props.property.title}
          disabled={this.props.property.disabled}
          onClick={() => this.fileInput.click() }>
          {this.renderTitle()}
        </button>
        <span className={'ct-selected-information'}>{this.renderFiles(this.props.value) }</span>
      </div>)
  }

  renderTitle() {
    if (this.props.property.isArray) {
      if (this.isEmpty(this.props.value)) {
        return 'Select file(s)'
      }
      else {
        return 'Add file(s)'
      }
    }
    else {
      if (this.isEmpty(this.props.value)) {
        return 'Select file'
      }
      else {
        return 'Replace file'
      }
    }
  }

  renderFiles(value) {
    if (this.isEmpty(value)) {
      return null
    }

    if (value instanceof Array) {
      return (<ul>
        {value.map(fileKey => {
          return this.renderFileKey(fileKey)
        }) }
      </ul>)
    }
    return <ul>{ this.renderFileKey(value) }</ul>
  }

  renderFileKey(key) {
    return (<li key={key}>{this.getFileNameFromKey(key) }
      <span onClick={() => this.deleteFile(key)} className={'delete-zone'} title='Clear'>
        <span className={'delete'}>×</span>
      </span>
    </li>)
  }

  getFileNameFromKey(key) {
    const i = key.indexOf('/')
    return key.substr(i + 1)
  }

  isEmpty(value) {
    return !value || value.length === 0
  }

  deleteFile(key) {
    if (this.props.property.isArray) {
      this.props.onDeleteItem(key)
    }
    else {
      this.fileInput.value = null
      this.props.onSave(null)
    }

  }

  handleFiles(e) {
    if (e.target.files.length === 0) {
      return
    }
    const promise = new Promise((resolve, reject) => {
      if (this.props.property.isArray) {
        const allPromises = []
        for (let i = 0; i < e.target.files.length; i++) {
          allPromises.push(this.handleFile(e.target.files[i]))
        }
        Promise.all(allPromises).then(values => {
          console.log(values)
          resolve(values)
        })
      }
      else {
        this.handleFile(e.target.files[0]).then(file => resolve(file))
      }
    })
    return promise
  }

  handleFile(file) {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => {
        const i = event.target.result.indexOf(',')
        const fileByteArray = event.target.result.substr(i + 1)
        resolve({ name: event.target.fileName, file: fileByteArray })
      }
      reader.fileName = file.name
      reader.readAsDataURL(file)
    })
    return promise
  }
}
