
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, push, set, orderByChild, equalTo, query, get,onValue} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

const enumid = localStorage.getItem("enumid")|| "23enum01"
const attendernamedb=ref(database,"enumerator/"+enumid)
const attenderentriesdb=ref(database,"attender_activity/"+enumid);
document.getElementById("enumid").innerHTML=enumid
try {
    onValue(attenderentriesdb, function(snapshot) {
      let productcount=0
      let landcount=0
      if (snapshot.exists()) {
        const entries = Object.entries(snapshot.val());
        entries.forEach((item) => {
          const [key,value]=item
          
          if(key.includes("farmer"))
          {
            productcount+=1
          }
          else if(item.includes("trader"))
          {
            landcount+=1
          }
          
          detailsofproduct(value.farmername,value.farmercontact,value.productid)
        });

        
        insertcount(productcount,landcount)
        console.log(productcount,landcount)
      
      } else {
        console.log("No data available.");
      }
    });
  } catch (error) {
    console.error("Error fetching data: ", error);

  }
  
  function insertcount(productcount,landcount) {
    document.getElementById("productCount").innerHTML=productcount
    document.getElementById("landCount").innerHTML=landcount
  }
  function detailsofproduct(name,contact,prodid) {
    let newelement=document.createElement("li")
    newelement.classList.add("clickable-row");
    newelement.setAttribute("data-id",prodid);
    newelement.textContent=`Name : ${name} | Contact : ${contact}`;
    newelement.addEventListener("click",function()
    {
      window.location.href=`farmerdetails.html?productid=${prodid}`;
    })
    document.getElementById("farmerDetailsList").appendChild(newelement);


  }
  

 