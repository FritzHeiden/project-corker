import React from 'react'
import PropTypes from 'prop-types';
import Checkbox from './Checkbox.js'

export default class AudioFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          usedFilter: '',
          lowpassFrequency: 1,
          lowpassQuality: 0,
          highshelfFrequency: 9500,
          useLowPass: false,
          useHighshelf: false,
        }

        this.displayInfo = this.displayInfo.bind(this)
        this.audioPlayerJS = this.props.audioPlayerJS;
        this.audioPlayerJS.listenOnLowpassFrequencyChange(this.onLowpassFrequencyChange.bind(this))
        this.audioPlayerJS.listenOnLowpassQualityChange(this.onLowpassQualityChange.bind(this))
        this.audioPlayerJS.listenOnHighshelfFrequencyChange(this.onHighshelfFrequencyChange.bind(this))
    }


    onLowpassQualityChange (quality) {
      this.state.lowpassQuality = quality
      this.setState(this.state)
    }

    onLowpassFrequencyChange (frequency) {
      this.state.lowpassFrequency = frequency
      this.setState(this.state)
    }

    onHighshelfFrequencyChange (frequency) {
      this.state.highshelfFrequency = frequency
      this.setState(this.state)
    }

    displayInfo(e){
        let state = this.state
        state.usedFilter = e.target.name
        this.setState(state)
        this.onChangeFilter()
    }

    onChangeFilter(){
        console.log(this.state.usedFilter)
        console.log(this.state.useLowPass)
        console.log(this.state.useHighshelf)
        if((this.state.usedFilter === 'Lowpass Frequency' || this.state.usedFilter === 'Lowpass Quality') && this.state.useLowPass === false){
            this.props.onFilterUsedError(this.state.usedFilter);
        }
        else if(this.state.usedFilter === 'Highshelf Frequency' && this.state.useHighshelf === false){
            this.props.onFilterUsedError(this.state.usedFilter);
        }
        else{
            this.props.onFilterUsedError('no Failure');
        }
    }

    checkboxClicked(name){
        if(name === "lowPass") {
            if(this.state.useLowPass === false){
                this.setState({useLowPass: true});
            }
            else if(this.state.useLowPass === true){
                this.setState({useLowPass: false});
            }
        }
        else if(name === "highShelf") {
            if(this.state.useHighshelf === false){
                this.setState({useHighshelf: true});
            }
            else if(this.state.useHighshelf === true){
                this.setState({useHighshelf: false});
            }
        }
        this.onChangeFilter()
    }

    render() {
        return <div className="filterBox">
            <Checkbox audioPlayerJS={this.audioPlayerJS} clickCheckbox={this.checkboxClicked.bind(this)}/>
            <div className="sliderBox">
                <div className="filterBubble" id="volumeBox"><p>Volume</p></div>
                <p>Lowpass Frequency</p>
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={1}
                       step={0.01}
                       value={this.state.lowpassFrequency}
                       name="Lowpass Frequency"
                       onChange={event => this.audioPlayerJS.changeLowpassFilterFrequency(event.target.value)}
                       onMouseEnter={this.displayInfo.bind(this)}
                       //onMouseLeave={this.vanishInfo.bind(this)}
                />
                <div className="filterBubble" id="lowpassFrequency"><p>Lowpass Frequency</p></div>
                <p>Lowpass Quality</p>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={1}
                       step={0.01}
                       value={this.state.lowpassQuality}
                       name="Lowpass Quality"
                       onChange={event => this.audioPlayerJS.changeLowpassFilterQuality(event.target.value)}
                       onMouseEnter={this.displayInfo.bind(this)}
                       //onMouseLeave={this.vanishInfo.bind(this)}
                />
                <div className="filterBubble" id="lowpassQuality"><p>Lowpass Quality</p></div>
                <p>Highshelf Frequency</p>
                <input className="sliderFilter"
                       type="range"
                       min={0} max={9500} step={1}
                       value={this.state.highshelfFrequency}
                       name="Highshelf Frequency"
                       onChange={event => this.audioPlayerJS.changeHighshelfFilterFrequency(parseInt(event.target.value))}
                       onMouseEnter={this.displayInfo.bind(this)}
                       //onMouseLeave={this.vanishInfo.bind(this)}
                />
                <div className="filterBubble" id="highshelfFrequency"><p>Highshelf Frequency</p></div>
            </div>
        </div>
    }
}

AudioFilter.propTypes = {
    onFilterUsedError: PropTypes.func,
};
