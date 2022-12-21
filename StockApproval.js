import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function StockApproval(){
    const [store, setStore] = useState([]);
    const [show, setShow]   = useState(false);
    const [data, setData]   =useState({reject:"1",event_note:""});
    const data2 = JSON.stringify([data]);

    
    useEffect(()=>{axios.get('http://localhost/bills_online/commons/stock_management_endpoint/index.php/approval/list?location=1021&trans_id=120220000039396')
  .then(Response=>{
  var data = Response.data;
   for(var x in data){if(x==="toBeApprovedEventList"){setStore(data[x])}}
    });});
    
    return(
      <>
      <Notemodal show ={show} setShow ={setShow} data= {data} setData = {setData}/>
      <Displaychange store = {store}  setShow ={setShow} data2 ={data2}/>
      </>
 );

}

function Notemodal(props){

  const handlechange =(event)=>{
   event.preventDefault();
   props.setData(data=>({...data, event_note:event.target.value}));
  }

if(!props.show){return null;}
return (
         <div className ="modal">
         <form >
          <h2>Reasons For Reject</h2>
          <textarea className ="modalarea" value ={props.data.event_note} onChange= {handlechange}></textarea>
          <button type ="button" onClick ={()=>props.setShow(false)}>Save</button>
         </form>
         </div>
);

}

 function Displaychange(props){
  const [eventid, setEventid] = useState("");
  const [listing,setListing] = useState([]);

  const handlechange =(event)=>{
    event.preventDefault();
    setEventid(event.target.value);
    console.log(eventid);
 }
  useEffect(()=>{axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/approval/list?location=1021&trans_id=${eventid}`)
  .then(Response=>{
  const data = Response.data;
   for(var x in data){if(x==="aTransEventList" && data[x] !== false){setListing(data[x])}}
    });},[eventid]);

   const handleapproval=(event)=>{
    event.preventDefault();
    const data = JSON.stringify([{complete:1,approved:1,reject:0}]);
    console.log(data);
    axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/approval/updateevt?data=${data}&eventid=${eventid}`)
  .then(Response=>{console.log(Response.data)});
  
  }

const handlereject=(event)=>{
  event.preventDefault();
  if (window.confirm("Click ok if you have added a note with reasons for your reject otherwise click cancel") === true) {
    console.log(eventid);
    
    axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/approval/updaterejectedevt?data=${props.data2}&eventid=${eventid}`)
  .then(Response=>{console.log(Response.data)});
  
  
  }  

}

  return (
    <>
    <div>
     <form >
      <h2>Select A Transaction ID From The DropDown</h2>
      <select name = 'eventid' value ={eventid} onChange = {handlechange}>
      <option value ="">Select A Transaction ID</option>
        {props.store && props.store.map((st)=>(<option key={st.event_id} value={st.event_id} >{st.event_id}</option>))}
      </select>
      <button  type ="button" onClick ={()=>props.setShow(true)}>Add or open a note</button>
      </form>
      </div>
      <div> 
       {eventid !== "" &&
      (<form>
        <h2>Transaction Details</h2>
        <table>
        <thead>
        <tr><th>SN</th><th>Event ID</th><th>Date</th><th>Narration</th><th>Item</th><th>Qty</th>
        <th>Act Qty</th><th>Unit Cost</th><th>Location</th></tr></thead>
        <tbody>
        {listing.map((el)=>(
        <tr key ={el.id}>
          <td>{el.id}</td>
          <td>{el.event_id}</td>
          <td>{el.created}</td>
          <td>{el.narration}</td>
          <td>{el.naming}</td>
          <td>{el.quantity}</td>
          <td>{el.actual_quantity}</td>
          <td>{el.unit_cost}</td>
         <td>{el.location}</td>
           </tr>
           ))}
           <tr><td><button type ="button" onClick ={handleapproval}>Click to approve</button>
           <button type ="button" onClick ={handlereject}>Click to reject</button></td></tr>
           </tbody>
         </table>
           </form>
           )}
           {eventid === "" && null}
           </div>
         </>
  );
        }