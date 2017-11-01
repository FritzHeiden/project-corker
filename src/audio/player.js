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
    // To be replaced with AudioTrack class whatever
    let bufferLoader = new BufferLoader(
        context,
        [
            './basic_loop.wav',
        ],
        finishedLoading);

    bufferLoader.load();
}

function finishedLoading() {
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

function connectLowpass(element) {
    source.disconnect(context.destination);
    lowpassFilter.disconnect();

    if (element.checked) {
        source.connect(lowpassFilter);
        lowpassFilter.connect(context.destination);
    } else {
        connect(context.destination);
    }
}

function changeLowpassFilterFrequency(element) {
    let minValue = 40;
    let maxValue = context.sampleRate / 2;
    let numberOfOctaves = Math.log(maxValue / minValue) / Math.LN2;
    let multiplier = Math.pow(2, numberOfOctaves * (element.value - 1.0));
    lowpassFilter.frequency.value = maxValue * multiplier;
}


