// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwEHYQ-Z2sD50jJIvjWZzAJSykCSw_O-I",
  authDomain: "passvault-44dc4.firebaseapp.com",
  projectId: "passvault-44dc4",
  storageBucket: "passvault-44dc4.appspot.com",
  messagingSenderId: "976543803506",
  appId: "1:976543803506:web:b11fcdbaddf798f37f3aeb",
  measurementId: "G-0E3P5BBZ5C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// init & export firestore service
export const db = getFirestore(app)
// generate & export auth object
export const auth = getAuth(app)