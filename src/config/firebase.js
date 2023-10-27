import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAOkKuVD0KxSpM6RTgEUpz-Y4Dk7SymRaU",
  authDomain: "firedemo-45705.firebaseapp.com",
  projectId: "firedemo-45705",
  storageBucket: "firedemo-45705.appspot.com",
  messagingSenderId: "15036498625",
  appId: "1:15036498625:web:4fd5856c05e7d61ba9ca40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
