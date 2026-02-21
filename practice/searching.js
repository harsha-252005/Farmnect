import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, orderByChild,equalTo,query ,get} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

const app= initializeApp(firebaseConfig)
const db =getDatabase(app);

const enumref=ref(db,"enumerator");

var area="karaikudi";
var district="coimbatore";
const query1=query(enumref,orderByChild("district"),equalTo(district))
get(query1).then((snapshot)=>
{
    if(snapshot.exists())
    {
        snapshot.forEach(childsnapshot => {
            const person=childsnapshot.val();
            console.log(person.name);
            console.log(person.phone)
        });
    }
    else{
        console.log("not found")
    }
})