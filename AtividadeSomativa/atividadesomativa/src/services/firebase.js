import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcbJ5ppsDg8vnRXzC_B3axKIWHKZQmbAw",
  authDomain: "projetoead-4b40a.firebaseapp.com",
  projectId: "projetoead-4b40a",
  storageBucket: "projetoead-4b40a.firebasestorage.app",
  messagingSenderId: "499159808468",
  appId: "1:499159808468:web:2cc418413272fd241cbe41"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };