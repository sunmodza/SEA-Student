// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
//import fitebase
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBy6hXVxT-NNRO3uHQ_9xVgWiMm-Jeji_g",
  authDomain: "sea-db.firebaseapp.com",
  databaseURL: "https://sea-db-default-rtdb.firebaseio.com",
  projectId: "sea-db",
  storageBucket: "sea-db.appspot.com",
  messagingSenderId: "1051067339687",
  appId: "1:1051067339687:web:faae3d978a096bd7199c82",
  measurementId: "G-4DJ3YBHSBK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth_tool = getAuth(app);
export const db = getDatabase(app);
