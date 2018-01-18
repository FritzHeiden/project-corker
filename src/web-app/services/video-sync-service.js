export default class VideoSyncService {
  constructor (canvas) {
    this._canvas = canvas
    this.listeners = []
    this._chromaKeyVideoCount = 0
  }

  listenOnVideoDrawable (callback) {
    this.listeners.push(callback)
  }

  drawVideo () {
    this.listeners.forEach(callback => callback())
  }

  get canvas () {
    return this._canvas
  }

  increaseChromaKeyVideoCount () {
    this._chromaKeyVideoCount ++
  }

  decreaseChromaKeyVideoCount () {
    this._chromaKeyVideoCount --
  }

  get chromaKeyVideoCount () {
    return this._chromaKeyVideoCount
  }
}