import React from 'react';
import ReactDOM from 'react-dom';

import * as drag from '../test/dragAndDrop.js';
import FileBrowser from './FileBrowser.js'

class Footer extends React.Component {
    constructor(props){
      super(props);
  }

    render() {
      const {title,colOneName} = this.props;


      return (
         <div>
           <footer>
             <div className="slideContainer">
              <input className="slider" type="range" min={1} max={100} defaultValue={50}/>
             </div>
            <FileBrowser title={title} col={colOneName}/>
           </footer>
         </div>
      );
   }
}

export default Footer
