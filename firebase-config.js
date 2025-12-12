// firebase-config.js
// --- Koneksi Firebase SDK ---

// Tambahkan script ini di semua file HTML (sebelum script.js atau script lokal)
/*
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
*/

const firebaseConfig = {
    apiKey: "AIzaSyAXBhH6C0gzuh_ErtSwgch40Xzkum7H2pA",
    authDomain: "taskshare-production.firebaseapp.com",
    projectId: "taskshare-production",
    storageBucket: "taskshare-production.firebasestorage.app",
    messagingSenderId: "552032745720",
    appId: "1:552032745720:web:1444005dfc80ad02c0230d",
    measurementId: "G-Y72K3DLK64"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Eksport instance yang akan sering digunakan
const auth = firebase.auth();
const db = firebase.firestore();

console.log("Firebase Terkoneksi!");