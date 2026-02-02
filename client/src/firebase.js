import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCl9-PpeaorGdO-yYOoR1z8-zPfLxjeShA",
  authDomain: "oneapp-b8d69.firebaseapp.com",
  projectId: "oneapp-b8d69",
  storageBucket: "oneapp-b8d69.firebasestorage.app",
  messagingSenderId: "420056611761",
  appId: "1:420056611761:web:ce9acdf69edbf708f71b90",
  measurementId: "G-FK63KDCG0L",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
