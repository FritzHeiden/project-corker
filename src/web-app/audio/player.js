export default class AudioPlayer {

    constructor() {
      console.log("!");
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

        request.open('GET', './basic_loop.wav', true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            context.decodeAudioData(request.response, onBufferLoad, onBufferError);
        };
        request.send();
    }


    onBufferLoad(buff) {
        buffer = buff;
    }

    onBufferError(e) {
        console.log('onBufferError', e);
    }

    connectNodes() {
        initLowpass();
        initHighshelf();

        let lowpassConnected = false;
        let highshelfConnected = false;

        source.connect(gainNode);

        if (document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked) {
            gainNode.connect(lowpassFilter);
            lowpassFilter.connect(highshelfFilter);
            highshelfFilter.connect(context.destination);
            lowpassConnected = true;
            highshelfConnected = true;
        } else if (document.getElementById("lowpassToggle").checked && !document.getElementById("highshelfToggle").checked) {
            gainNode.connect(lowpassFilter);
            lowpassFilter.connect(context.destination);
            lowpassConnected = true;
        } else if (!document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked) {
            gainNode.connect(highshelfFilter);
            highshelfFilter.connect(context.destination);
            highshelfConnected = true;
        } else {
            gainNode.connect(context.destination);
        }
    }

    pausePlay() {
        if (paused) {
            _play();
        } else {
            _stop();
        }
    }

    _play() {
        gainNode = context.createGain();
        source = context.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        connectNodes();

        paused = false;

        if (pausedAt) {
            startedAt = Date.now() - pausedAt;
            source.start(0, pausedAt / 1000);
        }
        else {
            startedAt = Date.now();
            source.start(0);
        }
    }

    _stop() {
        source.stop(0);
        pausedAt = Date.now() - startedAt;
        paused = true;
    }

    changeVolume(element) {
        let fraction = parseInt(element.value) / parseInt(element.max);
        gainNode.gain.value = fraction * fraction;
    }

    // Frequencies below the cutoff pass through, frequencies above it are attenuated
    initLowpass() {
        lowpassFilter = context.createBiquadFilter();
        lowpassFilter.type = 'lowpass';
        lowpassFilter.frequency.value = 5000; // The cutoff frequency
    }

    changeLowpassFilterFrequency(element) {
        let minValue = 40;
        let maxValue = context.sampleRate / 2;
        let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
        let multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
        lowpassFilter.frequency.value = maxValue * multiplier;
    }

    changeLowpassFilterQuality(element) {
        lowpassFilter.Q.value = element.value * 30;
    }

    // Frequencies higher than the frequency get a boost or an attenuation, frequencies lower are unchanged.
    initHighshelf() {
        highshelfFilter = context.createBiquadFilter();
        highshelfFilter.type = 'highshelf';
        highshelfFilter.gain.value = 50;
        highshelfFilter.frequency.value = 10000;
    }

    changeHighshelfFilterFrequency(element) {
        highshelfFilter.frequency.value = element.value;
    }

    toggleFilter() {
        source.disconnect(0);
        gainNode.disconnect(0);

        if (lowpassConnected) {
            lowpassFilter.disconnect(0);
        }
        if (highshelfConnected) {
            highshelfFilter.disconnect(0);
        }

        connectNodes();
    }
}
