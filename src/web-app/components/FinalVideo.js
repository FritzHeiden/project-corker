import React from 'react';
import ReactDOM from 'react-dom';
import {VideoPlayer} from 'react-video-players';

import Line from './Line.js';
import * as drop from '../test/dragAndDrop.js';

/* Images */
import NextButton from '../svg/Next.js';
import PauseButton from '../svg/Pause.js';
import PreviousButton from '../svg/Pre.js';
import StartButton from '../svg/Start.js';
import StartStopButton from '../svg/StartStopButton.js';



class Video extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    let video =
    {
      height: "2rem",
      width: "7.5%",
    }
    return(
      <div className="finalVideo">
        <VideoPlayer style={video} src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4"/>
      </div>
    );
  }
}

export default Video;
