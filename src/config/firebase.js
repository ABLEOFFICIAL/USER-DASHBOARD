// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import customers from "../customers.json";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFaEOPxtFnvaHOIimQ83VEJzGI41H_Xss",
  authDomain: "user-d-45be1.firebaseapp.com",
  projectId: "user-d-45be1",
  storageBucket: "user-d-45be1.firebasestorage.app",
  messagingSenderId: "69989279001",
  appId: "1:69989279001:web:7ce3cded38ee9bd6591188",
  measurementId: "G-MFCGVRT12J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

// upload json file to firebase
async function uploadData() {
  const customerCollection = collection(db, "customers");
  for (const customer of customers) {
    await addDoc(customerCollection, customer);
  }
}
uploadData();
