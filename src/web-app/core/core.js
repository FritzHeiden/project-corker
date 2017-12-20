import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.js';
import css from '../css/mainStyle.css'


ReactDOM.render(<App title="Project: JRectD" signUp="Log in" footerTitle="File path"/>, document.getElementById('root'));
