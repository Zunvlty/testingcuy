// firebase-config.js
// GANTI dengan config dari Firebase Console Anda
const firebaseConfig = {
    apiKey: "AIzaSyDH3T3sqPnLId0ah8CeF7-qfS64droz95M",
    authDomain: "PROJECT_ID.firebaseapp.com",
    projectId: "hydrotech-ba009",
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "1015497585103",
    appId: "1:1015497585103:web:7f1d2a99755de36a5662ba"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Export untuk digunakan di file lain
window.db = db;
window.auth = auth;
window.storage = storage;