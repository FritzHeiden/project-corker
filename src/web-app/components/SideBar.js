import React from 'react'

//Components
import {Config} from '../test/filepath.js'
import {Sidebar} from '../test/sidebar.js'

//used Functions
import FileService from '../services/file-service.js'


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

    render() {
        const correctPath = this.state.correctPath

        return (
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
                        <div className="wrongPath"/>
                        <p>Path not found! Please check the spelling.</p>
                    </div>
                )}
            </div>
        )
    }
}

