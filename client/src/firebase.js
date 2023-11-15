// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl6SspBeMhgG0pvmKca5m2Le240n4mw9A",
  authDomain: "news-portal-b77a0.firebaseapp.com",
  projectId: "news-portal-b77a0",
  storageBucket: "news-portal-b77a0.appspot.com",
  messagingSenderId: "680968802432",
  appId: "1:680968802432:web:9e0a26ab8dea15b90c5665"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
