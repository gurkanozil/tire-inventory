import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQsCgNUw6qp_RX3D_9LQMJGD-7l-qTDNU",
    authDomain: "gurkanozil-github-io.firebaseapp.com",
    projectId: "gurkanozil-github-io",
    storageBucket: "gurkanozil-github-io.firebasestorage.app",
    messagingSenderId: "736277185733",
    appId: "1:736277185733:web:bb227b6b00e35334611cac",
    measurementId: "G-V05CZ3KNH4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


