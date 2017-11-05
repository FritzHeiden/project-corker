import React from 'react'
import SVGPart from './SVG.js';
import Line from './Line.js';

class SignUp extends React.Component {
   constructor(props){
     super(props);
   }

   render() {
     const{title} = this.props;
      return (
        <div>
          <SVGPart/>
          <h1>{title}</h1>
          <FormPage title="Anmelden"/>
        </div>
      );
   }
}

class FormPage extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    const {title} = this.props;

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
        <input type="text" placeholder={'Name'} style={left}/>
        <div style={[userReact, left]}/>
        <input type="text" placeholder={'Musikverzeichnis'} style={left}/>
        <div style={[userReact, left]}/>
        <button type="button" name="button" className="pushButton">Fertig</button>
      </div>
    );
 }
}

export default SignUp;
