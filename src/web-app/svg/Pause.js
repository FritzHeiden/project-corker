import React from 'react';

class PauseButton extends React.Component {
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
      <svg x="0px" y="0px" viewBox="0 0 500 500">
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

export default PauseButton;
