import React from 'react';
import Line from './Line.js';
import StartStopButton from '../svg/StartStopButton.js';

class VideoBox extends React.Component {
  constructor(props){
    super(props);
  }

   render() {
      return (
          <div className="audioBox">
            <Video/>
            <Line/>
            <Filter/>
           </div>
      );
   }
}

class Video extends React.Component {

  constructor(props){
    super(props);

    this.state={
      play: false,
    };

    Video.drop = Video.drop.bind(this);
    Video.allowDrop = Video.allowDrop.bind(this);
    this.videoStartStop = this.videoStartStop.bind(this);

    /**
    onPause:Function - Callback to pause video
    onPlay:Function - Callback to play video
    onSeek:Function - Callback to seek video
    */
  }

  videoStartStop(){
    console.log("TestFunction");
    if(this.state.play === false){
      this.setState({play : true});
    }
    else if(this.state.play === true){
      this.setState({play : false});
    }
  }

  static allowDrop(e) {
    e.preventDefault();
  }

  static drop(e) {
      e.preventDefault();
      //var data = e.dataTransfer.getData("text");
      console.log("dropped");
  }

  render(){

     /* let video =
    {
      height: "5rem",
      width: "85%",
      position: "relative",
      backgroundColor: "#323232",
      left: "0%",
      margin: "2% 0 2% 0",
    };*/

    let DisplayNone =
    {
      display: "none",
    };

    return(
      <div>
        <video id="film" width="100" height="100">
            <source src="test.ogv" type="video/ogg"/>{/* TODO Findet Video nicht */}
        </video>
        <canvas id="zwischenablage" width="100" height="100" style={DisplayNone}></canvas>
        <canvas id="ziel" width="100" height="100"></canvas>

        {/* canvas elemet
        <VideoPlayer id="testVideo" style={video} src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4"
          play={this.state.play}/>*/}
        <Line/>
        <div className="minimalButtons">
         <StartStopButton changeStartStop={this.videoStartStop}/>
        </div>
      </div>


    );
  }
  /*
    <PreviousButton/>
    <StartStopButton changeStartStop={this.videoStartStop}/>
    <NextButton/>
    */
}

class Filter extends React.Component {

  constructor(props){
    super(props);
    this.state = { startX: 0, endX: 0, startY: 0, endY: 0, clicked: 0, rotate: 0};
    this.changeVolume = this.changeVolume.bind(this);
    this.setStart = this.setStart.bind(this);
  }

  setStart(e){
    if(this.state.clicked === 0){
      this.setState({ startY: e.screenY});
      this.setState({ startX: e.screenX});
      this.setState({ clicked: 1});
    }
    else if(this.state.clicked === 1){
      this.setState({ clicked: 0});
    }
  }

  /* Doesn't work well */
  changeVolume(event){

    if(this.state.clicked === 1){
      let elementSize = 50;

      var position = this.refs.filterButton.getBoundingClientRect();
      let middleX = position.left + elementSize/2;
      let middleY = position.top + elementSize/2;

      let y = event.screenY;
      let x = event.screenX;

      this.setState({ endY: event.screenY});
      this.setState({ endX: event.screenX});
      console.log("Ende der Line: " + this.state.endX + ", " + this.state.endY);
      console.log("Mittelpunkt Kreis: " + middleX +", " + middleY);


      let dy = this.state.endY - middleY;
      let dx = this.state.endX - middleX;
      let theta = Math.atan(dy/dx);
      theta *= 180/Math.PI;

      //let object = this.refs.filterButton;
      //let filter = document.getElementById(object);
      //filter.style.transform = 'rotate('+theta+'deg)';

      this.setState({rotate: 90});
    }
  }


  render(){

    return(
      <div className="filterBox">
        <div className="filter"
        style={{transform: 'rotate('+this.state.rotate+'deg)', WebkitTransform: 'rotate('+this.state.rotate+'deg)'}} ref = "filterButton" onClick={this.setStart.bind(this)} onMouseMove={this.changeVolume.bind(this)} >
          <div className="dot">

          </div>
        </div>

{/*
        <button className="filter" id="filterButton_1" draggable="true" onDragOver={this.mouseDragged} onDragStart={this.mouseDragged}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>*/}
      </div>
    );
  }
}

export default VideoBox;
