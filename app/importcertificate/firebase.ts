// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDE8EJ9tjjNCY83ikPnzmScNyRVmRyws8o",
  authDomain: "certificate-generator-28952.firebaseapp.com",
  projectId: "certificate-generator-28952",
  storageBucket: "certificate-generator-28952.appspot.com",
  messagingSenderId: "687755431105",
  appId: "1:687755431105:web:beb739183bfe9a819b9840",
  measurementId: "G-N4PFZKDD5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth() 
export const storage = getStorage(app);