export default class AudioPlayer(){

  let context;
  let source, buffer;
  let gainNode;

  let startedAt;
  let pausedAt;
  let paused;

  let lowpassFilter;
  let highshelfFilter;

  let lowpassConnected;
  let highshelfConnected;

  let request;


  constructor(){
  context = new (window.AudioContext || window.webkitAudioContext)();
  paused = true;
  lowpassConnected = false;
  highshelfConnected = false;
   request = new XMLHttpRequest()
 }

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
      initLowpass();
      initHighshelf();

      let lowpassConnected = false;
      let highshelfConnected = false;

      source.connect(gainNode);

      if(document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked) {
          gainNode.connect(lowpassFilter);
          lowpassFilter.connect(highshelfFilter);
          highshelfFilter.connect(context.destination);
          lowpassConnected = true;
          highshelfConnected = true;
      } else if (document.getElementById("lowpassToggle").checked && !document.getElementById("highshelfToggle").checked) {
          gainNode.connect(lowpassFilter);
          lowpassFilter.connect(context.destination);
          lowpassConnected = true;
      } else if(!document.getElementById("lowpassToggle").checked && document.getElementById("highshelfToggle").checked){
          gainNode.connect(highshelfFilter);
          highshelfFilter.connect(context.destination);
          highshelfConnected = true;
      } else {
          gainNode.connect(context.destination);
      }
  }

  export function pausePlay() {
      if (paused) {
          play();
      } else {
          stop();
      }
  }

  function play() {
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

  function stop() {
      source.stop(0);
      pausedAt = Date.now() - startedAt;
      paused = true;
  }

  function changeVolume(element) {
      let fraction = parseInt(element.value) / parseInt(element.max);
      gainNode.gain.value = fraction * fraction;
  }

  // Frequencies below the cutoff pass through, frequencies above it are attenuated
  function initLowpass() {
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

  // Frequencies higher than the frequency get a boost or an attenuation, frequencies lower are unchanged.
  function initHighshelf() {
      highshelfFilter = context.createBiquadFilter();
      highshelfFilter.type = 'highshelf';
      highshelfFilter.gain.value = 50;
      highshelfFilter.frequency.value = 10000;
  }

  function changeHighshelfFilterFrequency(element) {
      highshelfFilter.frequency.value = element.value;
  }

  function toggleFilter() {
      source.disconnect(0);
      gainNode.disconnect(0);

      if(lowpassConnected) {
          lowpassFilter.disconnect(0);
      }
      if (highshelfConnected) {
          highshelfFilter.disconnect(0);
      }

      connectNodes();
  }
}
