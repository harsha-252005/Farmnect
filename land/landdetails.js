
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase,ref,onValue} from " https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

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

const landdb=ref(db,"farmDetails")

const username=localStorage.getItem("username");
const userid=localStorage.getItem("userid")
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        landid: params.get('landid')
    };
}

const params = getQueryParams();
const landid=params.landid
console.log(landid)
var arr = [];

onValue(landdb, function(snapshot) {
    

    let array = Object.entries(snapshot.val());
    
    for (let list of array) {
        arr = adddetails(list);
        
       
        if (arr[1]) 
        {
            document.getElementById("location").innerHTML = arr[5];
            document.getElementById("productName").innerHTML = arr[4];
            
            document.getElementById("quality").innerHTML = arr[6];
            const list= document.getElementById("Products");
            let vrr=arr[1];
            for(let i=0;i<vrr.length;i++)
            {
                
                const li = document.createElement('li');
                li.textContent=vrr[i];
                
                
                list.appendChild(li)
            }
            
           
            document.getElementById("quantity").innerHTML=arr[0];
            const blist=document.getElementById("bharvest")
            let vrr1=arr[2];
            for(let i=0;i<vrr1.length;i++)
            {
                    
                    const li = document.createElement('li');
                    li.textContent=vrr1[i];
                    blist.appendChild(li)
            
                }
            
            console.log(arr[8])
            break; // Exit the loop if the matching farmer is found
            
        }
    }

    // Adding event listener after loop to avoid multiple bindings
    document.getElementById("button").addEventListener("click", function() {
        if (confirm("Are you sure you want to confirm?")) {
            console.log(arr[8]);
            localStorage.setItem("farmername",arr[8])
            localStorage.setItem("phone",arr[7]);
            localStorage.setItem("address",arr[5]);
            localStorage.setItem("username",username)
            window.location.href = 'detailsoflandowner.html';
        }
    });
    
    // If arr[0] exists, it means the farmer was found
    if (arr[0]) {
        console.log(arr[0]);
    } else {
        console.log("lands not found.");
    }
});

function adddetails(list) {
    console.log(list)
    if (list[0] == "-O4y2lGHi0gMQVmw3K8G") {
        
        console.log(landid)
        let acres = list[1]["acres"];
        
        let availableProducts = list[1]["availableProducts"];
        let bestHarvest = list[1]["bestHarvest"];
        let id = list[1]["id"];
        let landname=list[1]["landName"];
        let location=list[1]["location"];
        let soilQuality = list[1]["soilQuality"];
        let phone=list[1]["phone"];
        let farmername=list[1]["farmername"];
        
        return [acres, availableProducts,bestHarvest,id,landname, location,soilQuality,phone,farmername];
    }
    return null;
}


       
        



// Example data that could be dynamically fetched or stored
   
   
   

    //user information
    
    
    document.getElementById("userName").innerHTML=username;
    document.getElementById("userId").innerHTML=userid;
    
    localStorage.setItem("fname",arr[0]);
    localStorage.setItem("trader",username);

    
    
