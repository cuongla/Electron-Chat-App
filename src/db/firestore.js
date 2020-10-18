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
};

export const { Timestamp } = firebase.firestore;

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig).firestore();
