export default class File {
    constructor(path, filename, data, extension, isDirectory) {
        this._path = path;
        this._filename = filename;
        this._data = data;
        this._extension = extension;
        this._isDirectory = isDirectory;
    }

    get path() {
        return this._path;
    }

    set path(value) {
        this._path = value;
    }

    get filename() {
        return this._filename;
    }

    set filename(value) {
        this._filename = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get extension() {
        return this._extension;
    }

    set extension(value) {
        this._extension = value;
    }

    get isDirectory() {
        return this._isDirectory;
    }

    set setDirectory(value) {
        this._isDirectory = value;
    }
}