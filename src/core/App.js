import React from 'react';
import SVGPart from './SVG.js';
import Footer from './Footer.js';
import AudioBox from './AudioBox.js';
//import WebsiteJs from './js/website.js';

class App extends React.Component {

   constructor(props){
     super(props);
    }

    handleClick() {
    /*  obj = document.getElementById('#wrapper');
      obj.style.position='relative';

      function shake(interval) {
          obj.style.right = '10px';
          setTimeout(function(){
              obj.style.right = '0px';
          }, interval);
      }

      setInterval(function(){
          shake(500);
      }, 1000)
      */
   }

   render() {
     const {title} = this.props;

     let wrapper ={
       display: "block",
     }

     let menu ={
       display: "none",
     }



     return (
        <div stlye={wrapper} id="wrapper">
          <SVGPart/>
          <MenuButton onClick={this.handleClick()}/>
          <h1>{title}</h1>
          <div className="actionBox">
            <div className="audio">
              <AudioBox/>
            </div>
          </div>
          <Footer title="Ordnerverzeichnis" colOneName="Titel" colTwoName="Künstler" colThreeName="Dauer"/>
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
  render() {
    return (
      <div className="menuButtons" id="showMenu">
        <div className="rect"></div>
        <div className="rect"></div>
        <div className="rect"></div>
      </div>
    );
  }
}

export default App;
