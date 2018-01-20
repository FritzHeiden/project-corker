import React from 'react'

import Line from '../designObjects/Line.js'
import AudioPlayButton from './AudioPlayButton.js'
import AudioPlayerJS from '../../audio/player.js'
import AudioFilter from './AudioFilter.js'
import AudioInfo from './AudioInformation.js'
import AudioBar from './AudioBox.js'

import AudioFile from '../../data/audio-file'


class AudioBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            usedFilterError: '',
          volume: 100
        });

        this._fileService = props.fileService;
        this._audioContext = props.audioContext;
        this._audioPlayer = this.props.audioPlayer || new AudioPlayerJS(this._audioContext)
      this._audioPlayer.listenOnVolumeChange(this.onVolumeChange.bind(this))


      // for testing
        this._loadAudioFile('04-EnjoyTheSilence.mp3').then(audioFile => {
            this._audioFile = audioFile
            this._audioPlayer.loadAudioFile(this._audioFile)
        })
        this.filterChanged = '';
    }

    onFilterUsed(filter){
        this.setState({usedFilterError: filter})
    }

    onVolumeChange (volume) {
    this.state.volume = volume
    this.setState(this.state)
    }

    render() {
        //console.log(this.state.usedFilter)
        return (
            <div className="mediaBox">
                <AudioPlayer/>
                <Line/>
                <AudioPlayButton _audioPlayer={this._audioPlayer}/>
                <Line/>
                <p>Volume</p>
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={100}
                       value={this.state.volume * 100}
                       name="Volume"
                       onChange={event => this._audioPlayer.changeVolume(parseInt(event.target.value))}/>
                <p>Playback Speed</p>
                <input className="sliderFilter"
                       type="range"
                       min={0}
                       max={100}
                       value={this.state.volume * 100}
                       name="Volume"
                       onChange={event => this._audioPlayer.changeVolume(parseInt(event.target.value))}/>

                <Line/>
                <AudioFilter
                    audioPlayer={this._audioPlayer}
                    onFilterUsedError={this.onFilterUsed.bind(this)}/>
                <Line/>
            </div>
        )
    }


    async _loadAudioFile(path) {
        let file = await this._fileService.getFile(`audio/${path}`);
        let audioBuffer = await this._audioContext.decodeAudioData(file.data);
        return new AudioFile(file.path, file.filename, file.data, file.extension, file.isDirectory, audioBuffer);
    }
}

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
    }

    static allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.setData('text', e.target.id);
    }

    static drop(e) {
        e.preventDefault();
        var data = e.dataTransfer.getData('text'); //in data the id is stored
    }

    static updateSoundBar() {
        const numbers = [95, 95, 95, 95, 50, 50, 50, 50, 50, 75, 75, 75, 75, 75,]; //max height is 95

        let listItems = numbers.map((number, index) =>
            <div className='bar' style={{height: number,}} key={index}></div>
        );
        return listItems
    }


    render() {

        let audio =
            {
                height: '6rem',
                backgroundColor: '#1e1e1e',
                margin: '2%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'flex-end',
                overflow: 'hidden',
            };

        return (
            <div id="testMusic" onDrop={AudioPlayer.drop.bind(this)}
                 onDragOver={AudioPlayer.allowDrop.bind(this.event)}>
                <div style={audio}>
                    {AudioPlayer.updateSoundBar()}
                </div>
            </div>
        )
    }
}

// <canvas id="canvasPlayer" style={audio} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(event)}></canvas>
/*
                <AudioInfo filterError={this.state.usedFilterError}/>
 */
export default AudioBox
