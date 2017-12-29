import React from 'react'
import PropTypes from 'prop-types';

import Checkbox from '../Checkbox.js'

export default class AudioFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {usedFilter: ''}

        this.displayInfo = this.displayInfo.bind(this)
        this.vanishInfo = this.vanishInfo.bind(this)
        this.audioPlayerJS = this.props.audioPlayerJS;
    }

    displayInfo(e){
        let state = this.state
        state.usedFilter = e.target.name
        this.setState(state)
        this.onChangeFilter()
    }

    vanishInfo(){
        let state = this.state
        state.usedFilter = ''
        this.setState(state)
    }

    onChangeFilter(){
        console.log("From AudioFilter: " + this.state.usedFilter)
        this.props.onFilterUsed(this.state.usedFilter);
    }

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
        </div>
    }
}

AudioFilter.propTypes = {
    onFilterUsed: PropTypes.func,
};
