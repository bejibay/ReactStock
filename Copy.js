
import {Link, Outlet } from 'react-router-dom';
import './App.css';

   export default function Home ({data}){
    return (
      <>
     <div>        
{data.map((datum)=>(
  <div key ={datum.url}>
  <Link  to={datum.url}>{datum.linktext}</Link>
  </div>
))}
  </div>
<Outlet/>
</>
    );
}

<form>
        <h2>Transaction Details</h2>
        <table>
        <thead>
        <tr><th>SN</th><th>Event ID</th><th>Narration</th><th>Seller</th><th>Item Name</th><th>Qty</th>
        <th>Act Qty</th><th>Amt</th><th>Date</th><th>Location</th></tr></thead>
        <tbody>
        {listing.map((el)=>(
        <tr key ={el.id}>
          <td>{el.id}</td>
          <td>{el.eventid}</td>
          <td>{el.narration}</td>
          <td>{el.seller}</td>
          <td>{el.item}</td>
          <td>{el.quantity}</td>
          <td>{el.actual_quantity}</td>
          <td>{el.amount}</td>
          <td>{el.date}</td>
         <td>{el.location}</td>
          <td><button type ="button">Edit</button>
        <button type ="button" >Delete</button></td>
          </tr>
           ))}
           <tr><td><button type ="submit" name ="submit">Click to approve</button></td></tr>
           </tbody>
         </table>
           </form>
           <option value ="120220000011111">Select A Transaction ID</option>
       