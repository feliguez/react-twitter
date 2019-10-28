import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import firebase from 'firebase';
import * as serviceWorker from './serviceWorker';
import App from './App';

firebase.initializeApp({
  apiKey: 'AIzaSyCRrydw1k7AuXzzwfzX_roe-W4SJtnuRp8',
  authDomain: 'reacttr-feliguez.firebaseapp.com',
  databaseURL: 'https://reacttr-feliguez.firebaseio.com',
  projectId: 'reacttr-feliguez',
  storageBucket: 'reacttr-feliguez.appspot.com',
  messagingSenderId: '605301746722',
  appId: '1:605301746722:web:3a9dc6082c996cbe20ae7b',
  measurementId: 'G-J0EV4NZ396'
});
firebase.analytics();
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
