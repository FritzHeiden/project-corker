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
      <div id="menuButtons" className="menuButtons" onClick={this.handleMenuClick} onMouseOver={this.onHover}>
        <div className="rect" id="crossOne" onClick={this.handleCrossClick}/>
        <div className="rect" id="crossTwo" onClick={this.handleCrossClick}/>
        <div className="rect" id="openMenu">
          <input className="inputFolderPath" id="inputFolderPath" type="text" placeholder={"Neue Ordnerangabe"}/>
        </div>
      </div>
    );
  }
}

export default App;
