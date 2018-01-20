import React from 'react'

import { Config } from '../services/file-path-service.js'
import Folder from './designObjects/Folder.js'
import Line from './designObjects/Line.js'
import File from '../data/file'

export default class FileBrowser extends React.Component {

  constructor (props) {
    super(props)
    this.state = {files: []}

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

    let counterFiles = 0
    let table = this.state.files.sort((a, b) => {
      return a.filename.localeCompare(b.filename)
    }).sort((a, b) => {
      return b.isDirectory - a.isDirectory
    }).map((file, index) => {
      if (file.isDirectory) {
        if (index === counterFiles - 1) {
          return (
            <div key={index}>
              <div>
                <Folder fileName={file.filename} path={file.path} id={file.path}
                        key={this.tableCounter}/><span>{file.filename}</span>
              </div>
            </div>
          )
        }
        return (
          <div style={positionOfElementsInTable} key={index}>
            <div style={positionElementsInColumn}>
              <Folder style={positionElementsInColumn} fileName={file.filename} path={file.path} id={file.path}
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