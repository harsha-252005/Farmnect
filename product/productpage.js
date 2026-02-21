

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

const productListItem=document.getElementById("productlist");

const productListdb=ref(db,"productdetails");
onValue(productListdb,function(snapshot){
    if(snapshot.exists())
      {
        let productsarrays = Object.entries(snapshot.val())
        //productListItem.innerHTML="";
     var i=0;  
     productListItem.innerHTML=""; 
    for(let lists of productsarrays)
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
    newelement.dataset.href = "itemdetails.html";
    newelement.setAttribute("data-id",item[0])
    
    newelement.insertCell().textContent=`${i}`
    for(let i=0;i<12;i++)
    {
    newelement.insertCell().textContent=`${item[i]}`
    }
    
    j+=1;
    newelement.addEventListener("click", function() {
      const farmerid=item[0];
      localStorage.setItem("username",username);
     
      localStorage.setItem("userid",userid);
      window.location.href = `itemdetails.html?productid=${farmerid}`;
      });
    
    productListItem.appendChild(newelement);     
    
    }

    
  