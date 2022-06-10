import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCmX9Ja9ffuSCsji6-z-a14S72xwHUYHqA",
    authDomain: "bloggie-e75f5.firebaseapp.com",
    projectId: "bloggie-e75f5",
    storageBucket: "bloggie-e75f5.appspot.com",
    messagingSenderId: "366390747706",
    appId: "1:366390747706:web:67119fbb1801378c3fcb03",
    measurementId: "G-QDY0QLY6JY"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();