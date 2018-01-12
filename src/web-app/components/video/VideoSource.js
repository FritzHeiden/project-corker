import React from 'react';

export default class VideoSource extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            interval: undefined,
            ctx: undefined
        };

        this.computeFrame = this.computeFrame.bind(this);
    }

    componentWillReceiveProps(){
        this.play()
        if(this.props.useInvertColor === true){
            this.invertColor()
        }
        else if(this.props.useInvertColor === false){}

        if(this.props.useChromaKeyAlpha === true){
            this.chromaKeyAlpha()
        }
        else if(this.props.useChromaKeyAlpha === false){}

        if(this.props.useGrayScale === true){
            this.grayScale()
        }
        else if(this.props.useGrayScale === false){}
    }

    componentDidMount() {
        this.setState({
            ctx: this.canvas.getContext("2d")
    });

        this.video.crossOrigin = "Anonymous";
    }

    computeFrame() {
        this.state.ctx.drawImage(this.video, 0, 0, 400, 220);
        this.invertColor();
    }

    play() {
        if(this.props.videoStart) {
            if (this.state.interval) {
                clearInterval(this.state.interval);
            }
            this.video.play();
            this.setState({
                interval: setInterval(this.computeFrame, 1000 / this.props.fps)
            });
        } else {
            clearInterval(this.state.interval);
            this.setState({
                interval: undefined
            });
            this.video.pause();
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

    render() {

        /* let video =
       {
         height: "5rem",
         width: "85%",
         position: "relative",
         backgroundColor: "#323232",
         left: "0%",
         margin: "2% 0 2% 0",
       };*/

        let displayNone =
            {
                display: "none",
            };

        return (
            <div>
                <video ref={video => (this.video = video)}
                       muted>
                    <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                    />
                </video>
                <canvas
                    //style={displayNone}
                    ref={canvas => (this.canvas = canvas)}
                    width="100%"
                    height="100%"
                />
            </div>
        );
    }
}
    /*
    style={displayNone}
      <PreviousButton/>
      <StartStopButton changeStartStop={this.videoStartStop}/>
      <NextButton/>

          /*
        constructor(props) {
            super(props);

            this.state = {
                play: false,
            };

            VideoSource.drop = VideoSource.drop.bind(this);
            VideoSource.allowDrop = VideoSource.allowDrop.bind(this);
            this.videoStartStop = this.videoStartStop.bind(this);

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
        else if (this.state.play === true) {
            this.setState({play: false});
        }
    }

    static allowDrop(e) {
        e.preventDefault();
    }

    static drop(e) {
        e.preventDefault();
        //var data = e.dataTransfer.getData("text");
        // console.log("dropped");
    }
    */