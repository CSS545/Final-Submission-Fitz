// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAecVa_YuTy0cir06a3eggaJkGlWyzxejA',
  authDomain: 'fitz-5fb0d.firebaseapp.com',
  projectId: 'fitz-5fb0d',
  storageBucket: 'fitz-5fb0d.appspot.com',
  messagingSenderId: '124622881272',
  appId: '1:124622881272:web:5ebb21be08004d8991160d',
  measurementId: 'G-D0WMP692NB',
};

// Initialize Firebase
!firebase.app.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export {firebase, db};
