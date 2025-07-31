// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyARaYK1OKR-Qc2VmJ3rTbjWdhtIMgTDNuQ",
  authDomain: "netflixgpt-a018c.firebaseapp.com",
  projectId: "netflixgpt-a018c",
  storageBucket: "netflixgpt-a018c.firebasestorage.app",
  messagingSenderId: "237421547209",
  appId: "1:237421547209:web:55d8ade20a5ea7b0cbc718",
  measurementId: "G-N37SZ7JSL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();