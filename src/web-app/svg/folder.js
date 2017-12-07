import React from 'react';
import ReactDOM from 'react-dom';

import * as sidebar from '../test/sidebar.js';
import FileService from '../services/file-service.js';

class FolderButton extends React.Component {
  constructor(props){
    super(props);
    this.state={
      correctPath: true,
    }

    this.changeDirectory= this.changeDirectory.bind(this);
    this.checktargetDirectory= this.checktargetDirectory.bind(this);
    this.updateTable= this.updateTable.bind(this);
  }

  changeDirectory(){
    this.checktargetDirectory;
    setTimeout(this.updateTable, 15);
  }


  checktargetDirectory(){
    let filePath = ".."
    let testFilePath = new FileService('127.0.0.1', '2345');

    testFilePath.getFiles(filePath).then(files => {
      this.setState({correctPath : true});
    }).catch(error => {
      this.setState({correctPath : false});
    })

  console.log("Gehe ein verzeichnis zurück");
  }

  updateTable(){
    if(this.state.correctPath === true){
      console.log("Update Tabelle");
    }
    else{
      console.log("FEHLER!!!!");
    }
  }

 render() {

   let width= {
     width: "5%",
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
      <svg viewBox="0 0 48 48" style={width} onDoubleClick={this.changeDirectory}>
        <g>
        <path style={zero} d="M 40 12 L 22 12 L 18 8 L 8 8 C 5.800781 8 4 9.800781 4 12 L 4 20 L 44 20 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
        <path style={one} d="M 40 12 L 8 12 C 5.800781 12 4 13.800781 4 16 L 4 36 C 4 38.199219 5.800781 40 8 40 L 40 40 C 42.199219 40 44 38.199219 44 36 L 44 16 C 44 13.800781 42.199219 12 40 12 Z "/>
        </g>
      </svg>
    );
 }
}

export default FolderButton;
