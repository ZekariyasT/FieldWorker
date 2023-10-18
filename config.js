// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import {getStorage} from "firebase/storage";
// import {getFirestore} from "firebase/firestore";
// import {getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAW11v1rUCIzeRTdkOB_-M05_ClBl9BthU",
//   authDomain: "myfield-c56b0.firebaseapp.com",
//   projectId: "myfield-c56b0",
//   storageBucket: "myfield-c56b0.appspot.com",
//   messagingSenderId: "625684935758",
//   appId: "1:625684935758:web:6fa1e1f193af78c1b47f1f",
//   measurementId: "G-NC7LCS7YEV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// export const storage=getStorage(app);
// export const db=getFirestore(app);
// export const auth=getAuth(app);

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import {getAuth} from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Note: Removed redundant import
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAW11v1rUCIzeRTdkOB_-M05_ClBl9BthU",
  authDomain: "myfield-c56b0.firebaseapp.com",
  projectId: "myfield-c56b0",
  storageBucket: "myfield-c56b0.appspot.com",
  messagingSenderId: "625684935758",
  appId: "1:625684935758:web:6fa1e1f193af78c1b47f1f",
  measurementId: "G-NC7LCS7YEV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export const storage = getStorage(app);
export const db = getFirestore(app);
// export const au=getAuth(app);
export { auth }; // Export the initialized auth instance
