

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

const landListItem=document.getElementById("landlist");

const landListdb=ref(db,"landdetails");
onValue(landListdb,function(snapshot){
    if(snapshot.exists())
      {
        let landsarrays = Object.entries(snapshot.val())
        
        
     var i=0;  
     //landtListItem.innerHTML=""; 
    for(let lists of landsarrays)
    {
      
       
        addlistelement(lists[1],i);
        
       
       i+=1
    
    }
  
    }
    else{
        console.log("false")
      //ListItem.innerHTML="no list item are  there";
  
    }
    
    
  })

  //user ID and name setting
  const username=localStorage.getItem('username');
  const userid=localStorage.getItem("userid")
  
  document.getElementById("userName").innerHTML=username;
  document.getElementById("userId").innerHTML=userid;
  
  
  let j=0;
  function addlistelement(item,i)
  {
   

    let newelement=document.createElement("tr");
    newelement.classList.add("clickable-row");
    newelement.dataset.href = "landdetails.html";
    newelement.setAttribute("data-id",item[0])
    
    newelement.insertCell().textContent=`${i}`
    for(let i=0;i<10;i++)
    {
      if(i==2)
      {
        newelement.insertCell().textContent=`₹ ${item[i]}/month`
      }
      else if(i==3){
    newelement.insertCell().textContent=`${item[i]} year`
      }
      else{
        newelement.insertCell().textContent=`${item[i]}`
      
      }
    }
    
    j+=1;
    newelement.addEventListener("click", function() {
      console.log("Row clicked");
      const landid=item[0];
      console.log("Product ID:", landid)
      localStorage.setItem("username",username);
      localStorage.setItem("userid",userid);
      window.location.href = `landdetails.html?landid=${landid}`;
      });
    
    landListItem.appendChild(newelement);     
    
    }

    
  