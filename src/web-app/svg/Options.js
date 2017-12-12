import React from 'react';
import {Sidebar} from '../test/sidebar.js';

class OptionsButton extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      clickedMenu: false
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
    //this.handleCrossClick = this.handleCrossClick.bind(this);
   }

   handleMenuClick() {
     if(this.state.clickedMenu === false){
       this.setState({clickedMenu: true});
       Sidebar.showSidebar();
     }

     else if(this.state.clickedMenu === true){
       this.setState({clickedMenu: false});
       Sidebar.closeSidebar();
     }
   }

 render() {
    return (
       <div id="menuButtons" onClick={this.handleMenuClick}>
         <svg className="MenuButton" viewBox="0 0 452 269">
           <g>
             <g>
               <line className="One" x1="445.5" y1="28.5" x2="6.5" y2="28.5"/>
               <circle className="Two" cx="52" cy="29.5" r="25"/>
               <line className="One" x1="445.5" y1="134.5" x2="6.5" y2="134.5"/>
               <circle className="Two" cx="366" cy="134.5" r="25"/>
               <line className="One" x1="445.5" y1="239.5" x2="6.5" y2="239.5"/>
               <circle className="Two" cx="43" cy="239.5" r="25"/>
             </g>
           </g>
         </svg>
      </div>
    );
  }
}

export default OptionsButton;
