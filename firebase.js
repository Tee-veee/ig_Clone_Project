import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAzzXxdtsRmnnWn6z1mjiYOrnChILWoRJM",
  authDomain: "insta-clone-project-339113.firebaseapp.com",
  projectId: "insta-clone-project-339113",
  storageBucket: "insta-clone-project-339113.appspot.com",
  messagingSenderId: "571543929609",
  appId: "1:571543929609:web:fb5f48b4fdcdefab4549d8",
};

// Initialize Firebase
// CODE SETTINGS FOR SSR APP
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// INIT FIREBASE PRODUCTS
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);

export { app, db, storage };
