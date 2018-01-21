import { AppPath } from '../core';
import express from 'express';
import path from 'path';

export default class WebServer {
    constructor(port) {
        this.port = port;
        this.app = express();

        // Serve Web App
        this.app.use(express.static(path.join(AppPath, "./web-app")));
    }

    addHandler(handler) {
        handler.getHandlers().forEach(handler => {
            this.handle(handler.method, handler.path, handler.callback);
        })
    }

    handle(method, path, callback) {
        switch (method.toUpperCase()) {
            case "GET": this.app.get(path, callback)
        }
    }

    start() {
        this.app.listen(this.port, () => console.log("Server started on port " + this.port));
    }
}