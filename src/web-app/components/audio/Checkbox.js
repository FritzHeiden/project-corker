import React from 'react'
import PropTypes from 'prop-types'

export default class Checkbox extends React.Component {

  constructor (props) {
    super(props)

    this.state = ({
      lowpassActive: false,
      highshelfActive: false,
    })

    this.audioPlayer = this.props.audioPlayer

    this.audioPlayer.listenOnToggleLowpass(this.onToggleLowpass.bind(this))
    this.audioPlayer.listenOnToggleHighshelf(this.onToggleHighshelf.bind(this))
  }

  onToggleLowpass (active) {
    this.state.lowpassActive = active
    this.setState(this.state)
  }

  onToggleHighshelf (active) {
    this.state.highshelfActive = active
    this.setState(this.state)
  }

  set highshelf (active) {
    this.audioPlayer.setHighshelf(active)
    this.state.highshelfActive = active
    this.setState(this.state)
    this.props.clickCheckbox('highshelf', active)
  }

  set lowpass (active) {
    this.audioPlayer.setLowpass(active)
    this.state.lowpassActive = active
    this.setState(this.state)
    this.props.clickCheckbox('lowpass', active)
  }

  render () {

    return (
      <div className="filterBox">
        <p className="filterTitle">Lowpass:</p>
        <input
          type="checkbox"
          onClick={event => this.lowpass = event.target.checked}
          checked={this.state.lowpassActive}
        />
        <p className="filterTitle">Highshelf:</p>
        <input
          type="checkbox"
          onClick={event => this.highshelf = event.target.checked}
          checked={this.state.highshelfActive}
        />
      </div>

    )
  }
}

Checkbox.propTypes = {
  changeStartStop: PropTypes.func,
}

{/*
<div class="checkboxThree">
					<input type="checkbox" value="1" id="checkboxThreeInputMob" name="slider" onclick="sliderState()" />
					<label for="checkboxThreeInputMob"></label>
				</div>
*/
}


