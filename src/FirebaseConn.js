import firebase from 'firebase';

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4Lw04QwrKjnwQrMmUdM3eo5J7oSpIrw8",
    authDomain: "devsapp-6a064.firebaseapp.com",
    databaseURL: "https://devsapp-6a064.firebaseio.com",
    projectId: "devsapp-6a064",
    storageBucket: "devsapp-6a064.appspot.com",
    messagingSenderId: "822127171016"
  };
  firebase.initializeApp(config);
console.disableYellowBox = true;

export default firebase;