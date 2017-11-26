import React from 'react';
import ReactDOM from 'react-dom';

import * as AudioPlayer from '../audio/player.js';

class StartStopControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {click: false};

    this.clicked = this.clicked.bind(this);
  }

  componentDidMount() {
    this.clicked();
  }

  clicked(){
    console.log(this.state.click);

    //AudioPlayer.pausePlay();

    if(this.state.click === false)
    {
      this.state = {click: true};
    }
    else if(this.state.click === true)
    {
      this.state = {click: false};
    }
  }

  render() {
    let clicked = this.state.click;

    return (
      <div onClick={this.clicked}>
        {clicked ? (
          <StartButton/>
       ) : (
         <StopButton/>
       )}
      </div>
    );
  }
}

class StopButton extends React.Component {

  constructor(props) {
    super(props);

    this.stop = this.stop.bind(this);
  }

  stop() {

  //  PlayerJS.pausePlay();
  }

  render() {
    const {title} = this.props;

    let zero =
    {
      fill: "#323232",
     }

     let one =
     {
       fill: "none",
       stroke: "#95989A",
       strokeWidth: "8",
       strokeLinecap: "round",
       strokeLinejoin: "round",
       strokeMiterlimit: "10",
     }

    return (
      <svg x="0px" y="0px" viewBox="0 0 500 500" onClick={this.stop}>
        <g>
         <path style={zero} d="M493,7v486H7V7H493 M493-0.3H7C3-0.3-0.3,3-0.3,7v486c0,4,3.3,7.3,7.3,7.3h486c4,0,7.3-3.3,7.3-7.3V7C500.3,3,497-0.3,493-0.3L493-0.3z"/>
        </g>
        <path style={one} d="M168,103"/>
        <g>
         <rect x="175" y="91" style={zero} width="30" height="318"/>
         <rect x="295" y="91" style={zero} width="30" height="318"/>
        </g>
      </svg>
    );
  }
}

class StartButton extends React.Component{

  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
  }

  start() {
//    PlayerJS.pausePlay();
    console.log("Run");
  }

  render() {

    let zero =
    {
      fill: "#323232",
    }

     let one =
     {
       fill: "#323232",
       stroke: "none",
       strokeWidth: "8",
       strokeLinecap: "round",
       strokeLinejoin: "round",
       strokeMiterlimit: "10",
      }

     return (
         <svg x="0px" y="0px" viewBox="0 0 500 500" onClick={this.start}>
           <g>
           	<path style={zero} d="M493,7v486H7V7H493 M493-0.3H7C3-0.3-0.3,3-0.3,7v486c0,4,3.3,7.3,7.3,7.3h486c4,0,7.3-3.3,7.3-7.3V7C500.3,3,497-0.3,493-0.3L493-0.3z"/>
           </g>
           <polyline style={one} points="390.5,249.5 176.7,352.8 176.5,352.5 176.5,146.5 176.8,146.3 390.5,249.5 "/>
         </svg>
     );
   }
}

export default StartStopControl;
