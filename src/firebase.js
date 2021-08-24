import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDZF_T2L4yn_cosRI2DePiZPizjEP-ahS8",
    authDomain: "what-sappclone-10b89.firebaseapp.com",
    projectId: "what-sappclone-10b89",
    storageBucket: "what-sappclone-10b89.appspot.com",
    messagingSenderId: "705061848533",
    appId: "1:705061848533:web:89c40018b15f8ca56fe95c",
    measurementId: "G-9XDEP88H7Q"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db;
