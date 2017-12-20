import FileService from '../services/file-service.js';

export default class AudioPlayer {

    constructor(filename) {
        this.source = {};
        this.buffer = {};
        this.startedAt = 0;
        this.pausedAt = 0;
        this.lowpassFilter = {};
        this.highshelfFilter = {};

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.gainNode = this.context.createGain();

        this.paused = true;
        this.lowpassConnected = false;
        this.highshelfConnected = false;

        this.destinationConnected = false;

        this.fileService = new FileService('localhost', 2345);
        console.log('Loading audio file ...');
        this.fileService.getFile('audio/' + filename)
            .then(file => {
                this.context.decodeAudioData(file.data, buffer => {
                    this.buffer = buffer;
                    console.log(this.buffer);
                }, error => {
                    console.error('Loading audio failed!');
                    console.error(error);
                });
            }).catch(error => console.error(error));

        this._initLowpass();
        this._initHighshelf();
    }

    _connectNodes() {

        this.source.connect(this.gainNode);

        if (this.lowpassConnected && this.highshelfConnected) {
              this.gainNode.connect(this.lowpassFilter);
              this.lowpassFilter.connect(this.highshelfFilter);
              this.highshelfFilter.connect(this.context.destination);

          } else if (this.lowpassConnected && !this.highshelfConnected) {
              this.gainNode.connect(this.lowpassFilter);
              this.lowpassFilter.connect(this.context.destination);
              this.lowpassConnected = true;

          } else if (!this.lowpassConnected && this.highshelfConnected) {
              this.gainNode.connect(this.highshelfFilter);
              this.highshelfFilter.connect(this.context.destination);
              this.highshelfConnected = true;

          } else {
              this.gainNode.connect(this.context.destination);
              this.destinationConnected = true;
          }
    }

    pausePlay() {
        if (this.paused) {
            this._play();
        } else {
            this._stop();
        }
    }

    _play() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;
        this._connectNodes();

        this.paused = false;

        if (this.pausedAt) {
            this.startedAt = Date.now() - this.pausedAt;
            this.source.start(0, this.pausedAt / 1000);
        }
        else {
            this.startedAt = Date.now();
            this.source.start(0);
        }
    }

    _stop() {
        this.source.stop(0);
        this.pausedAt = Date.now() - this.startedAt;
        this.paused = true;
    }

    changeVolume(volume, max = 100) {
        let fraction = volume / max;
        this.gainNode.gain.value = fraction * fraction;
    }

    // Frequencies below the cutoff pass through, frequencies above it are attenuated
    _initLowpass() {
        this.lowpassFilter = this.context.createBiquadFilter();
        this.lowpassFilter.type = 'lowpass';
        this.lowpassFilter.frequency.value = 5000; // The cutoff frequency
    }

    changeLowpassFilterFrequency(value) {
        let minValue = 40;
        let maxValue = this.context.sampleRate / 2;
        let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
        let multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
        this.lowpassFilter.frequency.value = maxValue * multiplier;
    }

    changeLowpassFilterQuality(quality) {
        this.lowpassFilter.Q.value = quality * 30;
    }

    // Frequencies higher than the frequency get a boost or an attenuation, frequencies lower are unchanged.
    _initHighshelf() {
        this.highshelfFilter = this.context.createBiquadFilter();
        this.highshelfFilter.type = 'highshelf';
        this.highshelfFilter.gain.value = 50;
        this.highshelfFilter.frequency.value = 9500;
    }

    changeHighshelfFilterFrequency(freq) {
        this.highshelfFilter.frequency.value = freq + 500;
    }

    _disconnectNodes() {

        if(this.destinationConnected) {
            this.source.disconnect(0);
            this.gainNode.disconnect(0);
            this.destinationConnected = false;
        }
        if (this.lowpassConnected) {
            this.lowpassFilter.disconnect(0);
        }
        if (this.highshelfConnected) {
            this.highshelfFilter.disconnect(0);
        }
    }

    toggleLowpass() {

        this._disconnectNodes();

        if (this.lowpassConnected) {
            this.lowpassConnected = false;
        } else {
            this.lowpassConnected = true;
        }

        this._connectNodes();
    }

    toggleHighshelf() {

        this._disconnectNodes();

        if (this.highshelfConnected) {
            this.highshelfConnected = false;
        } else {
            this.highshelfConnected = true;
        }

        this._connectNodes();
    }
}
