
// import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// import { getStorage } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-storage.js";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyC7t5YgEz8pg0e27nDWakaVmvbNiQh7C6U",
    authDomain: "devotional-5f113.firebaseapp.com",
    projectId: "devotional-5f113",
    storageBucket: "devotional-5f113.firebasestorage.app",
    messagingSenderId: "622770302857",
    appId: "1:622770302857:web:b2f906bd2734e10f743b58"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { auth, db };
