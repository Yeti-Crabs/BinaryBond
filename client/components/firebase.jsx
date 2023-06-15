import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_JXPlMaUL7Ig0iQQs4gM9f5c3jS9ttjY",
    authDomain: "binarybond-1c15f.firebaseapp.com",
    projectId: "binarybond-1c15f",
    storageBucket: "binarybond-1c15f.appspot.com",
    messagingSenderId: "60813047449",
    appId: "1:60813047449:web:8d5aa2b426d9896d78aa08",
    measurementId: "G-LKX4KM371W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = firebase.storage();
const storageRef = storage.ref();

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}