import React from 'react'
import Checkbox from '../Checkbox.js'
import Line from '../designObjects/Line.js'

export default class AudioFilter extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { startX: 0, endX: 0, startY: 0, endY: 0, clicked: 0, rotate: 0};
        this.state = {usedFilter: ''}
        //this.changeVolume = this.changeVolume.bind(this);
        //this.setStart = this.setStart.bind(this);
        //this.displayVolumeBox = this.displayVolumeBox.bind(this);
        //this.vanishVolumeBox = this.vanishVolumeBox.bind(this);

        this.displayInfo = this.displayInfo.bind(this)
        this.vanishInfo = this.vanishInfo.bind(this)
        this.audioPlayerJS = this.props.audioPlayerJS;

    }

    displayInfo(e){
        let state = this.state
        state.usedFilter = e.target.name
        this.setState(state)
    }

    vanishInfo(e){
        let state = this.state
        state.usedFilter = ''
        this.setState(state)
    }

        /*
    setStart(e) {
        if (this.state.clicked === 0) {
            this.setState({startY: e.screenY});
            this.setState({startX: e.screenX});
            this.setState({clicked: 1});
        }
        else if (this.state.clicked === 1) {
            this.setState({clicked: 0});
        }
    }

    /* Doesn't work */
/*
    changeVolume(event) {

        if (this.state.clicked === 1) {
            let elementSize = 50

            var position = this.refs.filterButton.getBoundingClientRect();
            let middleX = position.left + elementSize / 2;
            let middleY = position.top + elementSize / 2;

            let y = event.screenY;
            let x = event.screenX;

            this.setState({endY: event.screenY});
            this.setState({endX: event.screenX});
            // console.log("Ende der Line: " + this.state.endX + ", " + this.state.endY);
            // console.log("Mittelpunkt Kreis: " + middleX +", " + middleY);

            let dy = this.state.endY - middleY;
            let dx = this.state.endX - middleX;
            let theta = Math.atan(dy / dx);
            theta *= 180 / Math.PI;

            //let object = this.refs.filterButton;
            //let filter = document.getElementById(object);
            //filter.style.transform = 'rotate('+theta+'deg)';

            this.setState({rotate: 90});

        }
    }
*/
    /***********************Fritz fragen wo das hin soll am besten (vllt. audio verzeichnis?)**************************/
/*
    displayVolumeBox(e) {
        let volumeBox = document.getElementById("volumeBox");
        volumeBox.style.display = "block";
        volumeBox.style.top = e.pageY - 175 + "px";
    }

    displayLowpassFrequencyBox(e){
        let lowpassFrequency = document.getElementById("lowpassFrequency");
        lowpassFrequency.style.display = "block";
        lowpassFrequency.style.top = e.pageY - 175 + "px";
    }

    displayLowpassQualityBox(e){
        let lowpassQuality = document.getElementById("lowpassQuality");
        lowpassQuality.style.display = "block";
        lowpassQuality.style.top = e.pageY - 175 + "px";
    }

    displayHighshelfFrequencyBox(e){
        let highshelfFrequency = document.getElementById("highshelfFrequency");
        highshelfFrequency.style.display = "block";
        highshelfFrequency.style.top = e.pageY - 175 + "px";
    }

    vanishVolumeBox() {
        document.getElementById("volumeBox").style.display = "none";
    }

    vanishLowpassFrequencyBox(){
        document.getElementById("lowpassFrequency").style.display = "none";

    }

    vanishLowpassQualityBox(){
        document.getElementById("lowpassQuality").style.display = "none";
    }

    vanishHighshelfFrequencyBox(){
        document.getElementById("highshelfFrequency").style.display = "none";
    }
*/
    /******************************************************************************************************************/

    render() {
        return <div className="filterBox">
            <Checkbox audioPlayerJS={this.audioPlayerJS}/>
            <div className="sliderBox">
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={100}
                       defaultValue={100}
                       name="Volume"
                       onChange={event => this.audioPlayerJS.changeVolume(parseInt(event.target.value))}
                       onMouseEnter={this.displayInfo.bind(this)}
                       onMouseLeave={this.vanishInfo.bind(this)}/>
                <div className="filterBubble" id="volumeBox"><p>Volume</p></div>
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={1}
                       step={0.01}
                       defaultValue={1}
                       name="Lowpass Frequency"
                       onChange={event => this.audioPlayerJS.changeLowpassFilterFrequency(event.target.value)}
                       onMouseEnter={this.displayInfo.bind(this)}
                       onMouseLeave={this.vanishInfo.bind(this)}/>
                <div className="filterBubble" id="lowpassFrequency"><p>Lowpass Frequency</p></div>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={1}
                       step={0.01}
                       defaultValue={0}
                       name="Lowpass Quality"
                       onChange={event => this.audioPlayerJS.changeLowpassFilterQuality(event.target.value)}
                       onMouseEnter={this.displayInfo.bind(this)}
                       onMouseLeave={this.vanishInfo.bind(this)}/>
                <div className="filterBubble" id="lowpassQuality"><p>Lowpass Quality</p></div>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={9500} step={1}
                       defaultValue={9500}
                       name="Highshelf Frequency"
                       onChange={event => this.audioPlayerJS.changeHighshelfFilterFrequency(parseInt(event.target.value))}
                       onMouseEnter={this.displayInfo.bind(this)}
                       onMouseLeave={this.vanishInfo.bind(this)}/>
                <div className="filterBubble" id="highshelfFrequency"><p>Highshelf Frequency</p></div>
            </div>
            <Line/>
            <div className="filterInfo">
                <p>{this.state.usedFilter}</p>
            </div>
        </div>
    }
}

