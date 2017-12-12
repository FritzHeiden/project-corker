import React from 'react';
import Line from './Line.js';
import {AudioFileAnalyser} from '../analysis/audio-file-analyser.js';
import { movebar } from '../test/moveBar.js';
import StartStopButton from '../svg/StartStopButton.js';

class AudioBox extends React.Component {
  constructor(props){
    super(props);
  }

   render() {
      return (
          <div className="audioBox">
            <AudioPlayer/>
            <Line/>
            <Player/>
            <Line/>
            <Filter/>
           </div>
      );
   }
}

class AudioPlayer extends React.Component {

  constructor(props){
    super(props);

    AudioPlayer.drop = AudioPlayer.drop.bind(this);
    AudioPlayer.allowDrop = AudioPlayer.allowDrop.bind(this);

    //this.canvas = new CanvasElements(document.getElementById('canvasPlayer'));
    //this.canvas.createCavasElements();
    //this.musicBeams = new AudioHeights();
    //this.musicBeams.createBeam();
  }

  static allowDrop(e) {
    //this.allowDrop(this);
    e.preventDefault();
    e.dataTransfer.setData("text", e.target.id);
  }

  static drop(e) {
      //drop.drop(this);
      e.preventDefault();
      var data = e.dataTransfer.getData("text");
      console.log(document.getElementById(data).innerText);
  }

  static updateSoundBar(){

      let bar = [10];
      const numbers = [1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5,1, 2, 3, 4, 5];

      let barStyle={

      };

      let listItems = numbers.map((number) =>
          <div className='bar' style={barStyle} onLoad={movebar()}></div>
      );
      return listItems;
  }

  render(){

    let audio =
    {
      height: "6rem",
      backgroundColor: "rgb(50, 50, 50)",
      margin: "2%",
    };

    let overflowY =
    {
        overflowY: "hidden",
    };

    return(
      <div id="testMusic" style={overflowY} onDrop={AudioPlayer.drop.bind(this)} onDragOver={AudioPlayer.allowDrop.bind(event)}>
       <div style={audio}>
           {AudioPlayer.updateSoundBar()}
        </div>
      </div>
    );
  }
}


// <canvas id="canvasPlayer" style={audio} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(event)}></canvas>

class Player extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
     return (
       <div className="minimalButtons">
        <StartStopButton/>

        {/*
          <PreviousButton/>
          <NextButton/>
          */}

       </div>
     );
  }
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
      <input className="slider" type="range" min={0} max={100} defaultValue={50}/>
      <input className="slider" type="range" min={0} max={100} defaultValue={50}/>
      <input className="slider" type="range" min={0} max={100} defaultValue={50}/>
{/*

        <div className="filter"
        style={{transform: 'rotate('+this.state.rotate+'deg)', WebkitTransform: 'rotate('+this.state.rotate+'deg)'}} ref = "filterButton" onClick={this.setStart.bind(this)} onMouseMove={this.changeVolume.bind(this)} >
          <div className="dot"></div>
        </div>
        <button className="filter" id="filterButton_1" draggable="true" onDragOver={this.mouseDragged} onDragStart={this.mouseDragged}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
        <button className="filter" onDrag={this.mouseClicked}></button>
*/}
      </div>
    );
  }
}

export default AudioBox;
