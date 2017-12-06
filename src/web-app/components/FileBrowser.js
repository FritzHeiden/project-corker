import React from 'react';
import ReactDOM from 'react-dom';

import FileService from '../services/file-service.js';
import {Config} from '../test/filepath.js';
import Folder from '../svg/folder.js';

class FileBrowser extends React.Component {
  constructor(props){
    super(props);
    this.state = {files: []}


    this.fileService = new FileService("127.0.0.1", 2345);
    Config.onPathChange = this.updateFileList.bind(this);
//this.updateFileList();
    this.mouseDragged = this.mouseDragged.bind(this);
  }

    mouseDragged(event){
      event.dataTransfer.setData("text", event.target.id);
    }

  updateFileList(path){

      //let path = Config.path;
      console.log("From FileBrowser: " + path);

      if(path != ""){
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
      return file.extension === "wav";
    }).map( file => {

      return( <tr><td>{file.filename}</td></tr>)
    });
    console.log(table);
    return(table);
  }

 render() {
   const {title,colOneName} = this.props;

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
      <div className="musicFolder">
        <h3>{title}</h3>
        <table>
          <tbody>
          <tr>
            <th style={colOne}>{colOneName}</th>
          </tr>
          <tr>
            <td><Folder/></td>
          </tr>
          <tr draggable="true" onDragStart={this.mouseDragged.bind(this)}>
            <td>Hallo</td>
          </tr>
          {this.updateTable()}
        </tbody>
        </table>
      </div>
    );
 }
}

export default FileBrowser;
