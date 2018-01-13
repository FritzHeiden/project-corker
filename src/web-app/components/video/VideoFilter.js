import React from "react";
import PropTypes from 'prop-types';

export default class VideoFilter extends React.Component {

    constructor(props){
        super(props);

        this.state ={
            invertColor: false,
            chromaKeyAlpha: false,
            grayScale: false,
        };
    }

    changeInvertColor(){
        if(this.state.invertColor === true){
            this.setState({invertColor: false});
        }
        else if(this.state.invertColor === false){
            this.setState({invertColor: true});
        }
        this.props.usedFilter("invertColor")
    }

    changeChromaKeyAlpha(){
        if(this.state.chromaKeyAlpha === true){
            this.setState({chromaKeyAlpha: true});
        }
        else if(this.state.chromaKeyAlpha === false){
            this.setState({chromaKeyAlpha: true});
        }
        this.props.usedFilter("chromaKeyAlpha")
    }
    changeGrayScale(){
        if(this.state.grayScale === true){
            this.setState({grayScale: true});
        }
        else if(this.state.grayScale === false){
            this.setState({grayScale: true});
        }
        this.props.usedFilter("grayScale")
    }

    render() {

        let checkboxWidth = {
            width: '50%',
        };

        let leftPositionCheckbox2 = {
            left: '12%',
        };

        let leftPositionCheckbox1 = {
            left: '12%',
        };

        return (
            <div className="filterBox">
                <p className="filterTitle" style={checkboxWidth}>Invert Color:</p>
                <input
                    style={leftPositionCheckbox1}
                    className="container"
                    type="checkbox"
                    onClick={this.changeInvertColor.bind(this)}
                    checked={this.state.invertColor}
                />
                <p className="filterTitle">Chroma Key Alpha:</p>
                <input
                    className="container"
                    type="checkbox"
                    onClick={this.changeChromaKeyAlpha.bind(this)}
                    checked={this.state.chromaKeyAlpha}
                />
                <p className="filterTitle" style={checkboxWidth}>Gray Scale:</p>
                <input
                    style={leftPositionCheckbox2}
                    className="container"
                    type="checkbox"
                    onClick={this.changeGrayScale.bind(this)}
                    checked={this.state.grayScale}
                />
            </div>
        );
    }
}

VideoFilter.propTypes = {
    usedFilter: PropTypes.func,
};


{/*

                constructor(props) {
        super(props);
        this.state = {startX: 0, endX: 0, startY: 0, endY: 0, clicked: 0, rotate: 0};
        this.changeVolume = this.changeVolume.bind(this);
        this.setStart = this.setStart.bind(this);
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

    /* Doesn't work well
    changeVolume(event) {

    if (this.state.clicked === 1) {
        let elementSize = 50;

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

    <button className="filter" id="filterButton_1" draggable="true" onDragOver={this.mouseDragged} onDragStart={this.mouseDragged}></button>
    <button className="filter" onDrag={this.mouseClicked}></button>
    <button className="filter" onDrag={this.mouseClicked}></button>
    <button className="filter" onDrag={this.mouseClicked}></button>
    <button className="filter" onDrag={this.mouseClicked}></button>*/}