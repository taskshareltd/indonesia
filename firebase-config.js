// firebase-config.js
// --- Koneksi Firebase SDK ---

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

// ============================================
// DEVICE MANAGEMENT FUNCTIONS
// ============================================

// Generate simple device fingerprint (kurang prone to change)
function generateSimpleDeviceId() {
    // Hanya ambil data yang jarang berubah
    const components = [
        navigator.platform || 'unknown', // Windows, Mac, Linux, Android, iOS
        navigator.language || 'unknown', // Language
        screen.width > 768 ? 'desktop' : 'mobile', // Device type
        navigator.userAgent.includes('Chrome') ? 'chrome' : 
        navigator.userAgent.includes('Firefox') ? 'firefox' :
        navigator.userAgent.includes('Safari') ? 'safari' : 'other' // Browser type
    ];
    
    // Create simple hash
    const combined = components.join('|');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return 'dev_' + Math.abs(hash).toString(36).substring(0, 10);
}

// Fungsi untuk log device activity
async function logDeviceActivity(uid, action, deviceId = null) {
    try {
        await db.collection("device_logs").add({
            uid: uid,
            action: action, // 'login', 'logout', 'device_change', 'access_denied'
            deviceId: deviceId || generateSimpleDeviceId(),
            userAgent: navigator.userAgent,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            ip: 'auto-detected'
        });
        return true;
    } catch (error) {
        console.error("Failed to log device activity:", error);
        return false;
    }
}

// Helper untuk mendapatkan IP client
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        return 'unknown';
    }
}

// Export functions ke window object
window.generateSimpleDeviceId = generateSimpleDeviceId;
window.logDeviceActivity = logDeviceActivity;
window.getClientIP = getClientIP;