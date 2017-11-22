import path from 'path';
import WebServer from './web/web-server';
import FileHandler from './web/handler/file-handler';

export const AppPath = path.dirname(process.mainModule.filename);
const port = 5432;


let webServer = new WebServer(port);
let fileHandler = new FileHandler();
webServer.addHandler(fileHandler);

webServer.start();