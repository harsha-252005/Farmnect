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

const key=localStorage.getItem("key");
const farmerid=localStorage.getItem("farmerid");
const formattedDate=localStorage.getItem("agreementdate");
const actiondb1=ref(db,`actions/${farmerid}/${key}`);
              const updatedData = {
              agreement_status: "generated",
              agrement_date: formattedDate
              };
               
             
             console.log(updatedData)
              update(actiondb1, updatedData)
              window.location.href="agreement.html"