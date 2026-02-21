
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase,ref,onValue,set,push,update} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

const db=getDatabase(app);

localStorage.getItem("farmerid",farmerid)

const actiondb=ref(db,"actions/"+farmerid);
document.getElementById("vehicleDetailsForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Retrieve form data
    const vehicleNumber = document.getElementById("vehicleNumber").value;
    const driverName = document.getElementById("driverName").value;
    const days = document.getElementById("day").value;
    const today = document.getElementById("today").value;

    // Simple validation (can be expanded as needed)
    if (!vehicleNumber || !driverName || !day || !today) {
        alert("Please fill all fields.");
        return;
    }

    const actiondb=ref(db,"actions/"+farmerid);
                const pnum = localStorage.getItem("phone")
                const traders = [
                    {  vehiclenumber:vehicleNumber,
                        drivername:driverName,
                        days:days
                    }
                    
                    
                  ];
                  let key;
    
                 traders.forEach((trader) => {
                  key = push(actiondb, trader).key;
                    console.log(key);
                });
    

    
    document.getElementById("vehicleDetailsForm").reset();
    alert("Vehicle details submitted successfully!");
});