import React from "react";

export default class Checkbox extends React.Component {

    constructor(props) {
        super(props);

        this.clickLowPass = this.clickLowPass.bind(this);
        this.clickHighshelf = this.clickHighshelf.bind(this);

        this.audioPlayerJS = this.props.audioPlayerJS;
    }

    clickLowPass() {
        this.audioPlayerJS.toggleLowpass();
    }

    clickHighshelf() {
        this.audioPlayerJS.toggleHighshelf();
    }

    render() {

        let lowPass = {
            width: '40%',
        };

        return (
            <div>
                <p className="filterTitle" style={lowPass}>Lowpass:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickLowPass}
                />
                <p className="filterTitle">Highshelf:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickHighshelf}
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


