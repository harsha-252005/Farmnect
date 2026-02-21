import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getDatabase,ref,get,set} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js"; // Import Firestore


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
const db = getFirestore(app); 



document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const registerLabel = document.querySelector('label[for="flip"]');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const sulid = document.getElementById('sul').value;
            const auth = getAuth();
             if(sulid.includes("enum"))
                { 
                    attender(sulid)
                }
                else{
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const uid = user.uid;

                    // Fetch user data from Firestore using uid
                    getUserData(uid,sulid);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    if (errorCode === "auth/wrong-password" || errorCode === "auth/user-not-found") {
                        window.alert("Incorrect email or password");
                    } else {
                        document.getElementById('email').value = "";
                        document.getElementById('password').value = "";
                        window.alert("Account does not exist");
                    }
                });}  
        });
    }

    if (registerLabel) {
        registerLabel.addEventListener("click", function (event) {
            window.location.href = "login.html";
        });
    }
});
async function getUserData(uid,sulid) {
    try {
        // Reference to the user's document in the "users" collection
            let sui;
            if(sulid.includes("farmer"))
                {

                   sui="users" ;

                }
                else if(sulid.includes("trader"))
                {
                    sui="traders";
                }
                
                else{
                    window.alert("enter your state unified id correctly")
                    return;
                }
                const docRef = doc(db, sui, uid);
        

        // Fetch the document data
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Document data retrieved successfully
            console.log("User Data:", docSnap.data());

            // Redirect to the product page
            let name=docSnap.data().name;  
            console.log(name)
            localStorage.setItem("username", name); // Example: storing username in localStorage
            localStorage.setItem("userid",sulid)
            window.location.href = "../product/productpage.html";
        } else {
            // Document not found
            window.alert("No such document found!");
        }
    } catch (error) {
        console.error("Error retrieving user data:", error);
    }
}
async function attender(sulid)
{
    const database = getDatabase(app);
    const dbRef = ref(database, "enumerator");
    const snapshot = await get(dbRef);
    
    if (snapshot.exists()) {
        const enumerator = snapshot.val();
        
        
        const enumeratorkey = Object.keys(enumerator).find(key => key === sulid);       
        if(enumeratorkey)
        {
            console.log("enum")
            localStorage.setItem("enumid",enumeratorkey);
            window.location.href="../attender/dashboard.html";
        }
        else{
            window.alert("no id found")
        }
    }
    


    

}
