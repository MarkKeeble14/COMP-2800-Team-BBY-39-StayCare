var firebaseConfig = {
    apiKey: "AIzaSyBQnQW_8MqyNDbKQO6C0qkbv75zDq99vMQ",
    authDomain: "testingcare-bf176.firebaseapp.com",
    databaseURL: "https://testingcare-bf176.firebaseio.com",
    projectId: "testingcare-bf176",
    storageBucket: "testingcare-bf176.appspot.com",
    messagingSenderId: "202673724275",
    appId: "1:202673724275:web:c6824492449f8b6158c306"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const db = firebase.firestore();
var storage = firebase.storage();
