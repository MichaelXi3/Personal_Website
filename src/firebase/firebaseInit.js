import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB1WT5yQ-xPYecy7v4TxXM0kt7lu3xZNaE",
    authDomain: "personalweb-55e41.firebaseapp.com",
    projectId: "personalweb-55e41",
    storageBucket: "personalweb-55e41.appspot.com",
    messagingSenderId: "644338130707",
    appId: "1:644338130707:web:b4ce2ea1756d82147684e6",
    measurementId: "G-S52WNFEL2G"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();