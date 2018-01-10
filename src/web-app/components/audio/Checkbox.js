import React from "react";

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {lowpass: false, highshelf: false}

        this.clickLowPass = this.clickLowPass.bind(this);
        this.clickHighshelf = this.clickHighshelf.bind(this);

        this.audioPlayerJS = this.props.audioPlayerJS;

      this.audioPlayerJS.listenOnToggleLowpass(this.onToggleLowpass.bind(this))
      this.audioPlayerJS.listenOnToggleHighshelf(this.onToggleHighshelf.bind(this))
    }

    clickLowPass() {
        this.audioPlayerJS.toggleLowpass();
    }

    clickHighshelf() {
        this.audioPlayerJS.toggleHighshelf();
    }

  onToggleLowpass (active) {
    this.state.lowpass = active
    this.setState(this.state)
  }

  onToggleHighshelf (active) {
    this.state.highshelf = active
    this.setState(this.state)
  }

    render() {

        let lowPass = {
            width: '32%',
        };

        return (
            <div>
                <p className="filterTitle" style={lowPass}>Lowpass:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickLowPass}
                    checked={this.state.lowpass}
                />
                <p className="filterTitle">Highshelf:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickHighshelf}
                    checked={this.state.highshelf}
                />

            </div>

        );
    }
}


{/*
<div class="checkboxThree">
					<input type="checkbox" value="1" id="checkboxThreeInputMob" name="slider" onclick="sliderState()" />
					<label for="checkboxThreeInputMob"></label>
				</div>
*/
}


