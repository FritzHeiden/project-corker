export default class AudioFileAnalyser {
    static analyseAmplitudeByAverage(audioFile, resolution) {
        return new Promise((resolve, reject) => {
            try {
                let amplitude = [];

                let data = audioFile.audioBuffer.getChannelData(0);
                for (let i = 0; i < data.length; i += resolution) {
                    let sum = 0;
                    for (let j = 0; j < resolution; j++) {
                        let value = data[i + j];
                        if (typeof value === 'number') {
                            sum += Math.abs(value);
                        }
                    }
                    amplitude.push(sum / resolution);
                }
                resolve(amplitude);
            } catch (e) {
                reject(e);
            }
        });
    }

    static analyseAmplitudeByCherryPicking(audioFile, resolution) {
        return new Promise((resolve, reject) => {
            try {
                let amplitude = [];

                let data = audioFile.audioBuffer.getChannelData(0);
                for (let i = 0; i < data.length; i += resolution) {
                    amplitude.push(Math.abs(data[i]));
                }
                resolve(amplitude);
            } catch (e) {
                reject(e);
            }
        });
    }

    static analyseAmplitudeByNormalization(audioFile, resolution) {
        return new Promise((resolve, reject) => {
            try {
                let amplitude = [];

                let data = audioFile.audioBuffer.getChannelData(0);
                for (let i = 0; i < data.length; i += resolution) {
                    let sum = 0;
                    for (let j = 0; j < resolution; j++) {
                        let value = data[i + j];
                        if (typeof value === 'number') {
                            sum += Math.abs(value);
                        }
                    }
                    amplitude.push(sum / resolution);
                }
                resolve(amplitude);
            } catch (e) {
                reject(e);
            }
        }); 
    }
}