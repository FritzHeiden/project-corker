import express from 'express';
import path from 'path';

const appPath = path.dirname(process.mainModule.filename);

const app = express();

const port = 5432;

app.use(express.static(path.join(appPath, "./web-app")));

app.listen(port, () => console.log("Server started on port " + port));