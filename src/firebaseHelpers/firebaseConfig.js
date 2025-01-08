import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBQHGC3T8PkzUg4t4GcnKFtCoIIgOLgpvw",
  authDomain: "it-yas.firebaseapp.com",
  projectId: "it-yas",
  storageBucket: "it-yas.firebasestorage.app",
  messagingSenderId: "645405985398",
  appId: "1:645405985398:web:d371ddc9f39244615ead57",
  measurementId: "G-XZQVJ47B3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Set session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Session persistence set to browser session.");
  })
  .catch((error) => {
    console.error("Failed to set session persistence:", error);
  });

export { db, auth };
