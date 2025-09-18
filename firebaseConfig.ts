// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDls6N2ogUOE4WGsA-r91HZ69LhgQvrk18",
  authDomain: "vintage.firebaseapp.com",
  projectId: "vintage-d6de6",
  storageBucket: "vintage.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:361231391535:android:28fa4ff314061f7e9e5fda"
};

// init firebase
const app = initializeApp(firebaseConfig);

// export auth + firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
