import React from 'react'

// used Functions
import {Config} from '../services/file-path-service.js'
import Folder from './designObjects/Folder.js'

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
            //if(file.extension === "wav" || file.extension === "mp3"){
            // return file
            //}
            return file
        }).map(file => {
            this.tableCounter = this.tableCounter + 1
            return (<tr>
                <td id={file.path} key={this.tableCounter} draggable="true"
                    onDragStart={FileBrowser.mouseDragged.bind(this)}>{file.filename}</td>
            </tr>)
        })
        return (table)
    }

    render() {
        const {title} = this.props

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
        )
    }
}