import React from 'react';

import Footer from './Footer.js';
import FinalVideo from './FinalVideo.js';
import AudioBox from './AudioBox.js';
import VideoBox from './VideoBox.js';
import FormPage from './SignUp.js';

import FileService from '../services/file-service.js';
import {Config} from '../test/filePath.js';
import {Sidebar} from '../test/sidebar.js';

/* Images */
import BackgroundImage from '../svg/background.js';
import Options from '../svg/options.js';


class App extends React.Component {

   constructor(props){
     super(props);
    }

   render() {
     const {title, signUp, footerTitle} = this.props;

     return (
       <div>
        <BackgroundImage/>
        <div id="signUp" className="signUp">
              <h1>{title}</h1>
              <FormPage title={signUp}/>
        </div>
        <div id="online" className="online">
          <SideBar/>
          <Options/>
          <div id="main" className="main">
            <h1>{title}</h1>
            <div className="actionBox">
              <AudioBox/>
              <VideoBox/>
              <VideoBox/>
              <AudioBox/>
            </div>
            <Footer title={footerTitle}/>
            <FinalVideo/>
          </div>
        </div>
       </div>
     );
   }
}


class SideBar extends React.Component {

   constructor(props){
     super(props);
     this.state={
       correctPath: true,
     };
     this.handleEnter = this.handleEnter.bind(this);
     this.checkPath = this.checkPath.bind(this);
    }

    handleEnter(e){
      if (e.key === 'Enter') {
        this.checkPath();
      }
    }

    checkPath(){
      let filePath = document.getElementById('path').value;
      console.log(filePath);
      let testFilePath = new FileService('127.0.0.1', 2345);

      console.log("getting files ...");
      testFilePath.getFiles(filePath).then(files => {
        this.setState({correctPath : true});
        Sidebar.closeSidebar();
        Config.path = filePath;
      }).catch(error => {
        this.setState({correctPath : false});
        console.error(error);
      })
    }

   render() {
     const correctPath = this.state.correctPath;

     return (
       <div id="mySidenav" className="sidenav">
        <h3> Wollen Sie ein neuen Ordnerpfad eingeben?</h3>
        {correctPath ? (
          <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"} onKeyPress={this.handleEnter.bind(this)}/>
         ) : (
           <div>
             <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"} onKeyPress={this.handleEnter.bind(this)}/>
             <div className="wrongPath"/>
             <p>Pfad wurde nicht gefunden! Bitte überprüfen Sie Ihre eingabe</p>
           </div>
        )}
       </div>
     );
   }
}


export default App;
