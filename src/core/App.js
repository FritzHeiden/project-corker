import React from 'react';
import ReactDOM from 'react-dom';
import SVGPart from './SVG.js';
import Footer from './Footer.js';
import AudioBox from './AudioBox.js';
import * as website from './js/website.js';

class App extends React.Component {

   constructor(props){
     super(props);
    }

   render() {
     const {title} = this.props;

     return (
       <div>
         <div id="wrapper">
          <SVGPart/>
          <MenuButton/>
          <h1>{title}</h1>
          <div className="actionBox">
            <div className="audio">
              <AudioBox last="false"/>
            </div>
            {/*not solved well, if I still have time I should work on that later on -->*/}
            <div className="audio secondAudioBox">
              <AudioBox last="true"/>
            </div>
          </div>
          <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
         </div>
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
      clicked: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.onHover = this.onHover.bind(this);
   }

   onHover(){
     if(this.state.clicked === false){
       website.hover();
     }
   }

   handleClick() {
     if(this.state.clicked === false)
     {
       this.setState({clicked: true});
       website.showMenu();
     }
     else
     {
       if(this.state.clicked === true){
         this.setState({clicked: false});
         website.closeMenu();
       }
     }
   }

  render() {
    return (
      <div id="menuButtons" className="menuButtons" onClick={this.handleClick} onMouseOver={this.onHover}>
        <div className="rect" id="crossOne"/>
        <div className="rect" id="crossTwo"/>
        <div className="rect" id="openMenu">
          <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"}/>
        </div>
      </div>
    );
  }
}

export default App;
