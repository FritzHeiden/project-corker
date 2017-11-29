import React from 'react'
import Line from './Line.js';
import FileService from '../services/file-service.js';

class FormPage extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          correctPath: true,
        }

        this.changeView = this.changeView.bind(this);
        this.checkPath = this.checkPath.bind(this);
        this.test = this.test.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
      }


  showErrorMessage(){
    console.log("not found!");
    let inputPath = document.getElementById('form').getBoundingClientRect();
    let left = inputPath.left;
    let top = inputPath.top;
    document.getElementById('path').value = "";

    document.getElementById('errorMessage').style.display = "block";
    document.getElementById('errorMessage').style.position = "absolute";
    document.getElementById('errorMessage').style.left = left +  175 + "px";
    document.getElementById('errorMessage').style.top = top  -  75 + "px";
  }

  showDj(){
    document.getElementById('signUp').style.display = "none";
    document.getElementById('online').style.display = "block";
    console.log("Path found!");
  }

  test(){
    console.log(this.state.correctPath);
    if(this.state.correctPath === true){
      this.showDj();
    }
    else{
      this.showErrorMessage();
    }
  }

  changeView(){
    this.checkPath();

    setTimeout(this.test, 8);


/*
    if(this.state.correctPath === true){
      this.showDj();
    }
    else if(this.state.correctPath === false){
      this.showErrorMessage();
    }*/
  }

  checkPath(){
    let filePath = document.getElementById('path').value;
    let testFilePath = new FileService('127.0.0.1', '2345');

    testFilePath.getFiles(filePath).then(files => {
      this.setState({correctPath : true});
    }).catch(error => {
      this.setState({correctPath : false});
    })
  }

  handleKeyPress(e){
    if (e.key === 'Enter') {
      this.changeView();
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
            <div className="errorMessage" id="errorMessage">
              <p> Musikverzeichnis wurde nicht gefunden! Bitte überprüfen Sie Ihre eingabe. </p>
            </div>
           </div>
        )}
        <button className="pushButton" onClick={this.changeView.bind(this)}>Fertig</button>
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
