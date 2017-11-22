import File from './file';

export default class AudioFile extends File {
    constructor(path, filename, data, extension, isDirectory, audioBuffer) {
        super(path, filename, data, extension, isDirectory);
        this._audioBuffer = audioBuffer;
    }

    get audioBuffer() {
        return this._audioBuffer;
    }

    set audioBuffer(value) {
        this._audioBuffer = value;
    }
}