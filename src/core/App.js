import React from 'react';
import SVGPart from './SVG.js';
import Footer from './Footer.js';
import AudioBox from './AudioBox.js';

class App extends React.Component {

   constructor(props){
     super(props);
   }

   render() {
     const {title} = this.props;

     return (
        <div>
          <div id="perspective" className="perspective effect-airbnb">
            <div className="container">
              <div className="wrapper">
                <SVGPart/>
                <MenuButton/>
                <h1>{title}</h1>
                <div className="actionBox">
                  <div className="audio">
                    <AudioBox/>
                  </div>
                </div>
                <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
              </div>
            </div>
          </div>
          <nav className="outer-nav left vertical">
            <MenuOptions imageOne="./img/home.svg" imageTwo="./img/options.svg" disOne="Home" disTwo="Einstellungen" />
          </nav>
        </div>
     );
   }
}

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

class MenuButton extends React.Component{
  render(){
    return(
      <div className="menuButtons" id="showMenu">
        <div className="rect"></div>
        <div className="rect"></div>
        <div className="rect"></div>
      </div>
    );
  }
}

export default App;
