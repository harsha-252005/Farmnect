
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase,ref,get,set} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore,setDoc,doc} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

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
 


document.getElementById('userForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
 
  const name = document.getElementById('name').value;
  const gmail = document.getElementById('gmail').value;
  const password  = document.getElementById('userpassword').value;
  const sul  = document.getElementById('sul').value;
 
  localStorage.setItem("username",name)
  localStorage.setItem("userid",sul)
  const auth = getAuth();
  const db=getFirestore();

  createUserWithEmailAndPassword(auth,gmail,password)
  .then((userCredential)=>
  {
      const user=userCredential.user;
      const userData=
      {
          email:gmail,
          
          name:name,
          password:password,
          sulid:sul,
      };
      window.alert("Account created Successfully");
      const docRef=doc(db,"users",user.uid);
      setDoc(docRef,userData)
      .then(()=>{
      window.location.href="../product/productpage.html"
    }).catch((error)=>
    {
      console.error("error writing document",error)
    })
  })
  .catch((error)=>
  {
      const errorCode=error.code;
      if(errorCode=="auth/email-already-in-use")
      {
          window.alert("Email Address already exists");
      }
      else{
          window.alert("unable to create user");
      }
  })

});

document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id=document.getElementById("licenseID").value
    async function fetchTraders(id) {
        try {
          // Reference to the 'traderdetails' node
          const dbRef = ref(database, "traderdetails");
          
          
          

          // Get the data from the database
          const snapshot = await get(dbRef);

          
          // Check if data exists
          if (snapshot.exists()) {
            const traders = snapshot.val();
            
            
           
            
            
            // Example: Find a specific trader by their ID
            const traderID = id; // Example ID to search for
            const traderKey = Object.keys(traders).find(key => traders[key] === traderID);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password=document.getElementById('password').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const businessName = document.getElementById('businessName').value;
            const trader = document.getElementById('licenseID').value;
            const businessType = document.getElementById('businessType').value;

            if (traderKey) 
                {

               

                if(businessType=="product")
                {

                const traderinforef=ref(database,"traders_personal_info/"+trader)
                set(traderinforef,{
                    person_name:name,
                    person_email:email,
                    person_phone:phone,
                    person_address:address,
                    person_businessName:businessName,
                    person_btype:businessType,
                    person_password:password
                }


                )
                

               
                  localStorage.setItem("username",name)
                  localStorage.setItem("userid",traderID)
                  localStorage.setItem("phone",phone)

                  const auth = getAuth();
                  const db=getFirestore();
                  createUserWithEmailAndPassword(auth,email,password)
                  .then((userCredential)=>
                {
                    const user=userCredential.user;
                    const userData=
                  {
                    email:email,
                    name:name,
                    traderid:trader,
                    password:password,
                    businessType:businessType,
                  };
                    window.alert("Account created Successfully");
                    const docRef=doc(db,"traders",user.uid);
                    setDoc(docRef,userData)
                    .then(()=>{
                    //window.location.href="../product/productpage.html"
                  }).catch((error)=>
                    {
                    console.error("error writing document",error)
                    })
                  })
                  .catch((error)=>
                {
                const errorCode=error.code;
                  if(errorCode=="auth/email-already-in-use")
                {
                      window.alert("Email Address already exists");
                }
              else{
                 window.alert("unable to create user");
              }
              })

          

                 // window.location.href="../product/productpage.html"
                  //window.location.pathname = "product/productpage.html"
                
              }
                else if(businessType=="land"){
                    window.location.pathname = "product/landpage.html"
                }  
            } else {
              alert(`Trader with ID ${traderID} not found.`);
            }
          } 
          else {
            console.log("No data available at this path.");
          }
        } catch (error) {
          console.error("Error fetching traders data:", error);
        }
      }
      
      // Call the function to fetch and log the traders
      fetchTraders(id);
      
});




