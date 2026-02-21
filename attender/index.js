



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, query, get } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBCGgNNjXXkWM7Pu8Bb-56wVrc9mJi5k1A",
    authDomain: "playground-f845c.firebaseapp.com",
    databaseURL: "https://playground-f845c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "playground-f845c",
    storageBucket: "playground-f845c.appspot.com",
    messagingSenderId: "886005862307",
    appId: "1:886005862307:web:36482c06b5b3b6e8a9d416"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.getElementById('dataForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Collecting form data
    const productId = document.getElementById('productId').value;
    const farmerId = document.getElementById('farmerId').value;
    const farmerName = document.getElementById('farmerName').value;
    const farmerContact = document.getElementById('farmerContact').value;
    const farmerDistrict = document.getElementById('farmerDistrict').value;
    const farmerTown = document.getElementById('farmerTown').value;
    const farmerState = document.getElementById('farmerState').value;
    const productType = document.getElementById('productType').value;
    const productStatus = document.getElementById('productStatus').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const Price = document.getElementById('Price').value;
    const marketPrice = document.getElementById('marketPrice').value;
    const productQuality = document.getElementById('productQuality').value;
    const productDescription = document.getElementById('productDescription').value;
    const entryDate = document.getElementById('entryDate').value;

    // Check if the product ID already exists
    const checkRef = ref(database, "productdetails");
    const query1 = query(checkRef, orderByChild("12"), equalTo(productId));

    try {
        const snapshot = await get(query1);
        
        if (snapshot.exists()) {
            alert("Product ID already exists. Please enter a unique ID.");
            // Clear the input field or show an error message
            document.getElementById('productId').value = ""; // Clear the input field
            return; // Exit the function if the product ID exists
        }

        // Proceed to add new product details as the ID is unique
        console.log("Entering details...");
        const newProductRef = push(ref(database, 'productdetails'));
        await set(newProductRef, {
            0: farmerId,
            1: productType,
            2: productQuality,
            3: Price,
            4: marketPrice,
            5: "kg",  // Assuming this is always kg, modify if needed
            6: productQuantity,
            7: entryDate,
            8: productStatus,
            9: farmerTown,
            10: farmerDistrict,
            11: farmerState,
            12: productId
        });

        // Save farmer details
        const newProductRef1 = push(ref(database, 'farmerdetails/' + farmerId));
        await set(newProductRef1, {
            0: farmerName,
            1: `${farmerTown},${farmerDistrict},${farmerState}`,
            2: farmerContact,
            3: productType,
            4: productQuantity,
            5: Price,
            6: productDescription,
            7: productId
        });

        // Add farmer information to attender_activity database
        const enumid = localStorage.getItem("enumid");
        const attenderRef = ref(database, 'attender_activity/' + enumid + "/" + farmerId);
        await set(attenderRef, {
            productid:productId,
            farmername: farmerName,
            farmercontact: farmerContact
        });

        console.log("Data saved successfully!");
        
    } catch (error) {
        console.error("Error saving data:", error);
    }
    window.location.href="dashboard.html"
});