import React from 'react'

// used Functions
import {Config} from '../services/file-path-service.js'
import FolderAbove from './designObjects/FolderAbove.js'
import FolderToDir from './designObjects/FolderToDir.js'

//import Folder from 'react-svg-loader!../svg/folder.svg';

export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {files: []}

        this.fileService = props.fileService
        Config.onPathChange = this.updateFileList.bind(this)
        FileBrowser.mouseDragged = FileBrowser.mouseDragged.bind(this)

        this.tableCounter = 0
    }

    static mouseDragged(event) {
        event.dataTransfer.setData('text', event.target.id)
    }

    updateFileList(path) {
        if (path !== '') {
            this.fileService.getFiles(path).then(files => {
                let state = this.state

                state.files = files
                this.setState(state)
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

    updateTable() {
        let table = this.state.files.filter(file => {
            //return file.extension === "wav";
            //if(file.extension === "wav" || file.extension === "mp3" || file.extension === "aac" || file.extension === "mp4"){
            //return file
            //}

            if(file.filename.charAt(0) !== "."){
                return file
            }
        }).sort((a,b) => {
            return a.filename.localeCompare(b.filename);
        }).sort((a,b) => {
            return a.isDirectory - b.isDirectory
        }).map((file, index) => {
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
            }else{
                return (<tr key={index}>
                    <td id={file.path} key={this.tableCounter} draggable="true"
                        onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td>
                    </tr>)
            }
            this.tableCounter = this.tableCounter + 1
        })

        return (table)
    }

    render() {
        const {title} = this.props

        return (
            <div className="fileBrowser">
                <h3>{title}</h3>
                <div className="musicFolder">
                    <table>
                        <tbody>
                        <tr>
                            <th colSpan={2}><FolderAbove/></th>
                        </tr>
                        <tr draggable="true" onDragStart={FileBrowser.mouseDragged.bind(this)}>
                            <td></td>
                        </tr>
                            {this.updateTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

{/*obj.sort((a,b) => a.timeM - b.timeM);

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
*/}