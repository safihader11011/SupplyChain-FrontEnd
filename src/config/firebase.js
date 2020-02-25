import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDe7f5BI57y3VaKXYavpjBIxvmksWmTypE",
  authDomain: "supplychain-a3882.firebaseapp.com",
  databaseURL: "https://supplychain-a3882.firebaseio.com",
  projectId: "supplychain-a3882",
  storageBucket: "supplychain-a3882.appspot.com",
  messagingSenderId: "16870198532",
  appId: "1:16870198532:web:62faffc4886506e4f49451",
  measurementId: "G-757XR142F2"
};

firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;