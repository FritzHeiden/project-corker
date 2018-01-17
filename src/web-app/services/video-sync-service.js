export default class VideoSyncService {
  constructor (canvas) {
    this._canvas = canvas
    this.listeners = []

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
}