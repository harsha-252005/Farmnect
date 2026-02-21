// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCGgNNjXXkWM7Pu8Bb-56wVrc9mJi5k1A",
    authDomain: "playground-f845c.firebaseapp.com",
    databaseURL: "https://playground-f845c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "playground-f845c",
    storageBucket: "playground-f845c.appspot.com",
    messagingSenderId: "886005862307",
    appId: "1:886005862307:web:36482c06b5b3b6e8a9d416"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to a specific location in the database
const shoppingListdb = ref(db, "foods");

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Reference to the specific product in your database
const farmerRef = ref(db, 'farmerdetails/' + productId);

// Fetch the 'name' from the database
onValue(farmerRef, (snapshot) => {
    if (snapshot.exists()) {
        const name = snapshot.val().name;
        document.getElementById('farmer-name').innerText = `Farmer Name: ${name}`;
    } else {
        console.log("No data available");
    }
}, (error) => {
    console.error(error);
});
