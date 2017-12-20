import React from 'react'
import FileBrowser from './FileBrowser.js'

class Footer extends React.Component {
  constructor (props) {
    super(props)
    this._fileService = props.fileService
  }

  render () {
    const {title} = this.props

    return (
      <div>
        <footer>
          <div className="slideContainer">
            <input className="slider" type="range" min={1} max={100} defaultValue={50}/>
          </div>
          <FileBrowser title={title} fileService={this._fileService}/>
        </footer>
      </div>
    )
  }
}

export default Footer
