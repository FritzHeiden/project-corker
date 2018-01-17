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
import AudioPlayerJS from '../audio/player'
import ImageTools from '../tools/image-tools'
import VideoSyncService from '../services/video-sync-service'
//import BackgroundImage from 'react-svg-loader!../svg/Background.svg'; // just works with folder.js

export default class App extends React.Component {

  constructor (props) {
    super(props)

    this.state = {crossFader: 0.5}

    this._fileService = new FileService('localhost', 2345)
    this._audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this._finalVideoCanvas = ImageTools.createCanvas(400, 220)
    this._videoSyncService = new VideoSyncService(this._finalVideoCanvas)

    this._midiController = new MidiController()
    this._midiController.initialize()

    this._leftAudioPlayer = new AudioPlayerJS(this._audioContext)
    this._rightAudioPlayer = new AudioPlayerJS(this._audioContext)

    this.mapControllerToPlayers()
  }

  mapControllerToPlayers () {
    // left track
    this._midiController.listenOnVolumeFader1Change(value => this._leftAudioPlayer.changeVolume(value, 127))
    this._midiController.listenOnCueButtonColumn1Change(value => {
      if (value === 0) {
        this._leftAudioPlayer.pausePlay()
      }
    })
    this._midiController.listenOnOneButtonColumn1Change(value => {
      if (value === 0) {
        this._leftAudioPlayer.toggleLowpass()
      }
    })
    this._midiController.listenOnTwoButtonColumn1Change(value => {
      if (value === 0) {
        this._leftAudioPlayer.toggleHighshelf()
      }
    })
    this._midiController.listenOnFxKnob1Column1Change(value => this._leftAudioPlayer.changeLowpassFilterFrequency(value / 127))
    this._midiController.listenOnFxKnob2Column1Change(value => this._leftAudioPlayer.changeLowpassFilterQuality(value / 127))
    this._midiController.listenOnFxKnob3Column1Change(value => this._leftAudioPlayer.changeHighshelfFilterFrequency(value / 127 * 9500))

    // right track
    this._midiController.listenOnVolumeFader4Change(value => this._rightAudioPlayer.changeVolume(value, 127))
    this._midiController.listenOnCueButtonColumn4Change(value => {
      if (value === 0) {
        this._rightAudioPlayer.pausePlay()
      }
    })
    this._midiController.listenOnOneButtonColumn4Change(value => {
      if (value === 0) {
        this._rightAudioPlayer.toggleLowpass()
      }
    })
    this._midiController.listenOnTwoButtonColumn4Change(value => {
      if (value === 0) {
        this._rightAudioPlayer.toggleHighshelf()
      }
    })
    this._midiController.listenOnFxKnob1Column4Change(value => this._rightAudioPlayer.changeLowpassFilterFrequency(value / 127))
    this._midiController.listenOnFxKnob2Column4Change(value => this._rightAudioPlayer.changeLowpassFilterQuality(value / 127))
    this._midiController.listenOnFxKnob3Column4Change(value => this._rightAudioPlayer.changeHighshelfFilterFrequency(value / 127 * 9500))

    // cross fader
    this._midiController.listenOnCrossFaderChange((value) => {
      value /= 127
      this.onCrossFaderChange(value)
    })
  }

  onCrossFaderChange (value) {
    this._leftAudioPlayer.changeMaxVolume(value > 0.5 ? 1 - value : 0.5, 0.5)
    this._rightAudioPlayer.changeMaxVolume(value < 0.5 ? value : 0.5, 0.5)
    this.state.crossFader = value
    this.setState(this.state)
  }

  render () {
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
              <AudioBox fileService={this._fileService} audioContext={this._audioContext}
                        audioPlayer={this._leftAudioPlayer}/>
              <VideoBox videoSyncService={this._videoSyncService}
                        src={'http://localhost:2345/api/file?path=../dist/video/test.mp4'}/>
              <VideoBox videoSyncService={this._videoSyncService}
                        src={'http://localhost:2345/api/file?path=../dist/video/croma.mp4'}/>
              <AudioBox fileService={this._fileService} audioContext={this._audioContext}
                        audioPlayer={this._rightAudioPlayer}/>
            </div>
            <div className="footer">
              <input className="crossFader" type="range" step={0.01} min={0} max={1} value={this.state.crossFader}
                     onChange={event => this.onCrossFaderChange(event.target.value)}/>
              <FileBrowser title="File Browser" fileService={this._fileService}/>
              <FinalVideo videoSyncService={this._videoSyncService} refreshRate={30}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
