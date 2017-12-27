import React from 'react';

export default class Video extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="finalVideo">
        <canvas/>
      </div>
    );
  }
}

{/*        <VideoPlayer style={video} src="http://www.html5rocks.com/en/tutorials/video/basics/devstories.mp4"/>

    let video =
    {
      height: "2rem",
      width: "7.5%",
    }
*/}
