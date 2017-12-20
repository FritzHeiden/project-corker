export default class AudioFileAnalyser {
  static async analyseAmplitudeByAverage (audioBuffer, resolution) {
    let amplitude = []

    let data = audioBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i += resolution) {
      let sum = 0
      for (let j = 0; j < resolution; j++) {
        let value = data[i + j]
        if (typeof value === 'number') {
          sum += Math.abs(value)
        }
      }
      amplitude.push(sum / resolution)
    }
    return amplitude
  }

  static async analyseAmplitudeByCherryPicking (audioBuffer, resolution) {
    let amplitude = []

    let data = audioBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i += resolution) {
      amplitude.push(Math.abs(data[i]))
    }
    return amplitude
  }

  static async analyseAmplitudeByNormalization (audioBuffer, resolution) {
    let amplitude = []

    let data = audioBuffer.getChannelData(0)
    for (let i = 0; i < data.length; i += resolution) {
      let sum = 0
      for (let j = 0; j < resolution; j++) {
        let value = data[i + j]
        if (typeof value === 'number') {
          sum += Math.abs(value)
        }
      }
      amplitude.push(sum / resolution)
    }
    return amplitude
  }
}