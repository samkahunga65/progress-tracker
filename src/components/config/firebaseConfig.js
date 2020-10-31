import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyA0glbwY8h7RnwbDvhHF-BUDmicmFZXEIg",
    authDomain: "progresstracker-1d46d.firebaseapp.com",
    databaseURL: "https://progresstracker-1d46d.firebaseio.com",
    projectId: "progresstracker-1d46d",
    storageBucket: "progresstracker-1d46d.appspot.com",
    messagingSenderId: "381469557250",
    appId: "1:381469557250:web:13638a97f851e77cd15d1b",
    measurementId: "G-NNVJ7TCRHB"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage()
const db = firebase.firestore()
const auth = firebase.auth()
export {db, projectStorage, fire, auth}