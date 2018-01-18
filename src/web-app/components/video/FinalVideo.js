import React from 'react'

export default class Video extends React.Component {

  constructor (props) {
    super(props)
    this._inputCanvas = props.videoSyncService.canvas
    this._videoSyncService = props.videoSyncService
  }

  componentDidMount () {
    this._videoSyncService.listenOnVideoDrawable(() => {
      let context = this.canvas.getContext('2d')
      context.drawImage(this._inputCanvas, 0, 0, this.canvas.width, this.canvas.height)
    })
  }

  render () {
    return (
      <div className="finalVideo">
        <canvas ref={canvas => this.canvas = canvas}/>
      </div>
    )
  }
}

{/*
    <canvas/>

    <VideoPlayer style={video} src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4"/>

    let video =
    {
      height: "2rem",
      width: "7.5%",
    }



                <canvas
                    ref={canvas => (this.canvas = canvas)}
                    width="100%"
                    height="100%"
                />

*/
}
