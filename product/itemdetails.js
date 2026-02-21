
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

const farmerdb=ref(db,"farmerdetails")

const productListdb=ref(db,"productdetails");
onValue(productListdb,function(snapshot){
    if(snapshot.exists())
      {
        let productsarrays = Object.entries(snapshot.val())
        console.log(productsarrays[0][1][4])
        //productListItem.innerHTML=""
      }});

const username=localStorage.getItem("username");
const userid=localStorage.getItem("userid")
    
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        productid: params.get('productid')
    };
}

const params = getQueryParams();
const farmerid=params.productid
var arr = [];

onValue(farmerdb, function(snapshot) {
    let farmersarray = Object.entries(snapshot.val());
    
    for (let list of farmersarray) {
        arr = adddetails(list);

        if (arr) {
            document.getElementById("location").innerHTML = arr[1];
            console.log(arr[0])
            document.getElementById("productName").innerHTML = arr[3];
            document.getElementById("quantity").innerHTML = arr[4];
            document.getElementById("quality").innerHTML = arr[5];
            
            break; // Exit the loop if the matching farmer is found
        }
    }

    // Adding event listener after loop to avoid multiple bindings
    document.getElementById("button").addEventListener("click", function() {
        if(userid.includes("trader"))
        {
            if (confirm("Are you sure you want to confirm?")) {
                localStorage.setItem("farmername",arr[0])
                localStorage.setItem("farmerid",farmerid)
                localStorage.setItem("phone",arr[2]);
                localStorage.setItem("address",arr[1]);
                localStorage.setItem("username",username)
                console.log(arr[0])
                const actiondb=ref(db,"actions/"+farmerid);
                const pnum = localStorage.getItem("phone")
                const traders = [
                    { traderid:userid, action:"watched profile" },
                    
                    
                  ];
                  let key;
    
                 traders.forEach((trader) => {
                  key = push(actiondb, trader).key;
                    
                });
    
                  localStorage.setItem("key",key);
                  //const actiondb1=ref(db,`actions/${farmerid}/${key}`);
                  //const updatedData = {
                  //  status: "active" 
                  //};
                  
                 
                 
                  //update(actiondb1, updatedData)
               
                
    
                
               window.location.href = 'detailsoffarmer.html';
                
                
            }
        }
        else
        {
            window.alert("farmers cannot buy items")
        }
        
    });

    // If arr[0] exists, it means the farmer was found
    if (arr[0]) {
        console.log(arr[0]);
    } else {
        console.log("Farmer not found.");
    }
});
console.log(arr[0])
function adddetails(list) {
    if (list[0] == farmerid) {
        let name = list[1][0];
        let address = list[1][1];
        let phone = list[1][2];
        let product = list[1][3];
        let quantity = list[1][4];
        let quality = list[1][5];
        return [name, address, phone, product, quantity, quality];
    }
    return null;
}


       
        



// Example data that could be dynamically fetched or stored
   
   
   

    //user information
    
    document.getElementById("userName").innerHTML=username;
    document.getElementById("userId").innerHTML=userid;
    
    localStorage.setItem("fname",arr[0]);
    localStorage.setItem("trader",username);

    
    
