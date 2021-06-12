import axios from "axios";
import React, { useState, useEffect } from "react";

function TestSpotify(props){
    
    const [customers, setCustomers] = useState([]);
    async function getCustomers() {
        // const customersRes = await axios.get("http://localhost:5000/customer/");
        const customersRes = await axios.get(
          "http://localhost:4000/playlist/token/",
          );
        setCustomers(customersRes.data);
      }
      useEffect(() => {
        getCustomers();
      }, []);

return(
    <>
    {console.log(customers)}
   </>
)
      
}

export default TestSpotify;