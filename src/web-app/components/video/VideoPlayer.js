import React, {Component} from 'react';


class VideoPlayer extends React.Component {

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

        this.video.crossOrigin = "Anonymous";
    }

    computeFrame() {
        this.state.ctx.drawImage(this.video, 0, 0, 400, 220);
        this.invertColor();
        //this.chromaKeyAlpha();
        //this.grayScale();
    }

    play() {
        if (this.video.paused) {
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
        return (
            <div>
                <video width="400" ref={video => (this.video = video)} muted>
                    <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                    />
                </video>
                <canvas
                    ref={canvas => (this.canvas = canvas)}
                    width="400"
                    height="220"
                />
                <br/>
                <button type="button" onClick={this.play.bind(this)}>
                    Play
                </button>
            </div>
        );
    }
}

export default VideoPlayer;