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
import MidiController from '../controller/midi-controller'
//import BackgroundImage from 'react-svg-loader!../svg/Background.svg'; // just works with folder.js

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this._fileService = new FileService('localhost', 2345)
        this._audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this._midiController = new MidiController()
      this._midiController.initialize()
      this._midiController.listenOnCrossFaderChange(value => {console.log('cross fader action!', value)})
      this._midiController.listenOnFxButtonChange((value, mode) => console.log('fx button', value, 'mode:', mode))
      this._midiController.listenOnFxKnob4Column1Change((value, mode) => console.log('fx knob 4 row 1', value, 'mode:', mode))
      this._midiController.listenOnBrowseKnobChange((value, mode) => console.log('browse knob!', value, 'mode:', mode))
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