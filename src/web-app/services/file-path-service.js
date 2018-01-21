class Config {
  constructor(){
    this._path = ".";
  }

  set onPathChange(callback){
    this._onPathChange = callback;
  }

  set path(path){
    this._path  = path;
    this._onPathChange(this._path);
  }

  get path(){
    return this._path;
  }
}

let config = new Config();

exports.Config = config;
