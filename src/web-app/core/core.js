import React from 'react';
import ReactDOM from 'react-dom';
import FileService from "../services/file-service";
import SignUp from '../components/SignUp.js';
import App from '../components/App.js';
import AudioFile from "../data/audio-file";
import AudioFileAnalyser from "../analysis/audio-file-analyser";

const css = require("../css/mainStyle.css");

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
        });
    };
}

// let fileService = new FileService();
//
// fileService.getFiles("/web-app/res/audio")
//     .then(files => {
//         files.forEach(file => {
//             if (file.extension === "mp3") {
//                 fileService.getFile(file.path)
//                     .then(file => createAudio(file));
//             }
//         });
//     })
//     .catch(err => console.error(err));
//
// function createAudio(file) {
//     fileToAudioFile(file).then(audioFile => {
//         visualizeAudio(audioFile);
//     });
// }
//
// function fileToAudioFile(file) {
//     return new Promise((resolve, reject) => {
//         let context = new AudioContext();
//         context.decodeAudioData(file.data, buffer => {
//
//             console.log(file.path);
//             let path = file.path;
//             let filename = file.filename;
//             let data = file.data;
//             let extension = file.extension;
//             let isDirectory = file.isDirectory;
//             resolve(new AudioFile(path, filename, data, extension, isDirectory, buffer));
//         }, err => reject(err));
//     });
// }
//
// function visualizeAudio(audioFile) {
//     let resolution = 1024;
//
//     AudioFileAnalyser.analyseAmplitudeByCherryPicking(audioFile, resolution).then(amplitudes => {
//         let maxVisual = 50;
//         for (let i = 0; i < amplitudes.length; i++) {
//             let output = "";
//             let amp = amplitudes[i] * maxVisual;
//             for (let j = 0; j < amp; j++) {
//                 output += "█";
//             }
//             console.log(output);
//         }
//     });
//
//
//     // let data = buffer.getChannelData(0);
//     // // console.log(data);
//     // let max = 0;
//     // for (let i = 0; i < data.length; i += resolution) {
//     //     let sum = 0;
//     //     // for (let j = 0; j < resolution; j ++) {
//     //     //     let value = data[i + j];
//     //     //     if (typeof value === 'number') {
//     //     //         sum += Math.abs(value);
//     //     //     }
//     //     // }
//     //     // console.log(Math.floor(sum * 100));
//     //     // amplitude.push(sum/resolution);
//     //     amplitude.push(Math.abs(data[i]));
//     // }
//     // console.log(amp);
//     // console.log(amplitude[i]);
// }


ReactDOM.render(<App title="Project: JRectD"/>, document.getElementById('root'));
