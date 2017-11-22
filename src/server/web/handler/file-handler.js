import fs from 'fs';
import {AppPath} from "../../core";
import path from 'path';

export default class FileHandler {
    constructor() {

    }

    _getFiles(request, response) {
        let requestPath = FileHandler._getPath(request);

        this._listDir(requestPath)
            .then(files => response.send(files))
            .catch(err => {
                console.error(err);
                response.status(500).send(err.message);
            });
    }

    _getFile(request, response) {
        let requestPath = FileHandler._getPath(request);

        this._isFile(requestPath)
            .then(isFile => {
                if (isFile) {
                    response.sendFile(requestPath);
                } else {
                    response.status(400).send(requestPath + " is not a file.");
                }
            })
            .catch(err => {
                console.error(err);
                response.status(404).send(err.message)
            });
    }

    _listDir(dir) {
        return new Promise((resolve, reject) => {
            let getFiles = new Promise((resolve, reject) => {
                fs.readdir(dir, (err, files) => {
                    if (err) {
                        reject(err);
                    } else {
                        files = files.map(file => path.join(dir, file));
                        resolve(files);
                    }
                });
            });

            getFiles.then((files) => {
                let getStats = Promise.all(files.map(file => this._getStats(file)));

                getStats.then((stats) => {
                    let responseFiles = {directories: [], files: []};
                    for (let i = 0; i < stats.length; i++) {
                        if (stats[i].isDirectory()) {
                            responseFiles.directories.push(stats[i].file.split("/").pop());
                        } else {
                            responseFiles.files.push(stats[i].file.split("/").pop());
                        }
                    }

                    resolve(responseFiles);
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        });
    }

    _isFile(path) {
        return new Promise((resolve, reject) => {
            this._getStats(path)
                .then(stats => resolve(!stats.isDirectory()))
                .catch(err => {
                    console.error(err);
                    reject(err.message);
                });
        })
    }

    static _getPath(request) {
        let requestPath = "";
        let absolute = request.query.absolute ? request.query.absolute === "true" : false;

        if (request.query.path) {
            requestPath = request.query.path;
            if (!absolute) {
                requestPath = path.join(AppPath, requestPath);
            }
        } else {
            requestPath = "/";
            if (!absolute) {
                requestPath = path.join(AppPath, requestPath);
            }
        }

        return requestPath;
    }

    _getStats(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stats) => {
                if (err) {
                    reject(err);
                } else {
                    stats.file = path;
                    resolve(stats);
                }
            });
        });
    }

    getHandlers() {
        return [
            {method: "get", path: "/api/files", callback: this._getFiles.bind(this)},
            {method: "get", path: "/api/file", callback: this._getFile.bind(this)}
        ];
    }
}