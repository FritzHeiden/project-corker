import React from 'react';

export default class VideoSource extends React.Component {

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
    }

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
                <video id="film" width="100" height="100">
                    <source src="test.ogv" type="video/ogg"/>
                    {/* TODO Findet Video nicht */}
                </video>
                <canvas id="zwischenablage" width="100" height="100" style={displayNone}></canvas>
                <canvas id="ziel" width="100" height="100"></canvas>
            </div>
        );
    }

    /*
      <PreviousButton/>
      <StartStopButton changeStartStop={this.videoStartStop}/>
      <NextButton/>
      */
}