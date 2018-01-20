import React from 'react'
import Line from '../designObjects/Line.js'
import VideoPlayButton from './VideoPlayButton.js'
import VideoSource from './VideoSource.js'
import VideoFilter from './VideoFilter.js'

export default class VideoBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videoStart: false,
      invertColor: false,
      chromaKeyAlpha: false,
      grayScale: false,
      src: props.src
    }
  }

  videoStart (status) {
    this.state.videoStart = status
    this.setState(this.state)
  }

  useFilter (usedFilter, status) {
    if (usedFilter === 'invertColor') {
      this.setState({invertColor: status})
    }
    if (usedFilter === 'chromaKeyAlpha') {
      this.setState({chromaKeyAlpha: status})
    }
    if (usedFilter === 'grayScale') {
      this.setState({grayScale: status})
    }
  }

  allowDrop (e) {
    e.preventDefault()
    e.dataTransfer.setData('text', e.target.id)
  }

  drop (e) {
    e.preventDefault()
    let data = e.dataTransfer.getData('text') //in data the id is stored
    this.state.src = `http://localhost:2345/api/file?path=${data}`
    this.setState(this.state)
  }

  render () {
    return (
      <div className="mediaBox" onDrop={event => this.drop(event)}
           onDragOver={event => this.allowDrop(event)}>
        <VideoSource
          videoStart={this.state.videoStart}
          invertColor={this.state.invertColor}
          chromaKeyAlpha={this.state.chromaKeyAlpha}
          grayScale={this.state.grayScale}
          videoSyncService={this.props.videoSyncService}
          src={this.state.src}
        />
        <Line/>
        <VideoPlayButton videoStartStop={this.videoStart.bind(this)}/>
        <Line/>
        <VideoFilter usedFilter={this.useFilter.bind(this)}/>
      </div>
    )
  }
}
