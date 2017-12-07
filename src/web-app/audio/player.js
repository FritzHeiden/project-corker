//import FileService from '../services/file-service.js';

export default class AudioPlayer {

    constructor() {
        this.source = {};
        this.buffer = {};
        this.gainNode = {};
        this.startedAt = {};
        this.pausedAt = {};
        this.lowpassFilter = {};
        this.highshelfFilter = {};

        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.paused = true;
        this.lowpassConnected = false;
        this.highshelfConnected = false;
        this.request = new XMLHttpRequest();

        this.request.open('GET', './basic_loop.wav', true);
        this.request.responseType = 'arraybuffer';

        this.request.onload = function(){
          this.context.decodeAudioData(this.request.response, this.onBufferLoad, this.onBufferError);
        }
        this.request.send();
    }

    onBufferLoad(buff) {
        this.buffer = buff;
    }

    onBufferError(e) {
        console.log('onBufferError', e);
    }

    connectNodes() {
        this.initLowpass();
        this.initHighshelf();

        let lowpassConnected = false;
        let highshelfConnected = false;

        source.connect(gainNode);

        if (document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked) {
            this.gainNode.connect(lowpassFilter);
            this.lowpassFilter.connect(highshelfFilter);
            this.highshelfFilter.connect(this.context.destination);
            this.lowpassConnected = true;
            this.highshelfConnected = true;
        } else if (document.getElementById("lowpassToggle").checked && !document.getElementById("highshelfToggle").checked) {
            this.gainNode.connect(lowpassFilter);
            this.lowpassFilter.connect(this.context.destination);
            this.lowpassConnected = true;
        } else if (!document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked) {
            this.gainNode.connect(highshelfFilter);
            this.highshelfFilter.connect(this.context.destination);
            this.highshelfConnected = true;
        } else {
            this.gainNode.connect(this.context.destination);
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
        this.gainNode = this.context.createGain();
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = true;
        connectNodes();

        this.paused = false;

        if (this.pausedAt) {
            this.startedAt = Date.now() - pausedAt;
            this.source.start(0, pausedAt / 1000);
        }
        else {
            this.startedAt = Date.now();
            this.source.start(0);
        }
    }

    _stop() {
        this.source.stop(0);
        this.pausedAt = Date.now() - startedAt;
        this.paused = true;
    }

    changeVolume(element) {
        let fraction = parseInt(element.value) / parseInt(element.max);
        this.gainNode.gain.value = fraction * fraction;
    }

    // Frequencies below the cutoff pass through, frequencies above it are attenuated
    initLowpass() {
        this.lowpassFilter = this.context.createBiquadFilter();
        this.lowpassFilter.type = 'lowpass';
        this.lowpassFilter.frequency.value = 5000; // The cutoff frequency
    }

    changeLowpassFilterFrequency(element) {
        let minValue = 40;
        let maxValue = this.context.sampleRate / 2;
        let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
        let multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
        this.lowpassFilter.frequency.value = maxValue * multiplier;
    }

    changeLowpassFilterQuality(element) {
        this.lowpassFilter.Q.value = element.value * 30;
    }

    // Frequencies higher than the frequency get a boost or an attenuation, frequencies lower are unchanged.
    initHighshelf() {
        this.highshelfFilter = this.context.createBiquadFilter();
        this.highshelfFilter.type = 'highshelf';
        this.highshelfFilter.gain.value = 50;
        this.highshelfFilter.frequency.value = 10000;
    }

    changeHighshelfFilterFrequency(element) {
        this.highshelfFilter.frequency.value = element.value;
    }

    toggleFilter() {
        this.source.disconnect(0);
        this.gainNode.disconnect(0);

        if (this.lowpassConnected) {
            this.lowpassFilter.disconnect(0);
        }
        if (this.highshelfConnected) {
            this.highshelfFilter.disconnect(0);
        }

        connectNodes();
    }
}