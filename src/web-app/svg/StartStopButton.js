import React from 'react';
import PropTypes from 'prop-types';

export default class StartStopControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {click: true};
    this.clicked = this.clicked.bind(this);

    this.audioPlayerJS = this.props.audioPlayerJS;
  }
  
  clicked(){
    // console.log(this.state.click);

    if(this.state.click === false)
    {
      this.setState({click: true});
        this.audioPlayerJS.pausePlay();
    }
    else if(this.state.click === true)
    {
      this.setState({click: false});
        this.audioPlayerJS.pausePlay();
    }
  }

  render() {
      let clicked = this.state.click;

    let zero =
    {
      fill: "#1e1e1e",
    };

     let one =
     {
       fill: "#1e1e1e",
       stroke: "none",
       strokeWidth: "8",
       strokeLinecap: "round",
       strokeLinejoin: "round",
       strokeMiterlimit: "10",
      };

      let two =
      {
        fill: "none",
        stroke: "#1e1e1e",
        strokeWidth: "8",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: "10",
      };

    return (
      <div onClick={this.clicked}>
        {clicked ? (
          <div onClick={this.props.changeStartStop}>
            <svg x="0px" y="0px" viewBox="0 0 500 500">
              <g>
               <path style={zero} d="M493,7v486H7V7H493 M493-0.3H7C3-0.3-0.3,3-0.3,7v486c0,4,3.3,7.3,7.3,7.3h486c4,0,7.3-3.3,7.3-7.3V7C500.3,3,497-0.3,493-0.3L493-0.3z"/>
              </g>
              <polyline style={one} points="390.5,249.5 176.7,352.8 176.5,352.5 176.5,146.5 176.8,146.3 390.5,249.5 "/>
            </svg>
          </div>
       ) : (
         <div onClick={this.props.changeStartStop}>
           <svg x="0px" y="0px" viewBox="0 0 500 500">
             <g>
              <path style={zero} d="M493,7v486H7V7H493 M493-0.3H7C3-0.3-0.3,3-0.3,7v486c0,4,3.3,7.3,7.3,7.3h486c4,0,7.3-3.3,7.3-7.3V7C500.3,3,497-0.3,493-0.3L493-0.3z"/>
             </g>
             <path style={two} d="M168,103"/>
             <g>
              <rect x="175" y="91" style={zero} width="30" height="318"/>
              <rect x="295" y="91" style={zero} width="30" height="318"/>
             </g>
           </svg>
         </div>
       )}
      </div>
    );
  }
}

StartStopControl.propTypes = {
  changeStartStop: PropTypes.func,
};