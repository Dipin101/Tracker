// client/src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Your Firebase config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyCl9-PpeaorGdO-yYOoR1z8-zPfLxjeShA",
  authDomain: "oneapp-b8d69.firebaseapp.com",
  projectId: "oneapp-b8d69",
  storageBucket: "oneapp-b8d69.firebasestorage.app",
  messagingSenderId: "420056611761",
  appId: "1:420056611761:web:ce9acdf69edbf708f71b90",
  measurementId: "G-FK63KDCG0L",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Auth & Firestore instances
const auth = firebase.auth();
const db = firebase.firestore();

export { app, auth, db };
export default app;
