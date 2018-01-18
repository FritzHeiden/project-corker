import React from 'react'
import PropTypes from 'prop-types'

export default class VideoFilter extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      invertColor: false,
      chromaKeyAlpha: false,
      grayScale: false,
    }
  }

  changeInvertColor (status) {
    this.setState({invertColor: status})
    this.props.usedFilter('invertColor', status)
  }

  changeChromaKeyAlpha (status) {
    this.setState({chromaKeyAlpha: status})
    this.props.usedFilter('chromaKeyAlpha', status)
  }

  changeGrayScale (status) {
    this.setState({grayScale: status})
    this.props.usedFilter('grayScale', status)
  }

  render () {

    return (
      <div className="filterBox">
        <p className="filterTitle">Invert Color:</p>
        <input
          className="container"
          type="checkbox"
          onClick={event => this.changeInvertColor(event.target.checked)}
          checked={this.state.invertColor}
        />
        <p className="filterTitle" >Chroma Key Alpha:</p>
        <input
          className="container"
          type="checkbox"
          onClick={event => this.changeChromaKeyAlpha(event.target.checked)}
          checked={this.state.chromaKeyAlpha}
        />
        <p className="filterTitle">Gray Scale:</p>
        <input
          className="container"
          type="checkbox"
          onClick={event => this.changeGrayScale(event.target.checked)}
          checked={this.state.grayScale}
        />
      </div>
    )
  }
}

VideoFilter.propTypes = {
  usedFilter: PropTypes.func,
}

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
    <button className="filter" onDrag={this.mouseClicked}></button>*/
}