import React from 'react';
import Line from '../designObjects/Line.js';
import StartStopButton from '../designObjects/StartStopButton.js';
import VideoSource from './VideoSource.js';
import VideoFilter from './VideoFilter.js';

export default class VideoBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="audioBox">
                <VideoSource/>
                <Line/>
                <StartStopButton changeStartStop={this.videoStartStop}/>
                <Line/>
                <VideoFilter/>
            </div>
        );
    }
}


