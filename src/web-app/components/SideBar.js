import React from 'react'

import FileService from '../services/file-service.js'
import {Config} from '../services/file-path-service.js'
import {Sidebar} from '../services/sidebar-service.js'


export default class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            correctPath: true,
        }
        this.handleEnter = this.handleEnter.bind(this)
        this.checkPath = this.checkPath.bind(this)
    }

    handleEnter(e) {
        if (e.key === 'Enter') {
            this.checkPath()
        }
    }

    checkPath() {
        let filePath = document.getElementById('sideBarInput').value
        let testFilePath = new FileService('127.0.0.1', 2345)

        testFilePath.getFiles(filePath).then(files => {
            this.setState({correctPath: true})
            Sidebar.closeSidebar()
            Config.path = filePath
        }).catch(error => {
            this.setState({correctPath: false})
            console.error(error)
        })
    }

    onTransparentMainClicked(){
        Sidebar.closeSidebar()
    }

    render() {
        const correctPath = this.state.correctPath

        return (
            <div  id="fullTransparent" className="fullTransparent">
                <div id="sideBar" className="sideBar">
                    <h3>Do you wanna change the file path?</h3>
                    {correctPath ? (
                        <input className="path"
                               id="sideBarInput"
                               name="filePath"
                               type="text"
                               placeholder={'New file path'}
                               onKeyPress={this.handleEnter.bind(this)}
                        />
                    ) : (
                        <div>
                            <input className="path"
                                   id="sideBarInput"
                                   name="filePath"
                                   type="text"
                                   placeholder={'New file path'}
                                   onKeyPress={this.handleEnter.bind(this)}
                            />
                            <div className="wrongPath specialSideWrongPath"/>
                            <p>Path not found! Please check the spelling.</p>
                        </div>
                    )}
                </div>
                <div className="transparentPart" id="transparentPart" onClick={this.onTransparentMainClicked}></div>
            </div>
        )
    }
}

