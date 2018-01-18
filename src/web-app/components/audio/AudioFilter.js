import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from './Checkbox.js'

export default class AudioFilter extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      usedFilter: '',
      lowpassFrequency: 1,
      lowpassQuality: 0,
      highshelfFrequency: 9500,
      lowpass: false,
      highshelf: false,
    }

    this.displayInfo = this.displayInfo.bind(this)
    this.audioPlayer = this.props.audioPlayer
    this.audioPlayer.listenOnLowpassFrequencyChange(this.onLowpassFrequencyChange.bind(this))
    this.audioPlayer.listenOnLowpassQualityChange(this.onLowpassQualityChange.bind(this))
    this.audioPlayer.listenOnHighshelfFrequencyChange(this.onHighshelfFrequencyChange.bind(this))
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

  displayInfo (e) {
    let state = this.state
    state.usedFilter = e.target.name
    this.setState(state)
    this.onChangeFilter()
  }

  onChangeFilter () {
    if ((this.state.usedFilter === 'Lowpass Frequency' || this.state.usedFilter === 'Lowpass Quality') && this.state.lowpass === false) {
      this.props.onFilterUsedError(this.state.usedFilter)
    }
    else if (this.state.usedFilter === 'Highshelf Frequency' && this.state.highshelf === false) {
      this.props.onFilterUsedError(this.state.usedFilter)
    }
    else {
      this.props.onFilterUsedError('no Failure')
    }
  }

  checkboxClicked (name, active) {
    switch (name) {
      case 'lowpass':
        this.state.lowpass = active
        this.setState(this.state)
        break
      case 'highshelf':
        this.state.highshelf = active
        this.setState(this.state)
        break
    }
    this.onChangeFilter()
  }

  render () {
    return <div>
      <Checkbox audioPlayer={this.audioPlayer} clickCheckbox={this.checkboxClicked.bind(this)}/>
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
               onChange={event => this.audioPlayer.changeLowpassFilterFrequency(event.target.value)}
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
               onChange={event => this.audioPlayer.changeLowpassFilterQuality(event.target.value)}
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
               onChange={event => this.audioPlayer.changeHighshelfFilterFrequency(parseInt(event.target.value))}
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
}