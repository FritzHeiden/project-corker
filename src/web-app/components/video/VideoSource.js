import React from 'react'
import ImageTools from '../../tools/image-tools'

export default class VideoSource extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      interval: undefined,
      ctx: props.videoSyncService.canvas.getContext('2d'),
      outputWidth: props.videoSyncService.canvas.width,
      outputHeight: props.videoSyncService.canvas.height,
      invertColor: false,
      chromaKeyAlpha: false,
      grayScale: false,
      src: props.src
    }

    this._videoSyncService = props.videoSyncService
    this.computeFrame = this.computeFrame.bind(this)
  }

  componentWillReceiveProps (props) {
    if (props.videoStart) {
      this.play()
    } else {
      this.pause()
    }
    this.state.invertColor = props.invertColor
    this.state.chromaKeyAlpha = props.chromaKeyAlpha
    this.state.grayScale = props.grayScale
    this.setState(this.state)
  }

  componentDidMount () {
    this.setState(this.state)
    this.video.crossOrigin = 'Anonymous'
    this.video.currentTime = 200
    this.video.src = this.state.src
    this._canvas = ImageTools.createCanvas(this.state.outputWidth, this.state.outputHeight)
  }

  static allowDrop (e) {
    e.preventDefault()
    e.dataTransfer.setData('text', e.target.id)
  }

  static drop (e) {
    e.preventDefault()
    var data = e.dataTransfer.getData('text') //in data the id is stored
    console.log(data)
  }

  computeFrame () {
    let context = this._canvas.getContext('2d')
    context.drawImage(this.video, 0, 0, this._canvas.width, this._canvas.height)
    if (this.state.chromaKeyAlpha) {
      this.chromaKeyAlpha()
    }

    if (this.state.invertColor) {
      this.invertColor()
    }

    if (this.state.grayScale) {
      this.grayScale()
    }

    this._videoSyncService.canvas.getContext('2d').drawImage(this._canvas, 0, 0, this.state.outputWidth, this.state.outputHeight)

    if (this.state.chromaKeyAlpha) {
      this._videoSyncService.drawVideo()
    }
  }

  play () {
    if (this.state.interval) {
      clearInterval(this.state.interval)
    }
    this.video.play()

    this.state.interval = setInterval(this.computeFrame, 1000 / 30)
    console.log("started compute frame")
    this.setState(this.state)
  }

  pause () {
    clearInterval(this.state.interval)
    this.setState({
      interval: undefined
    })
    this.video.pause()
  }

  chromaKeyAlpha () {
    let context = this._canvas.getContext('2d')
    let imageData = context.getImageData(0, 0, this._canvas.width, this._canvas.height)
    let data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] <= 100 && data[i + 2] <= 100) {
        data[i + 3] = 255 - data[i + 1]
      }
    }

    context.putImageData(imageData, 0, 0)
  }

  invertColor () {
    let context = this._canvas.getContext('2d')
    let imageData = context.getImageData(0, 0, this._canvas.width, this._canvas.height)
    let data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]         // red
      data[i + 1] = 255 - data[i + 1] // green
      data[i + 2] = 255 - data[i + 2] // blue
    }

    context.putImageData(imageData, 0, 0)
  }

  grayScale () {
    let context = this._canvas.getContext('2d')
    let imageData = context.getImageData(0, 0, this._canvas.width, this._canvas.height)
    let data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i]
      let g = data[i + 1]
      let b = data[i + 2]

      let y = (0.2126 * r + 0.7152 * g + 0.0722 * b)

      data[i] = y
      data[i + 1] = y
      data[i + 2] = y
    }

    context.putImageData(imageData, 0, 0)
  }

  render () {
    let displayNone =
      {
        display: 'none',
      }

    return (
      <div>
        <video controls
               ref={video => (this.video = video)}
               onDrop={VideoSource.drop.bind(this)}
               onDragOver={VideoSource.allowDrop.bind(this.event)}
               muted
               style={{backgroundColor: 'red'}}>
          <source
            type="video/mp4"
          />
        </video>
      </div>
    )
  }
}

/*

<div className="finalVideo">
    <canvas
        ref={canvas => (this.canvas = canvas)}
        width="100%"
        height="100%"
    />
</div>

style={displayNone}
  <PreviousButton/>
  <StartStopButton changeStartStop={this.videoStartStop}/>
  <NextButton/>

      /*
    constructor(props) {
        super(props);

        this.state = {
            interval: undefined,
            ctx: undefined
        };

        this.computeFrame = this.computeFrame.bind(this);
    }

    componentDidMount() {
        this.setState({
            ctx: this.canvas.getContext("2d")
    });

        /**
         onPause:Function - Callback to pause video
         onPlay:Function - Callback to play video
         onSeek:Function - Callback to seek video
         */

/*
    videoStartStop() {
        // console.log("TestFunction");
        if (this.state.play === false) {
            this.setState({play: true});
        }
    }

    chromaKeyAlpha() {
        let imageData = this.state.ctx.getImageData(0, 0, 400, 220);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i + 3] = (data[i] + data[i + 1] + data[i + 2]) / 3; // blue
        }

        this.state.ctx.putImageData(imageData, 0, 0);
    }

    invertColor() {
        let imageData = this.state.ctx.getImageData(0, 0, 400, 220);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];         // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }

        this.state.ctx.putImageData(imageData, 0, 0);
    }

    grayScale() {
        let imageData = this.state.ctx.getImageData(0, 0, 400, 220);
        let data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];

            let y = (0.2126 * r + 0.7152 * g + 0.0722 * b);

            data[i] = y;
            data[i + 1] = y;
            data[i + 2] = y;
        }

        this.state.ctx.putImageData(imageData, 0, 0);
    }
    */