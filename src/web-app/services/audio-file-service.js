import FileService from "./file-service";

export default class AudioFileService extends FileService {
    constructor(hostname = "", port = 80) {
        super(hostname, port);

    }

    getAudioFile(path, absolute = false) {
        return new Promise((resolve, reject) => {
            this.getFile(path, absolute).then()
        });
    }
}