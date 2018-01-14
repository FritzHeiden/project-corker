const VOLUME = 1, PLAY_PAUSE = 2, LOWPASS = 3, HIGHSHELF = 4, LOWPASS_FREQ = 6, LOWPASS_QUAL = 7, HIGHSHELF_FREQ = 8

export default class AudioPlayer {

    constructor(audioContext) {
        this.context = audioContext;
        this.source = this.context.createBufferSource();
        this.gainNode = this.context.createGain();

        this.buffer = {};
        this.lowpassFilter = {};
        this.highshelfFilter = {};

        this.paused = true;
        this.startedAt = 0;
        this.pausedAt = 0;
        this._maxVolume = 1
        this._volume = 1

        this.lowpassConnected = false;
        this.highshelfConnected = false;
        this.destinationConnected = false;

        this.lowpassActive = false;
        this.highshelfActive = false;

        this._initLowpass();
        this._initHighshelf();

        this._listeners = []
    }

    _connectNodes() {
        this.source.connect(this.gainNode);

        if (this.lowpassActive && this.highshelfActive) {
            this.gainNode.connect(this.lowpassFilter);
            this.lowpassFilter.connect(this.highshelfFilter);
            this.highshelfFilter.connect(this.context.destination);
            this.lowpassConnected = true;
            this.highshelfConnected = true;
            this.destinationConnected = true;

        } else if (this.lowpassActive && !this.highshelfActive) {
            this.gainNode.connect(this.lowpassFilter);
            this.lowpassFilter.connect(this.context.destination);
            this.lowpassConnected = true;
            this.destinationConnected = true;

        } else if (!this.lowpassActive && this.highshelfActive) {
            this.gainNode.connect(this.highshelfFilter);
            this.highshelfFilter.connect(this.context.destination);
            this.highshelfConnected = true;
            this.destinationConnected = true;

        } else {
            this.gainNode.connect(this.context.destination);
            this.destinationConnected = true;
        }
    }

    loadAudioFile(audioFile) {
        this.buffer = audioFile.audioBuffer
    }

    pausePlay() {
        let listeners = this._listeners.filter(listener => listener.subject === PLAY_PAUSE)
        if (this.paused) {
            this._play();
        } else {
          this._stop();
        }
      listeners.forEach(listener => listener.callback(this.paused))
    }

    _play() {
        this.source = this.context.createBufferSource();
        this.source.buffer = this.buffer;
        this.source.loop = false;
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

        // reset playback if track has reached its end
        let self = this;
        this.source.onended = function() {
            if (!self.paused) {
                self.paused = true;
                self.startedAt = 0;
                self.pausedAt = 0;
            }
        }
    }

    _stop() {
        this.source.stop(0);
        this.pausedAt = Date.now() - this.startedAt;
        this.paused = true;
    }

    changeVolume(volume, max = 100) {
        this._volume = volume / max;
        let fraction = this._volume * this._maxVolume
        this.gainNode.gain.setValueAtTime(fraction * fraction, this.context.currentTime);

        for (let listener of this._listeners.filter(listener => listener.subject === VOLUME)) {
            listener.callback(this._volume)
        }
    }

    changeMaxVolume (volume, max = 100) {
        this._maxVolume = volume / max
        this.changeVolume(this._volume, 1)
    }

    // Frequencies below the cutoff pass through, frequencies above it are attenuated
    _initLowpass() {
        this.lowpassFilter = this.context.createBiquadFilter();
        this.lowpassFilter.type = 'lowpass';
        this.lowpassFilter.frequency.setValueAtTime(5000, this.context.currentTime);
    }

    changeLowpassFilterFrequency(value) {
        let minValue = 40;
        let maxValue = this.context.sampleRate / 2;
        let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
        let multiplier = Math.pow(2, numberOfOctaves * (value - 1.0));
        this.lowpassFilter.frequency.setValueAtTime(maxValue * multiplier, this.context.currentTime);

        this._listeners
          .filter(listener => listener.subject === LOWPASS_FREQ)
          .forEach(listener => listener.callback(value))
    }

    changeLowpassFilterQuality(quality) {
        this.lowpassFilter.Q.setValueAtTime(quality * 30, this.context.currentTime);

        this._listeners
          .filter(listener => listener.subject === LOWPASS_QUAL)
          .forEach(listener => listener.callback(quality))
    }

    // Frequencies higher than the frequency get a boost or an attenuation, frequencies lower are unchanged.
    _initHighshelf() {
        this.highshelfFilter = this.context.createBiquadFilter();
        this.highshelfFilter.type = 'highshelf';
        this.highshelfFilter.gain.setValueAtTime(50, this.context.currentTime);
        this.highshelfFilter.frequency.setValueAtTime(9500, this.context.currentTime);
    }

    changeHighshelfFilterFrequency(freq) {
        this.highshelfFilter.frequency.setValueAtTime(freq + 500, this.context.currentTime);

        this._listeners
          .filter(listener => listener.subject === HIGHSHELF_FREQ)
          .forEach(listener => listener.callback(freq))
    }

    _disconnectNodes() {
        if (this.destinationConnected) {
            this.source.disconnect(0);
            this.gainNode.disconnect(0);
            this.destinationConnected = false;
        }
        if (this.lowpassConnected) {
            this.lowpassFilter.disconnect(0);
            this.lowpassConnected = false;
        }
        if (this.highshelfConnected) {
            this.highshelfFilter.disconnect(0);
            this.lowpassConnected = false;
        }
    }

    toggleLowpass() {
        if (this.lowpassActive) {
            this.lowpassActive = false;
        } else {
            this.lowpassActive = true;
        }
        this._disconnectNodes();
        this._connectNodes();

        this._listeners
          .filter(listener => listener.subject === LOWPASS)
          .forEach(listener => listener.callback(this.lowpassActive))
    }

    toggleHighshelf() {
        if (this.highshelfActive) {
            this.highshelfActive = false;
        } else {
            this.highshelfActive = true;
        }
        this._disconnectNodes();
        this._connectNodes();

      this._listeners
        .filter(listener => listener.subject === HIGHSHELF)
        .forEach(listener => listener.callback(this.highshelfActive))
    }

    listenOnVolumeChange (callback) {
        this._listeners.push({callback, subject: VOLUME})
    }

    listenOnTogglePlay (callback) {
        this._listeners.push({callback, subject: PLAY_PAUSE})
    }

    listenOnToggleLowpass (callback) {
        this._listeners.push({callback, subject: LOWPASS})
    }

    listenOnToggleHighshelf (callback) {
        this._listeners.push({callback, subject: HIGHSHELF})
    }

    listenOnLowpassFrequencyChange (callback) {
        this._listeners.push({callback, subject: LOWPASS_FREQ})
    }

    listenOnLowpassQualityChange (callback) {
        this._listeners.push({callback, subject: LOWPASS_QUAL})
    }

    listenOnHighshelfFrequencyChange (callback) {
        this._listeners.push({callback, subject: HIGHSHELF_FREQ})
    }
}
