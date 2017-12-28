import React from 'react'

//Components
import Line from '../designObjects/Line.js'
import StartStopButton from '../designObjects/StartStopButton.js'
import AudioPlayerJS from '../../audio/player.js'
import AudioFile from '../../data/audio-file'
import AudioFilter from './AudioFilter.js'
import AudioBar from './AudioBox.js'

class AudioBox extends React.Component {
    constructor(props) {
        super(props);
        this._fileService = props.fileService;
        this._audioContext = props.audioContext;
        this._audioPlayer = new AudioPlayerJS(this._audioContext);

        // for testing
        this._loadAudioFile('04-EnjoyTheSilence.mp3').then(audioFile => {
            this._audioFile = audioFile
            this._audioPlayer.loadAudioFile(this._audioFile)
        })
    }

    render() {
        return (
            <div className="audioBox">
                <AudioPlayer/>
                <Line/>
                <StartStopButton _audioPlayer={this._audioPlayer}/>
                <Line/>
                <AudioFilter audioPlayerJS={this._audioPlayer}/>
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
        const numbers = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5];

        let listItems = numbers.map((number, index) =>
            <div className='bar' style={{height: number}} key={index}></div>
        );
        return listItems
    }


    render() {

        let audio =
            {
                height: '6rem',
                backgroundColor: '#1e1e1e',
                margin: '2%',
            };

        let overflowY =
            {
                overflowY: 'hidden',
            };

        return (
            <div id="testMusic" style={overflowY} onDrop={AudioPlayer.drop.bind(this)}
                 onDragOver={AudioPlayer.allowDrop.bind(this.event)}>
                <div style={audio}>
                    {AudioPlayer.updateSoundBar()}
                </div>
            </div>
        )
    }
}

// <canvas id="canvasPlayer" style={audio} onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(event)}></canvas>

export default AudioBox
