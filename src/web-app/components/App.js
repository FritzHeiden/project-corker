import React from 'react';
import ReactDOM from 'react-dom';

import Footer from './Footer.js';
import AudioBox from './AudioBox.js';
import FormPage from './SignUp.js';

import * as website from '../test/website.js';
import * as sidebar from '../test/sidebar.js';

/* Images */
import BackgroundImage from '../svg/background.js';
import Options from '../svg/options.js';


class App extends React.Component {

   constructor(props){
     super(props);
    }

   render() {
     const {title} = this.props;

     return (
       <div>
        <BackgroundImage/>
        <div id="signUp" className="signUp">
              <h1>{title}</h1>
              <FormPage title="Anmelden"/>
        </div>
        <div id="online" className="online">
          <SideBar/>
          <Options/>
          <div id="main" className="main">
            <h1>{title}</h1>
            <div className="actionBox">
              <AudioBox/>
              <AudioBox/>
            </div>
            <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
          </div>
        </div>

        {/*
         <SideBar/>
         <Options/>
         <BackgroundImage/>
         <div id="main" className="main">
          <h1>{title}</h1>
          <div className="actionBox">
            <div className="audio">
              <AudioBox last="false"/>
            </div>
          </div>
          <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
         </div>



         {/*
         <div id="main" className="main">
            <h1>{title}</h1>
            <div className="actionBox">
              <div className="audio">
                <AudioBox last="false"/>
              </div>
              {/*not solved well, if I still have time I should work on that later on -->
              <div className="audio secondAudioBox">
                <AudioBox last="true"/>
              </div>
            </div>
            <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
         </div>
         */}
       </div>
     );
   }
}


class SideBar extends React.Component {

   constructor(props){
     super(props);
     this.state={
       correctPath: true,
     }
     this.handleKeyPress = this.handleKeyPress.bind(this);
    }


    handleKeyPress(e) {
      if (e.key === 'Enter') {
        let pathExist = false;
        if(pathExist){
          this.state.correctPath = true
          sidebar.closeOptions();
          document.getElementById('inputFolderPath').value = '';
          console.log('Verzeichnis upgedated');
        }
        else if(!pathExist){
          this.state.correctPath = false;
          console.log('Verzeichnis nicht gefunden');
        }
      }
    }

   render() {
     const {title} = this.props;
     const correctPath = this.state.correctPath;

     return (
       <div id="mySidenav" className="sidenav">
        <h3> Wollen Sie ein neuen Ordnerpfad eingeben?</h3>
        {correctPath ? (
          <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"} onKeyPress={this.handleKeyPress.bind(this)}/>
         ) : (
           <div>
             <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"} onKeyPress={this.handleKeyPress.bind(this)}/>
             <div className="wrongPath"/>
             <p>Pfad wurde nicht gefunden! Bitte überprüfen Sie Ihre eingabe</p>
           </div>
        )}
       </div>
     );
   }
}

/*
class MenuOptions extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const{imageOne, imageTwo, disOne, disTwo} = this.props;

    return(
      <div id="menuOps" className="menuOps">
        <div>
          <img src={imageOne}/><span>{disOne}</span>
        </div>
        <div>
          <img src={imageTwo}/><span>{disTwo}</span>
        </div>
      </div>
    );
  }
}
*/


class MenuButton extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      clickedMenu: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.handleCrossClick = this.handleCrossClick.bind(this);
    this.onHover = this.onHover.bind(this);
   }

   onHover(){
     if(this.state.clickedMenu === false){
       website.hover();
     }
   }

   handleMenuClick() {
     if(this.state.clickedMenu === false){
       this.setState({clickedMenu: true});
       website.showMenu();
     }
   }

   handleCrossClick(){
     if(this.state.clickedMenu === true){
       this.setState({clickedMenu: false});
       website.closeMenu();
     }
   }



  render() {
    return (
      <div>

      {/*
      <div id="menuButtons" className="menuButtons" onClick={this.handleMenuClick} onMouseOver={this.onHover}>
        <div className="rect"/>
        <div className="rect"/>
        <div className="rect"/>

      <div className="rect" id="crossOne" onClick={this.handleCrossClick}/>
      <div className="rect" id="crossTwo" onClick={this.handleCrossClick}/>
      <div className="rect" id="openMenu">
        <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"}/>
      </div>


  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 452 269">
    <g>
      <g>
        <line style={[all,one]} x1="445.5" y1="28.5" x2="6.5" y2="28.5"/>
        <circle style={[all,two]} cx="52" cy="29.5" r="25"/>
        <line style={[all,one]} x1="445.5" y1="134.5" x2="6.5" y2="134.5"/>
        <circle style={[all,two]} cx="366" cy="134.5" r="25"/>
        <line style={[all,one]} x1="445.5" y1="239.5" x2="6.5" y2="239.5"/>
        <circle style={[all,two]} cx="43" cy="239.5" r="25"/>
      </g>
    </g>
  </svg>

      <div className="rect"/>
      <div stlye={circle_1}/>
      <div className="rect"/>
      <div stlye={circle_2}/>
      <div className="rect"/>
      <div className="options" stlye={circle_1}/>


*/}
      </div>
    );
  }
}

export default App;
