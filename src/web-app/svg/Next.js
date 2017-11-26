import React from 'react';

class NextImage extends React.Component {

  constructor(props){
    super(props);
  }


 render() {

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
      <svg x="0px" y="0px" viewBox="0 0 500 500" onClick={this.play}>
        <g>
        	<path style={zero} d="M493,7v486H7V7H493 M493-0.3H7C3-0.3-0.3,3-0.3,7v486c0,4,3.3,7.3,7.3,7.3h486c4,0,7.3-3.3,7.3-7.3V7C500.3,3,497-0.3,493-0.3L493-0.3z"/>
        </g>
        <path style={one} d="M140.6,104.4"/>
        <path style={one} d="M122.7,115.2"/>
        <path style={one} d="M405.7,272.5"/>
        <path style={one} d="M405,274.3"/>
        <path style={one} d="M121.7,431.5"/>
        <polygon style={zero} points="140.2,121.4 152.7,141.2 236.8,252.9 161,350.3 140.2,378 350,259.2 "/>
      </svg>
    );
 }
}

export default NextImage;
