// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjweJ5Dz48QMJEprAUmgz3ScDzMN2vG4w",
  authDomain: "ecommerce-51ddc.firebaseapp.com",
  projectId: "ecommerce-51ddc",
  storageBucket: "ecommerce-51ddc.firebasestorage.app",
  messagingSenderId: "145927625131",
  appId: "1:145927625131:web:770a0a0ff9b812259edaee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);
const auth = getAuth(app);

export { fireDb, auth };
