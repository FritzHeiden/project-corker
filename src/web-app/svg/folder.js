import React from 'react';
import ReactDOM from 'react-dom';

import * as sidebar from '../test/sidebar.js';

class FolderButton extends React.Component {
  constructor(props){
    super(props);

    this.click= this.click.bind(this);
  }


  click(){
    console.log("Gehe ein verzeichnis zurück");
  }

 render() {

   let width= {
     width: "11%",
   }
   let zero =
   {
     fill: "#323232",
    }

    let one =
    {
      fill: "#95989A",
    }

    return (
      <svg viewBox="0 0 48 48" style={width} onClick={this.click}>
        <g>
        <path style={zero} d="M 40 12 L 22 12 L 18 8 L 8 8 C 5.800781 8 4 9.800781 4 12 L 4 20 L 44 20 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
        <path style={one} d="M 40 12 L 8 12 C 5.800781 12 4 13.800781 4 16 L 4 36 C 4 38.199219 5.800781 40 8 40 L 40 40 C 42.199219 40 44 38.199219 44 36 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
        </g>
      </svg>
    );
 }
}

export default FolderButton;
