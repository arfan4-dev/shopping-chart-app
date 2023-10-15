// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDE8z3P_CRcHKP_M5irTDcHV9uPqaMK95A",
  authDomain: "shopping-app-568ca.firebaseapp.com",
  projectId: "shopping-app-568ca",
  storageBucket: "shopping-app-568ca.appspot.com",
  messagingSenderId: "344967507758",
  appId: "1:344967507758:web:becee8f654ac11d22c14bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage();
export const db=getFirestore(app)