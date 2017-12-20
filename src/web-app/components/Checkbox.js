import React from "react";

class Checkbox extends React.Component {

    constructor(props){
        super(props);

        this.clickLowPass = this.clickLowPass.bind(this);
        this.clickHighshelf = this.clickHighshelf.bind(this);

        this.audioPlayerJS = this.props.audioPlayerJS;
    }

    clickLowPass(event) {
        this.audioPlayerJS.toggleLowpass();
    }

    clickHighshelf(event) {
        this.audioPlayerJS.toggleHighshelf();
    }

    render(){

        let lowPass={
            width: '59%',
        };

        return (
            <div>
                <p className="filterTitle" style={lowPass}>Low pass filter:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickLowPass}
                />
                <p className="filterTitle">High shelf filter:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.clickHighshelf}
                />

            </div>

        );
    }
}

export default Checkbox;
