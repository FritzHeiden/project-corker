import React from 'react'

export default class Video extends React.Component {

  constructor (props) {
    super(props)
    this._context = props.context
    this._refreshRate = props.refreshRate
  }

  componentDidMount () {
    setInterval(() => {
      this.drawContextToCanvas(this._context)
    }, 1000 / this._refreshRate)
  }

  drawContextToCanvas (context) {
    context.scale(5, 5)
    let imageData = context.getImageData(0, 0, context.width, context.height)
    let finalContext = this.canvas.getContext('2d')
    finalContext.putImageData(imageData, 0, 0)
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
