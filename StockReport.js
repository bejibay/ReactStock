
import {useState,useEffect} from 'react';
import axios from "axios";


  export default function StockTaking(){
   const [tableData, setTableData] = useState([]);

    return (
       <form>
        <select name = "report" >
          <option value ="">Select A Report Type</option>
          <option value ="">Daily Stock Usage</option>
          <option value ="">NHIS</option>
          <option value ="">Capitation</option>
          <option value ="">Global Claims</option>
          <option value ="">Retainership</option>
          <option value ="">Private</option>
          <option value ="">Staff</option>
          <option value ="">Directors</option>
         </select>
         <label>Start Date:</label><input type ="date" name ="startdate" placeholder= "Select Start Date"></input>
        <label>End Date:</label><input type ="date" name ="enddate" placeholder= "Select  Cut of Date"></input>
        <button type ="button" >Click</button>
      <h2>Stock Report Details</h2>
      <table>
      <thead>
    <tr><th>Serial No</th><th>Date</th><th>Item Name</th><th>Description</th><th>Quantity</th><th>Destination</th></tr> 
   </thead>
   <tbody>
       {tableData.map((el)=>(
    <tr key ={el.id}> 
    <td>{el.id}</td> 
    <td>{el.Date}</td>
    <td>{el.ItemName}</td>
    <td>{el.Description}</td>
    <td>{el.Quantity}</td>
    <td>{el.Destination}</td>
    <td><button type ="button" >Edit</button>
    <button type ="button" >Delete</button></td>
    </tr>
   ))}
    </tbody>
   </table>
    </form>
      );
     }