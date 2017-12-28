import React from 'react'

import Line from './designObjects/Line.js';
import {Config} from '../services/file-path-service.js';
import FileService from '../services/file-service.js';

export default class FormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correctPath: true,
    };
     this.checkPath = this.checkPath.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount(){
      this.filePath.focus();
  }

  static showErrorMessage(){
    let inputPath = document.getElementById('form').getBoundingClientRect();
    let left = inputPath.left;
    let top = inputPath.top;

    document.getElementById('filePath').value = "";
    document.getElementById('errorMessage').style.left = left +  175 + "px";
    document.getElementById('errorMessage').style.top = top - 75 + "px";
  }

  static showDj(){
    document.getElementById('login').style.display = "none";
    document.getElementById('online').style.display = "block";
  }

  checkPath(){
    let filePath = document.getElementById('filePath').value;
    let testFilePath = new FileService('127.0.0.1', 2345);

    testFilePath.getFiles(filePath).then(files => {
      this.setState({correctPath : true});
      Config.path = filePath;
      FormPage.showDj();
    }).catch(error => {
      this.setState({correctPath : false});
      console.error(error);
      FormPage.showErrorMessage();
    })
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.checkPath();
    }
  }

  render() {
    const {title} = this.props;
    const correctPath = this.state.correctPath;

    return (
      <div id="form" className="form">
        <h2 className="loginTitle">{title}</h2>
        <Line/>
        {correctPath ? (
          <input
              id="filePath"
              className="path"
              type="text"
              name="filePath"
              placeholder={'Music file path'}
              onKeyPress={this.handleKeyPress.bind(this)}
              ref={(input) => { this.filePath = input; }}
          />
        ) : (
           <div>
            <input
                id="filePath"
                className="path"
                type="text"
                name="filePath"
                placeholder={'Music file path'}
                onKeyPress={this.handleKeyPress.bind(this)}
                ref={(input) => { this.filePath = input; }}
            />
            <div className="wrongPath"/>
            <div className="errorMessage" id="errorMessage">
              <p> Music file path not found! Please check your spelling.</p>
            </div>
           </div>
        )}
        <button className="pushButton" onClick={this.checkPath.bind(this)}>Log in</button>
      </div>
    );
  }
}

