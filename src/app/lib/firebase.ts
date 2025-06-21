// Firebase configuration file to centralize initialization
import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSdL97TTTohvlQh2gu8jM9Ss7j6WWO02Y",
  authDomain: "towertrader-56483.firebaseapp.com",
  projectId: "towertrader-56483",
  storageBucket: "towertrader-56483.firebasestorage.app",
  messagingSenderId: "253066400729",
  appId: "1:253066400729:web:585e5afd4098f88a823fc8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }