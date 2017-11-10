import React from 'react';
import Line from './Line.js';

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
  render(){

    let audio =
    {
      height: "5rem",
      width: "85%",
      position: "relative",
      backgroundColor: "white",
      border: "3px solid #00868B",
      left: "7.5%",
    }
    return(
      <div style={audio}></div>
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
  render(){
    return(
      <div className="filterBox">
        <button className="filter"></button>
        <button className="filter"></button>
        <button className="filter"></button>
        <button className="filter"></button>
        <button className="filter"></button>
      </div>
    );
  }
}

export default AudioBox;
