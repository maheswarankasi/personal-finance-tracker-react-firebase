// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRkM0fdhuCO_1FpeW02d0jckAP-BoS-ic",
  authDomain: "personal-finance-tracker-781be.firebaseapp.com",
  projectId: "personal-finance-tracker-781be",
  storageBucket: "personal-finance-tracker-781be.firebasestorage.app",
  messagingSenderId: "961633050279",
  appId: "1:961633050279:web:fb58326651675e80e6c582",
  measurementId: "G-Z505MDMDDC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
