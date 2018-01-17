export default class ImageTools {
  static createContext2d(width, height) {
    let canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    let context = canvas.getContext('2d')
    context.width = width
    context.height = height
    return context
  }

  static createCanvas(width, height) {
    let canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    return canvas
  }
}