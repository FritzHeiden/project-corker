import React from 'react';
import ReactDOM from 'react-dom';

import Line from './Line.js';
import * as audio from './js/audioplayer.js';
import * as drop from './js/dragAndDrop.js';

/* Images */
import NextButton from './svg/Next.js';
import PauseButton from './svg/Pause.js';
import PreviousButton from './svg/Pre.js';
import StartButton from './svg/Start.js';


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

  constructor(props){
    super(props);

    this.state = {
      click: false
    }
    this.buttonClicked = this.buttonClicked.bind(this);
   }

   /* doesn't work */
   buttonClicked(){
     if(this.state.click === false){
       this.setState({click: true});
     }
     else if(this.state.click === true){
       this.setState({click: false});
     }
   }


  render(){

    var all = {
      fill: "none",
      stroke:"#95989a",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }

    var one = {
      strokeWidth: "13px",
    }

    var two = {
      strokeWidth: "9px",
    }

    const clicked = this.state.click;
     return (
       <div className="minimalButtons">
        <PreviousButton/>
        {clicked ?
          (<PauseButton onClick={this.buttonClicked}/>) :
          (<StartButton onClick={this.buttonClicked}/>)
        }
        <NextButton/>
       </div>
     );
  }
}

class Filter extends React.Component {

  constructor(props){
    super(props);
    this.state = { startX: 0, endX: 0, startY: 0, endY: 0, clicked: 0};
    this.changeVolume = this.changeVolume.bind(this);
    this.setStart = this.setStart.bind(this);
  }

  setStart(e){
    if(this.state.clicked == 0){
      this.setState({ startY: e.screenY});
      this.setState({ startX: e.screenX});
      this.setState({ clicked: 1});
      console.log("Hallo");
    }
    else if(this.state.clicked == 1){
      this.setState({ clicked: 0});
    }
  }

  /* Doesn't work well */
  changeVolume(e){

    if(this.state.clicked == 1){

      let elementSize = 50;
      var position = document.getElementById('filterButton_1').getBoundingClientRect();
      let middleX = position.left + elementSize/2;
      let middleY = position.top + elementSize/2;

      let y = e.screenY;
      let x = e.screenX;

      this.setState({ endY: e.screenY});
      this.setState({ endX: e.screenX});
      console.log("Ende der Line: " + this.state.endX + ", " + this.state.endY);
      console.log("Mittelpunkt Kreis: " + middleX +", " + middleY);


      let dy = this.state.endY - middleY;
      let dx = this.state.endX - middleX;
      let theta = Math.atan(dy/dx);
      theta *= 180/Math.PI;

      let object = e.target.id
      let filter = document.getElementById(object);
      filter.style.transform = 'rotate('+theta+'deg)';
    }
  }


  render(){
    return(
      <div className="filterBox">
        <div className="filter" id="filterButton_1" onClick={this.setStart.bind(this)} onMouseMove={this.changeVolume.bind(this)} >
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
