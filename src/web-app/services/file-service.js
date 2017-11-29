import File from '../data/file';
import pathTool from 'path';

export default class FileService {
    constructor(hostname = "", port = 80) {
        this.hostname = hostname;
        this.port = port;
    }

    getFile(path, absolute = false) {
        let promise = this._sendRequest("/api/file?path={0}&absolute={1}".format(path, absolute));
        return new Promise((resolve, reject) => {
            promise.then(response => {
                let directory = false;
                let filepath = path;
                let filename = path.split("/").pop();
                let data = response;
                let extension = filename.split(".").pop();
                let file = new File(filepath, filename, data, extension, directory);

                resolve(file);
            });
            promise.catch(status => reject(status));
        });
    }

    getFiles(path, absolute = false) {
        let promise = this._sendTextRequest("/api/files?path={0}&absolute={1}".format(path, absolute));
        return new Promise((resolve, reject) => {
            promise.then(response => {
                let filesJson = JSON.parse(response);
                let files = [];

                for (let i = 0; i < filesJson.files.length; i ++) {
                    let file = filesJson.files[i];
                    let directory = false;
                    let filepath = pathTool.join(path, file);
                    let filename = file;
                    let data = null;
                    let extension = file.split(".").pop();
                    files.push(new File(filepath, filename, data, extension, directory));
                }

                for (let i = 0; i < filesJson.directories.length; i ++) {
                    let file = filesJson.directories[i];
                    let directory = true;
                    let filepath = pathTool.join(path, file);
                    let filename = file;
                    let data = null;
                    let extension = null;
                    files.push(new File(filepath, filename, data, extension, directory));
                }
                resolve(files);
            });
            promise.catch(status => reject(status));
        });
    }

    _sendTextRequest(url, method = "get") {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    } else {
                        reject(request.status);
                    }
                }
            };
            if (this.hostname !== "") {
                url = "http://{0}:{1}{2}".format(this.hostname, this.port, url);
            }
            request.open(method, url);
            try {
                request.send();
            } catch (err) {
                reject(err);
            }
        });
    }

    _sendRequest(url, method = "get") {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.response);
                    } else {
                        reject(request.status);
                    }
                }
            };
            if (this.hostname !== "") {
                url = "http://{0}:{1}{2}".format(this.hostname, this.port, url);
            }
            request.open(method, url);
            request.responseType = "arraybuffer";
            try {
                request.send();
            } catch (err) {
                reject(err);
            }
        });
    }
}
