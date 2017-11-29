import React from 'react'
import Line from './Line.js';
import FileService from '../services/file-service.js';

class FormPage extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          correctPath: true,
        }

        this.checkPath = this.checkPath.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }

  checkPath() {
    let filePath = document.getElementById('path').value;
//TODO

    let testFilePath = new FileService('127.0.0.1', '2345');
    testFilePath.getFiles(filePath).then(files => {
      this.state.correctPath = true;
      this.setState(this.state);
    }).catch(error => {
      this.state.correctPath = false;
      this.setState(this.state);
    })

    if(this.state.correctPath === true){
      this.state.correctPath = true;
      document.getElementById('signUp').style.display = "none";
      document.getElementById('online').style.display = "block";
      console.log("Path found!");
    }
    else if(this.state.correctPath === false){
      this.state.correctPath = false;
      let inputPath = document.getElementById('form').getBoundingClientRect();
      let left = inputPath.left;
      let top = inputPath.top;

      console.log(left);
      console.log(top);
      document.getElementById('path').value = "";
      //document.getElementById("bubble").style.left = "100px";

      document.getElementById('bubble').style.position = "absolute";
      document.getElementById('bubble').style.display = "block";
      document.getElementById('bubble').style.left = left +  175 + "px";
      document.getElementById('bubble').style.top = top  -  75 + "px";
    }
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
        <h2 className="options">{title}</h2>
        <Line/>
        {correctPath ? (
          <input id="path" className="path" type="text" name="folder" placeholder={'Musikverzeichnis'} onKeyPress={this.handleKeyPress.bind(this)}/>
        ) : (
           <div>
            <input id="path" className="path" type="text" name="folder" placeholder={'Musikverzeichnis'} onKeyPress={this.handleKeyPress.bind(this)}/>
            <div className="wrongPathSignUp"/>
            <div className="bubble" id="bubble">
              <p> Musikverzeichnis wurde nicht gefunden! Bitte überprüfen Sie Ihre eingabe. </p>
            </div>
           </div>
        )}
        <button className="pushButton" onClick={this.checkPath}>Fertig</button>
      </div>
    );
  }
}
/*
onFocus() {
  this.refs.myInput.classList.add('focus');
}

onBlur() {
  this.refs.myInput.classList.remove('focus');
}

render() {

  let userReact=
  {
    backgroundColor: "red",
    height: "8%",
    width: "3%",
    marginTop: "2rem",
  }

  let left =
  {
    float: "left",
  }

  return (
    <div className="form">
      <h2 className="options">{title}</h2>
      <Line/>
      <input ref="myInput" type="text" placeholder={'Name'} style={left} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
      <input ref="myInput" type="text" placeholder={'Musikverzeichnis'} style={left} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
      <div style={[userReact, left]}/>
      <button name="button" className="pushButton">Fertig</button>
    </div>
  );
}
*/
export default FormPage;
