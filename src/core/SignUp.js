import React from 'react'
import Line from './Line.js';

/* Images*/
import BackgroundImage from './svg/background.js';


class SignUp extends React.Component {
   constructor(props){
     super(props);
   }

   render() {
     const{title} = this.props;
      return (
        <div>
          <BackgroundImage/>
          <h1>{title}</h1>
          <FormPage title="Anmelden"/>
        </div>
      );
   }
}

class FormPage extends React.Component {

      constructor(props) {
        super(props);
        this.state = {
          formValues: {}
        }
      }

      handleChange(event) {
          event.preventDefault();
          let formValues = this.state.formValues;
          let name = event.target.name;
          let value = event.target.value;
          website.helloWorld();

          formValues[name] = value;

          this.setState({formValues})
      }


      handleSubmit(event) {
          event.preventDefault();
          console.log(this.state.formValues);
      }

  render() {
    const {title} = this.props;

    let userReact=
    {
      height: "8%",
      width: "3%",
      marginTop: "2rem",
      display: "block",
      color: "red",
    }

    let left =
    {
      float: "left",
    }

    return (
      <div className="form">
        <h2 className="options">{title}</h2>
        <Line/>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="name" placeholder={'Name'} style={left} value={this.state.formValues["name"]} onChange={this.handleChange.bind(this)} />
          <div style={userReact}/>
          <input type="text" name="folder" placeholder={'Musikverzeichnis'} style={left} value={this.state.formValues["folder"]} onChange={this.handleChange.bind(this)}/>
          <div style={[userReact,left]}/>
          <input className="pushButton" type="submit" value="Fertig" />
        </form>
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
export default SignUp;
