import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
    databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
    projectId: `${process.env.FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.FIREBASE_APP_ID}`,
    measurementId: `${process.env.FIREBASE_MEASURMENT_ID}`
    // apiKey: "AIzaSyAiClDJ2bjVE0dP7jnxzRTuohMn9PCOWTk",
    // authDomain: "electron-app-614f0.firebaseapp.com",
    // databaseURL: "https://electron-app-614f0.firebaseio.com",
    // projectId: "electron-app-614f0",
    // storageBucket: "electron-app-614f0.appspot.com",
    // messagingSenderId: "763674832968",
    // appId: "1:763674832968:web:9dc792c31fd1ff67d2687d",
    // measurementId: "G-BWP00D8VN2"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig).firestore();
