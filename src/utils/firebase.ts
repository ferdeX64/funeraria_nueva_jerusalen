// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA45qTufz4cQDe_qVQpJwJQ3SXi54lc_v0",
  authDomain: "funeraria-renacer.firebaseapp.com",
  projectId: "funeraria-renacer",
  storageBucket: "funeraria-renacer.appspot.com",
  messagingSenderId: "480072514557",
  appId: "1:480072514557:web:9b322682c942aafc16b794",
  measurementId: "G-NQZC05C4N7"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
