// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmUIk27E3xN9oTc4BTLZYW8WoyNeQx4vA",
  authDomain: "keystroke-dynamics-auth.firebaseapp.com",
  databaseURL:
    "https://keystroke-dynamics-auth-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "keystroke-dynamics-auth",
  storageBucket: "keystroke-dynamics-auth.appspot.com",
  messagingSenderId: "54996705626",
  appId: "1:54996705626:web:27ef94593469568e559363",
  measurementId: "G-01DN0T7N7C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
const analytics = getAnalytics(app);
