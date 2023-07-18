import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8IhmlMGxaVox6ekcHnOopM8wh5n0LFcY",
  authDomain: "pollmaster-47a32.firebaseapp.com",
  projectId: "pollmaster-47a32",
  storageBucket: "pollmaster-47a32.appspot.com",
  messagingSenderId: "494754897836",
  appId: "1:494754897836:web:9aaeb92ebb504754bd6409",
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
