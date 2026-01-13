// src/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6541VXLO98XAV7jr4s8tvsUWyf6rbHNM",
  authDomain: "deepmotive-ed158.firebaseapp.com",
  projectId: "deepmotive-ed158",
  storageBucket: "deepmotive-ed158.firebasestorage.app",
  messagingSenderId: "939468711030",
  appId: "1:939468711030:web:05d3b858f5ad128e726b57",
  measurementId: "G-MZ9QMHG8MN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db }; // Removed analytics
