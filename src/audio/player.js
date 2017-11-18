let context = new (window.AudioContext || window.webkitAudioContext)();
let source, buffer;
let gainNode;

let startedAt;
let pausedAt;
let paused = true;

let lowpassFilter;

let request = new XMLHttpRequest();

request.open('GET', './basic_beat.wav', true);
request.responseType = 'arraybuffer';

request.onload = function() {
    context.decodeAudioData(request.response, onBufferLoad, onBufferError);
};
request.send();


function onBufferLoad(buff) {
    buffer = buff;
}

function onBufferError(e) {
    console.log('onBufferError', e);
}

function connectNodes() {
    gainNode = context.createGain();
    source = context.createBufferSource();
    source.buffer = buffer;
    initLowpass();

    source.connect(gainNode);
    gainNode.connect(lowpassFilter);
    lowpassFilter.connect(context.destination);
}

function pausePlay() {
    if (paused) {
        play();
    } else {
        stop();
    }
}

function play() {
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

function stop() {
    source.stop(0);
    pausedAt = Date.now() - startedAt;
    paused = true;
}

function changeVolume(element) {
    let fraction = parseInt(element.value) / parseInt(element.max);
    gainNode.gain.value = fraction * fraction;
}

function initLowpass() {
    // Frequencies below the cutoff pass through, frequencies above it are attenuated
    lowpassFilter = context.createBiquadFilter();
    lowpassFilter.type = 'lowpass';
    lowpassFilter.frequency.value = 5000; // The cutoff frequency
}

function changeLowpassFilterFrequency(element) {
    let minValue = 40;
    let maxValue = context.sampleRate / 2;
    let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    let multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
    lowpassFilter.frequency.value = maxValue * multiplier;
}

function changeLowpassFilterQuality(element) {
    lowpassFilter.Q.value = element.value * 30;
}


