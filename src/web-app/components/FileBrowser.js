import React from 'react'

import { Config } from '../services/file-path-service.js'
import Folder from './designObjects/Folder.js'
import Line from './designObjects/Line.js'
import File from '../data/file'

export default class FileBrowser extends React.Component {

  constructor (props) {
    super(props)
    this.state = {files: [], firstRowFiles: [], secondRowFiles: []}

    this.fileService = props.fileService
    Config.onPathChange = this.updateFileList.bind(this)
    FileBrowser.mouseDragged = FileBrowser.mouseDragged.bind(this)

    this.tableCounter = 0
    this.firstRowFiles = []
    this.secondRowFiles = []
  }

  static mouseDragged (event) {
    event.dataTransfer.setData('text', event.target.id)
  }

  updateFileList (path) {
    if (path !== '') {
      this.fileService.getFiles(path).then(files => {
        files.push(new File('..', '..', '', '', true))
        this.state.files = files
        this.setState(this.state)
      }).catch(error => {
        console.error(error)
      })
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

  _getFirstRowFile (index, positionSpan, directory) {
    /*if (directory === true) {
        return (
            <td>
                <FolderToDir path={this.file.path} id={this.firstRowFiles[index].path}
                             key={this.tableCounter}/> <span
                style={positionSpan}>{this.firstRowFiles[index].filename}</span>
            </td>)
    }*/
  }

  _getSecondRowFile (index, positionSpan, directory) {
    console.log('Hallo from getSecondRowMethode: ' + this.secondRowFiles)
    /*if (directory === true) {
        console.log(this.secondRowFiles[index])
        return (
            <td>
                <FolderToDir path={this.secondRowFiles[index].path} id={this.secondRowFiles[index].path}
                             key={this.tableCounter}/> <span
                style={positionSpan}>{this.secondRowFiles[index].filename}</span>
            </td>)
    }*/

  }

  updateTable () {
    let positionOfElementsInTable = {
      width: '50%',
      flexWrap: 'wrap',
      textAlign: 'left',
      borderBottom: '2px solid #1e1e1e',
      display: 'grid',
      gridTemplateColumns: '25% 75%',
    }

    let positionElementsInColumn = {
      gridColumnStart: '2',
      gridColumnEnd: '2',
    }

    let files = this.state.files
    let table = files.sort((a, b) => {
      return a.filename.localeCompare(b.filename)
    }).sort((a, b) => {
      return b.isDirectory - a.isDirectory
    }).map((file, index) => {
      if (file.isDirectory) {
        if (index === files.length - 1) {
          return (
            <div key={index}>
              <div>
                <Folder path={file.path} fileName={file.filename} id={file.path} key={this.tableCounter}/><span>{file.filename}</span>
              </div>
            </div>
          )
        }
        return (
          <div style={positionOfElementsInTable} key={index}>
            <div style={positionElementsInColumn}>
              <Folder style={positionElementsInColumn} path={file.path} id={file.path} fileName={file.filename}
                      key={this.tableCounter}/><span>{file.filename}</span>
            </div>
          </div>
        )
      } else {
        return (
          <div style={positionOfElementsInTable} key={index}>
            <div style={positionElementsInColumn} id={file.path} key={this.tableCounter} draggable="true"
                 onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</div>
          </div>
        )
      }
      this.tableCounter = this.tableCounter + 1
    })

    /*.map((index) => {

    console.log(firstRowFiles)
    console.log(secondRowFiles)
    let positionSpan =
        {
            top: '0rem',
            left: '-5%',
        }
    if (firstRowFiles[index].isDirectory === true || secondRowFiles[index].isDirectory === true ) {
        return (
            <tr key={index}>
                <td><FolderToDir path={firstRowFiles[index].path} id={firstRowFiles[index].path} key={this.tableCounter}/> <span style={positionSpan}>{firstRowFiles[index].filename}</span></td>
                <td><FolderToDir path={firstRowFiles[index].path} id={firstRowFiles[index].path} key={this.tableCounter}/> <span style={positionSpan}>{firstRowFiles[index].filename}</span></td>
            </tr>)
    }else{
        return (
            <tr key={index}>
                <td id={file.path} key={this.tableCounter} draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td>
                <td id={file.path} key={this.tableCounter} draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td>
            </tr>
        )
    }

})*/
    //console.log(this.firstRowFiles)

    //let state = this.state
    //state.firstRowFiles = firstRowFiles
    //state.secondRowFiles = secondRowFiles
    //this.setState(state)
    //console.log(this.state.firstRowFiles)
    //console.log(this.state.secondRowFiles)
    return (table)
  }

  render () {
    const {title} = this.props

    let widthElement = {
      width: '100%',
      borderBottom: '0.3rem solid #1e1e1e',
    }

    return (
      <div className="fileBrowser">
        <h3>{title}</h3>
        <div className="mediaBrowser">
          <div style={widthElement}>
          </div>
          <div className="table">
            {this.updateTable()}
          </div>
          <Line/>
        </div>
      </div>
    )
  }
}

{/*
<div className="fileBrowser">
                <h3>{title}</h3>
                <div className="mediaBrowser">
                    <table>
                        <tbody>
                        <tr>
                            <th colSpan={2}>/></th>
                        </tr>
                        <tr draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>
                        </tr>
                        <tr>
                            {this.updateTable()}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>




 <div style={widthElement}>
                        {this.updateTable()}
                    </div>

  <div className="fileBrowser">
                <h3>{title}</h3>
                <div className="musicFolder">
                    <table>
                        <tbody>
                        <tr>
                            <th colSpan={2}>/></th>
                        </tr>
                        <tr draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>
                        </tr>
                        <tr>
                            {this.updateTable()}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>



obj.sort((a,b) => a.timeM - b.timeM);

.map((file, index) => {
            console.log(table)
            if(file.isDirectory === true){

                let positionSpan =
                    {
                        top: '-0.5rem',
                        left: '-5%',
                    }
                return (
                    <tr key={index}>
                        <td><FolderToDir path={file.path} id={file.path} key={this.tableCounter}/> <span style={positionSpan}>{file.filename}</span></td>
                    </tr>)
            }
            this.tableCounter = this.tableCounter + 1
            return (<tr key={index}>
                <td id={file.path} key={this.tableCounter} draggable="true"
                    onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td>
            </tr>)
        })
*/
}