import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQsCgNUw6qp_RX3D_9LQMJGD-7l-qTDNU",
    authDomain: "gurkanozil-github-io.firebaseapp.com",
    projectId: "gurkanozil-github-io",
    storageBucket: "gurkanozil-github-io.appspot.com",
    messagingSenderId: "736277185733",
    appId: "YOUR_APP_ID" // Replace with your actual app ID. You can find your app ID in the Firebase console under Project Settings > General > Your apps. It is listed as "App ID" for each registered app.
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };


