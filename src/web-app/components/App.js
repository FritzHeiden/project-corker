import React from 'react'

import SideBar from './SideBar.js'
import FinalVideo from './video/FinalVideo.js'
import AudioBox from './audio/AudioBox.js'
import VideoBox from './video/VideoBox.js'
import Login from './Login.js'
import FileBrowser from './FileBrowser.js'

import FileService from '../services/file-service.js'

import Background from './designObjects/Background.js'
import Options from './designObjects/Options.js'
//import BackgroundImage from 'react-svg-loader!../svg/Background.svg'; // just works with folder.js

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this._fileService = new FileService('localhost', 2345)
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)()
    }

    render() {
        const {title, login} = this.props

        return (
            <div>
                <Background/>
                <h1 className="projectTitle" style={{opacity: '0', display: 'none'}}>{title}</h1>

                <div id="login" className="login">
                    <Login title={login}/>
                </div>
                <div id="online" className="online">
                    <SideBar/>
                    <Options/>
                    <div id="main" className="main">
                        <div className="actionBox">
                            <AudioBox fileService={this._fileService} audioContext={this._audioContext}/>
                            <VideoBox/>
                            <VideoBox/>
                            <AudioBox fileService={this._fileService} audioContext={this._audioContext}/>
                        </div>
                        <div className="slideContainer">
                            <input className="crossFader" type="range" min={1} max={100} defaultValue={50}/>
                        </div>
                        <FileBrowser title="File Browser" fileService={this._fileService}/>
                        <FinalVideo/>
                    </div>
                </div>
            </div>
        )
    }
}