import React from 'react';
import Line from '../designObjects/Line.js';
import VideoPlayButton from './VideoPlayButton.js';
import VideoSource from './VideoSource.js';
import VideoFilter from './VideoFilter.js';

export default class VideoBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoStart: false,
            invertColor: false,
            chromaKeyAlpha: false,
            grayScale: false,
        };
    }

    videoStart(){
        if(this.state.videoStart === false){
            this.setState({videoStart: true});
        }
        else if(this.state.videoStart === true){
            this.setState({videoStart: false});
        }
    }

    useFilter(usedFilter, activateFilter){
        if(usedFilter === "invertColor"){
            if(this.state.invertColor === false){
                this.setState({invertColor: true});
            }
            else if(this.state.invertColor === true) {
                this.setState({invertColor: false});
            }
        }
        if(usedFilter === "chromaKeyAlpha"){
            if(this.state.chromaKeyAlpha === false){
                this.setState({chromaKeyAlpha: true});
            }
            else if(this.state.chromaKeyAlpha === true) {
                this.setState({chromaKeyAlpha: false});
            }
        }
        if(usedFilter === "grayScale"){
            if(this.state.grayScale === false){
                this.setState({grayScale: true});
            }
            else if(this.state.grayScale === true) {
                this.setState({grayScale: false});
            }
        }
    }

    render() {
        return (
            <div className="mediaBox">
                <VideoSource
                    videoStart={this.state.videoStart}
                    useInvertColor={this.state.invertColor}
                    useChromaKeyAlpha={this.state.chromaKeyAlpha}
                    useGrayScale={this.state.grayScale}
                />
                <Line/>
                <VideoPlayButton videoStartStop={this.videoStart.bind(this)}/>
                <Line/>
                <VideoFilter usedFilter={this.useFilter.bind(this)}/>
            </div>
        );
    }
}



