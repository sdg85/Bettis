import firebase from 'firebase/app';
import 'firebase/storage';

//initialize firebase
var config = {
    apiKey: "AIzaSyAxuOFU3dSyYsxYFPbhRAJUBHU-j7CgBl4",
    authDomain: "bettis-app.firebaseapp.com",
    databaseURL: "https://bettis-app.firebaseio.com",
    projectId: "bettis-app",
    storageBucket: "bettis-app.appspot.com",
    messagingSenderId: "794710045702"
  };
  
  firebase.initializeApp(config);

  export default firebase;
