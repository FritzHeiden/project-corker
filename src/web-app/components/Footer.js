import React from 'react';
import ReactDOM from 'react-dom';

import * as drag from '../test/dragAndDrop.js';
import Folder from '../svg/folder.js';

class Footer extends React.Component {
    constructor(props){
      super(props);
      this.mouseDragged = this.mouseDragged.bind(this);
    }

    mouseDragged(event){
      event.dataTransfer.setData("text", event.target.id);
    }

    render() {
      const {title,colOneName,colTwoName,colThreeName} = this.props;

      let colOne =
      {
        width: "65%",
      }

      let colTwo =
      {
        width: "20%",
      }

      let colThree =
      {
        width: "15%",
      }

      return (
         <div>
           <footer>
             <div className="slideContainer">
              <input className="slider" type="range" min={1} max={100} defaultValue={50}/>
             </div>
             <div className="musicFolder">
               <h3>{title}</h3>
               <table>
                 <tbody>
                 <tr>
                   <th style={colOne}>{colOneName}</th>
                   <th style={colTwo}>{colTwoName}</th>
                   <th style={colThree}>{colThreeName}</th>
                 </tr>
                 <tr>
                   <td><Folder/></td>
                   <td></td>
                   <td></td>
                 </tr>
                 <tr draggable="true" onDragStart={this.mouseDragged.bind(this)}>
                   <td>Hallo</td>
                   <td>Ich </td>
                   <td>Bins</td>
                 </tr>
                 <tr>
                   <td>daw</td>
                   <td>daw</td>
                   <td>daw</td>
                 </tr>
                 <tr>
                   <td>daw</td>
                   <td>daw</td>
                   <td>daw</td>
                 </tr>
                 <tr>
                   <td>daw</td>
                   <td>daw</td>
                   <td>daw</td>
                 </tr>
               </tbody>
               </table>
             </div>
           </footer>
         </div>
      );
   }
}

export default Footer
