import React from "react";
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            lowpassActive: false,
            highshelfActive: false,
        });

        this.clickLowPass = this.clickLowPass.bind(this);
        this.clickHighshelf = this.clickHighshelf.bind(this);

        this.audioPlayerJS = this.props.audioPlayerJS;

      this.audioPlayerJS.listenOnToggleLowpass(this.onToggleLowpass.bind(this))
      this.audioPlayerJS.listenOnToggleHighshelf(this.onToggleHighshelf.bind(this))
    }

    clickLowPass() {
        this.audioPlayerJS.toggleLowpass();

        if(this.state.lowpassActive === true){
            this.setState({lowpassActive: false});
        }
        else if(this.state.lowpassActive === false){
            this.setState({lowpassActive: true});
        }
        this.callfather("lowPass");
    }

    clickHighshelf() {
        this.audioPlayerJS.toggleHighshelf();
        if(this.state.highshelfActive === true){
            this.setState({highshelfActive: false});
        }
        else if(this.state.highshelfActive === false){
            this.setState({highshelfActive: true});
        }
        this.callfather("highShelf");
    }

    callfather(nameCheckbox){
        this.props.clickCheckbox(nameCheckbox);
    }

  onToggleLowpass (active) {
    this.state.lowpassActive = active
    this.setState(this.state)
  }

  onToggleHighshelf (active) {
    this.state.highshelfActive = active
    this.setState(this.state)
  }

    render() {

        return (
            <div className="filterBox">
                <p className="filterTitle">Lowpass:</p>
                <input
                    type="checkbox"
                    onClick={this.clickLowPass}
                    checked={this.state.lowpassActive}
                />
                <p className="filterTitle">Highshelf:</p>
                <input
                    type="checkbox"
                    onClick={this.clickHighshelf}
                    checked={this.state.highshelfActive}
                />
            </div>

        );
    }
}

Checkbox.propTypes = {
    changeStartStop: PropTypes.func,
};


{/*
<div class="checkboxThree">
					<input type="checkbox" value="1" id="checkboxThreeInputMob" name="slider" onclick="sliderState()" />
					<label for="checkboxThreeInputMob"></label>
				</div>
*/
}


