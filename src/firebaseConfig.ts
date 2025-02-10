// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTayWDUm9Wr84ftUJzNzZ2ioqajmJOWP4",
  authDomain: "notificationsky-4f989.firebaseapp.com",
  projectId: "notificationsky-4f989",
  storageBucket: "notificationsky-4f989.appspot.com",
  messagingSenderId: "141889229847",
  appId: "1:141889229847:web:0e72293583886cb733b852",
  measurementId: "G-X3ZPC6BDSH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database
const database = getDatabase(app);

export { database, ref, onValue };
