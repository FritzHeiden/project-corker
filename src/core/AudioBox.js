import React from 'react';
import ReactDOM from 'react-dom';

import Line from './Line.js';
import * as audio from './js/audioplayer.js';
import * as drop from './js/dragAndDrop.js';

class AudioBox extends React.Component {

  constructor(props){
    super(props);
  }

   render() {
     const {last} = this.props;

      return (
        <div>
          <div className="audioBox">
            <AudioPlayer/>
            <Line/>
            <Player/>
            <Line/>
            <Filter/>
           </div>
         </div>
      );
   }
}

class AudioPlayer extends React.Component {

  constructor(props){
    super(props);

    this.drop = this.drop.bind(this);
    this.allowDrop = this.allowDrop.bind(this);
  }

  allowDrop(e) {
    //this.allowDrop(this);
    e.preventDefault();
  }

  drop(e) {
      //drop.drop(this);
      e.preventDefault();
      var data = e.dataTransfer.getData("text");
      console.log("dropped");
      //e.target.appendChild(document.getElementById(data));
  }

  render(){

    let audio =
    {
      height: "5rem",
      width: "85%",
      position: "relative",
      backgroundColor: "#323232",
      /*border: "3px solid #00868B",*/
      left: "0%",
      margin: "2% 0 2% 0",
    }
    return(
      <div>
        <canvas id="canvasPlayer" style={audio} width="300" height="300"  onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(event)}></canvas>
      </div>
    );
  }
}

class Player extends React.Component {
  render(){
    return(
      <div className="minimalButtons">
        <button className="player">10 sec +</button><br/>
        <button className="player">Play</button><br/>
        <button className="player">10 sec -</button><br/>
      </div>
    );
  }
}

class Filter extends React.Component {

  constructor(props){
    super(props);
    this.state = { x: 0, y: 0, clicked: 0};
    this.mouseDragged = this.mouseDragged.bind(this);
    this.clicked = this.clicked.bind(this);
  }

  clicked(e){
    if(this.state.clicked == 0){
      this.setState({ clicked: 1});
      this.setState({ x: e.screenX, y: e.screenY });
    }
    else if(this.state.clicked == 1){
      let y = e.screenY;

      let difference = y - this.state.y;
      console.log(difference);

      this.setState({ clicked: 0 });
    }
  }

  mouseDragged(e){
    this.setState({ x: e.screenX, y: e.screenY });
    console.log(this.state.x +", " + this.state.y);
    audio.clicked(this.state.x, this.state.y);
  }

  render(){
    return(
      <div className="filterBox">
        <div className="filter" id="filterButton_1" onClick={this.clicked.bind(this)}>
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

export default AudioBox;
