import React from 'react';

import FileService from '../services/file-service.js';
import {Config} from '../test/filepath.js';
import Folder from '../svg/folder.js';

class FileBrowser extends React.Component {
  constructor(props){
    super(props);
    this.state = {files: []};

    this.fileService = new FileService("127.0.0.1", 2345);
    Config.onPathChange = this.updateFileList.bind(this);
//    this.updateFileList();
    FileBrowser.mouseDragged = FileBrowser.mouseDragged.bind(this);

    this.tableCounter = 0;
  }

    static mouseDragged(event){
      event.dataTransfer.setData("text", event.target.id);
    }

  updateFileList(path){
      //let path = Config.path;
     // console.log("From FileBrowser: " + path);

      if(path !== ""){
        this.fileService.getFiles(path).then( files => {
          let state = this.state;
          console.log(files);

          state.files = files;
          this.setState(state);
        }).catch( error => {
          console.error(error);
        });
      }

/*
  let path = Filepath.path;
  this.fileService.getFiles(path).then(function(files){
    let state = this.state;
    state.files = state;
    this.setState(state);
  }).catch(function(){

};*/
  }


  updateTable(){

    let table = this.state.files.filter( file =>
    {
      //return file.extension === "wav";
      return file;
    }).map( file => {
      this.tableCounter = this.tableCounter + 1;
      console.log(this.tableCounter);
      return( <tr><td id={this.tableCounter} key={this.tableCounter} draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td></tr>)
    });
    console.log(table);
    return(table);
  }

 render() {
   const {title} = this.props;

    return (
      <div>
        <h3>{title}</h3>
        <div className="musicFolder">
          <table>
            <tbody>
            <tr>
              <td><Folder/></td>
            </tr>
            <tr draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>
              <td></td>
            </tr>
            {this.updateTable()}
          </tbody>
          </table>
        </div>
      </div>
    );
 }
}

export default FileBrowser;
