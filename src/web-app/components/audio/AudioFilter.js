import React from 'react'
import Checkbox from '../Checkbox.js'

export default class AudioFilter extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { startX: 0, endX: 0, startY: 0, endY: 0, clicked: 0, rotate: 0};

        this.changeVolume = this.changeVolume.bind(this);
        this.setStart = this.setStart.bind(this);
        this.displayVolumeBox = this.displayVolumeBox.bind(this);
        this.vanishVolumeBox = this.vanishVolumeBox.bind(this);

        this.audioPlayerJS = this.props.audioPlayerJS;

    }

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

    /***********************Fritz fragen wo das hin soll am besten (vllt. audio verzeichnis?)**************************/
    displayVolumeBox(e) {
        let volumeBox = document.getElementById("volumeBox");
        volumeBox.style.display = "block";
        volumeBox.style.left = e.pageX + "px";
        volumeBox.style.top = e.pageY + "px";
    }

    displayLowpassFrequencyBox(e){
        let lowpassFrequency = document.getElementById("lowpassFrequency");
        lowpassFrequency.style.display = "block";
        lowpassFrequency.style.left = e.pageX + "px";
        lowpassFrequency.style.top = e.pageY + "px";
    }

    displayLowpassQualityBox(e){
        let lowpassQuality = document.getElementById("lowpassQuality");
        lowpassQuality.style.display = "block";
        lowpassQuality.style.left = e.pageX + "px";
        lowpassQuality.style.top = e.pageY + "px";
    }

    displayHighshelfFrequencyBox(e){
        let highshelfFrequency = document.getElementById("highshelfFrequency");
        highshelfFrequency.style.display = "block";
        highshelfFrequency.style.left = e.pageX + "px";
        highshelfFrequency.style.top = e.pageY + "px";
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
                       onChange={event => this.audioPlayerJS.changeVolume(parseInt(event.target.value))}
                       onMouseEnter={this.displayVolumeBox.bind(this)}
                       onMouseLeave={this.vanishVolumeBox.bind(this)}/>
                <div className="filterBubble" id="volumeBox">Volume</div>
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={1}
                       step={0.01}
                       defaultValue={1}
                       onChange={event => this.audioPlayerJS.changeLowpassFilterFrequency(event.target.value)}
                       onMouseEnter={this.displayLowpassFrequencyBox.bind(this)}
                       onMouseLeave={this.vanishLowpassFrequencyBox.bind(this)}/>
                <div className="filterBubble" id="lowpassFrequency">Lowpass Frequency</div>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={1}
                       step={0.01}
                       defaultValue={0}
                       onChange={event => this.audioPlayerJS.changeLowpassFilterQuality(event.target.value)}
                       onMouseEnter={this.displayLowpassQualityBox.bind(this)}
                       onMouseLeave={this.vanishLowpassQualityBox.bind(this)}/>
                <div className="filterBubble" id="lowpassQuality">Lowpass Quality</div>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={9500} step={1}
                       defaultValue={9500}
                       onChange={event => this.audioPlayerJS.changeHighshelfFilterFrequency(parseInt(event.target.value))}
                       onMouseEnter={this.displayHighshelfFrequencyBox.bind(this)}
                       onMouseLeave={this.vanishHighshelfFrequencyBox.bind(this)}/>
                <div className="filterBubble" id="highshelfFrequency">Highshelf Frequency</div>
            </div>
        </div>
    }
}

