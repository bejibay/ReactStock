
import {useState,useEffect} from 'react';

import axios from "axios";


  export default function StockTaking(){
   const [tableData, setTableData] = useState([]);
   const [data, setData] = useState({location:0,end:""});
   const [store, setStore] = useState([]);
  
   const  handlechange =(event)=>{
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
}



useEffect(() => {axios.get("http://localhost/bills_online/commons/stock_management_endpoint/index.php/taking/list?location=1021&trans_id=120220000039131"
    ).then((Response) => {var data = Response.data;for (var x in data) {
        if (x === "locations") {setStore(data[x]);
        }
      }
    });
}, []);


useEffect(() => {axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/taking/list?location=${data.location}&end=${data.end}`
    ).then((Response) => {var data = Response.data;for (var x in data) {
        if (x === "stockbalance") {setTableData(data[x]);
        }
      }
    });
}, [data.location,data.end]);
console.log(data);
console.log(tableData);

   

    return (
       <form>
        <select name = "location"  onChange ={handlechange} required>
          
          <option value ="">Select A Location</option>
          {store.map((dr)=>(
          <option key={dr.id} value= {dr.id}>{dr.location_name}</option>
          ) )}

        </select>
       <label>Select a cut of date:</label>
        <input type ="date" name ="end"  onChange= {handlechange}/>
        <h2>Stock Taking Details</h2>
      <table>
      <thead>
    <tr><th>Serial No</th><th>Date</th><th>Item Name</th><th>Item Code</th><th>Stock Balance</th><th>Destination</th></tr> 
   </thead>
   <tbody>
       {data.location !== 0 && data.end!=="" && tableData && tableData.map((el,index)=>(
    <tr key ={index}> 
    <td>{index+1}</td> 
    <td>{el.tdate}</td>
    <td>{el.naming}</td>
    <td>{el.item}</td>
    <td>{el.balance}</td>
    <td>{el.location}</td>
    </tr>
   ))}
    </tbody>
   </table>
   </form>
      );
     }