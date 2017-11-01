window.onload = init;
let context;
let source;
let gainNode;
let lowpassFilter;

function init() {
    try {
        context = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {
        alert('Web Audio API is not supported');
    }

    let request = new XMLHttpRequest();
    request.open('GET', './sound.wav', true);
    request.responseType = 'arraybuffer';


    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
                soundBuffer = buffer;
        }, onError);
    }
    request.send();

    initLowpass();

    source = context.createBufferSource();
    gainNode = context.createGain();
    source.connect(gainNode);
    source.connect(context.destination);
}

function initLowpass() {
    lowpassFilter = context.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 5000;
}

function start(time) {
    source.start(time);
}

function stop() {
    source.stop();
}

function play(time) {
    this.isPlaying ? this.stop() : this.start(time);
    this.isPlaying = !this.isPlaying;
}

function changeVolume(element) {
    let volume = element.value;
    let fraction = parseInt(element.value) / parseInt(element.max);
    this.gainNode.gain.value = fraction * fraction;
}

function connectLowpass() {
    source.disconnect(context.destination);
    lowpassFilter.disconnect();

    source.connect(lowpassFilter);
    lowpassFilter.connect(context.destination);
}

function changeLowpassFilterFrequency(element) {
    let minValue = 40;
    let maxValue = context.sampleRate / 2;
    let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    let multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
    lowpassFilter.frequency.value = maxValue * multiplier;
}


