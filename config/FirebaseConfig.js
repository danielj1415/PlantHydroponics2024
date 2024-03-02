// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBPoN_vr0FBrgRWajHuIoNxgxo563mTZM",
  authDomain: "fir-authproject-f3ea1.firebaseapp.com",
  projectId: "fir-authproject-f3ea1",
  storageBucket: "fir-authproject-f3ea1.appspot.com",
  messagingSenderId: "101705187846",
  appId: "1:101705187846:web:9bceb8ba0e6a78c2db7987",
  measurementId: "G-J9Y7RV3YGG"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {persistence: getReactNativePersistence(AsyncStorage)});
export const FIREBASE_DB = getFirestore(FIREBASE_APP);