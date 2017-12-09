import AudioPlayer from '../audio/player.js';

export default class Crossfader {

    constructor(audioTrack1, audioTrack2) {

        // These should eventually be of type AudioPlayer
        //this.audioTrack1 = audioTrack1;
        //this.audioTrack2 = audioTrack2;

        this.audioTrack1 = new AudioPlayer('basic_loop.wav');
        this.audioTrack2 = new AudioPlayer('ambient.wav');
    }

    crossfade(element) {
        if (!this.audioTrack1.paused && !this.audioTrack2.paused) {
            let x = parseInt(element.value) / parseInt(element.max);
            let gain1 = Math.cos(x * 0.5 * Math.PI);
            let gain2 = Math.cos((1.0 - x) * 0.5 * Math.PI);
            this.audioTrack1.gainNode.gain.value = gain1;
            this.audioTrack2.gainNode.gain.value = gain2;
        }
    }

}