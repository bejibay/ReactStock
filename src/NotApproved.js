import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function NotApproved(){
  const [currentFormData, setCurrentFormData] = useState({id:"", event_id:"", narration:"", created:"",  item:"", 
  quantity:"", actual_quantity:"",package_id:"", unit_cost:"", batch:1234, location:""});
  const [listing,setListing] = useState([]);
  const [store, setStore] = useState([]);
  const [transid, setTransid] = useState(currentFormData.eventid);
    const [show, setShow]   = useState(false);
    const [note, setNote]   = useState("");
    const [edit, setEdit] = useState(false);

    const handleedit =(rowData)=> {
      setEdit(true);
      setCurrentFormData({id:rowData.id,event_id:rowData.event_id, created:rowData.created,narration:rowData.narration,item:rowData.item,  
        quantity:rowData.quantity, actual_quantity:rowData.actual_quantity,package_id:rowData.package_id,unit_cost:rowData.unit_cost,
        batch:rowData.batch,location:rowData.location});
  
     }
  
     const handledelete = (id)=>{
      if(window.confirm("Are you sure you want to delete this row") === true)
        {setListing(listing.filter((el)=>el.id!==id));
      }
      }
  
      const updatedata = (id, updatedFormData) => {
        setEdit(false)
      setListing(listing.map((listing) => (listing.id === id ? updatedFormData : listing)));
      }

  useEffect(()=>{axios.get('http://localhost/bills_online/commons/stock_management_endpoint/index.php/notapproved/list?user_id=30000')
  .then(Response=>{
  var data = Response.data;
   for(var x in data){if(x==="rejectedEventList"){setStore(data[x])}}
    });});
    
    return(
    
      <>
       
        {edit?
        <div>
       <EditForm currentFormData = {currentFormData}  updatedata={updatedata} /></div>: null}

      <div><Notemodal show ={show} setShow ={setShow} note ={note} />
       <Displaychange store = {store}  setShow ={setShow} setTransid ={setTransid} setNote ={setNote} 
       listing ={listing} setListing ={setListing} handleedit = {handleedit} handledelete = {handledelete}
       transid= {transid}/>
     </div>
      </>
 );

}

function Notemodal(props){
  const{note, show, setShow} = props;
if(!show){return null;}
return (
         <div className ="modal">
         <form >
          <h2>Reasons For Reject</h2>
          <textarea className ="modalarea" value ={note} readOnly></textarea>
          <button type ="button" onClick ={()=>setShow(false)}>close</button>
         </form>
         </div>
);

}

 function Displaychange(props){
const{transid,setTransid,setNote,listing,setListing,store,setShow,handleedit} = props;
  
const handlechange =(event)=>{
    event.preventDefault();
setTransid(event.target.value);
  
}

  useEffect(()=>{setNote(store.map((sl)=>(sl.event_id === transid ?sl.event_note: "")));},[store,transid,setNote]);

 
 
  useEffect(()=>{axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/notapproved/list?location=1021&trans_id=${transid}`)
  .then(Response=>{
  const data = Response.data;
   for(var x in data){if(x==="aTransEventList" && data[x] !== false){setListing(data[x])}}
    });},[transid,setListing]);

   

const emptylisting = ()=>{
  
  const data = JSON.stringify(listing);
  axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/notapproved/modify?data=${data}&location=1021&trans_id=${transid}`)
  .then((Response)=>{console.log(Response.data);});
  console.log(transid);
  console.log(listing);
  setListing(listing=>([...listing]=[]));
  
  }



  return (
    <>
    <div>
     <form >
      <h2>Select A Transaction ID From The DropDown</h2>
      <select  value ={transid} onChange = {handlechange}>
      <option value ="">Select A Transaction ID</option>
       {store && store.map((st)=>(<option key={st.event_id} value={st.event_id} >{st.event_id}</option>
      ))}
      </select>
      
      <button  type ="button" onClick ={()=>setShow(true)}>Open the note</button>
      </form>
      </div>
      <div> 
       {transid !== "" &&
      (<form>
        <h2>Transaction Details</h2>
        <table>
        <thead>
        <tr><th>SN</th><th>Event ID</th><th>Date Created</th><th>Narration</th><th>Item</th><th>Qty</th>
        <th>Act Qty</th><th>Package Id</th><th>Unit Cost</th><th>Location</th></tr></thead>
        <tbody>
        {listing.map((el)=>(
        <tr key ={el.id}>
          <td>{el.id}</td>
          <td>{el.event_id}</td>
          <td>{el.created}</td>
          <td>{el.narration}</td>
          <td>{el.item}</td>
          <td>{el.quantity}</td>
          <td>{el.actual_quantity}</td>
          <td>{el.package_id}</td>
          <td>{el.unit_cost}</td>
         <td>{el.location}</td>
         <td><button type ="button" onClick={()=>handleedit(el)}>Edit</button></td>
         </tr>
           ))}
           <tr><td><button type ="button" onClick ={emptylisting}>Submit for approval</button></td></tr>
         </tbody>
         </table>
           </form>
           )}
           {transid === "" && null}
           </div>
         </>
  );
        }

        export function EditForm(props){
          const{currentFormData,updatedata,setEdit} = props;
          const [formData, setFormData] = useState(currentFormData);
          const [store, setStore] = useState([]);
          const [drug, setDrug] = useState([]);
            
            
            useEffect(()=>{axios.get('http://localhost/bills_online/commons/stock_management_endpoint/index.php/notapproved/list?location=1021&trans_id=120220000039131')
          .then(Response=>{
          var data = Response.data;
           for(var x in data){if(x==="locations"){setStore(data[x])}}
            });}
           ,[]);
           
        
           useEffect(()=>{axios.get('http://localhost/bills_online/commons/stock_management_endpoint/index.php/notapproved/list?location=1021&trans_id=120220000039131')
          .then(Response=>{
          var data = Response.data;
           for(var y in data){if(y==="procedureItems"){setDrug(data[y])}}
            });}
           ,[]);
        
           const handleinputchange = (event)=> {
           const name = event.target.name;
              const value = event.target.value;
              setFormData(values=>({...values, [name]: value}));
             }
        
              const  submitupdate = (event)=>{
                event.preventDefault();
              updatedata(formData.id,formData);
                
              }
        
              useEffect(() => {
                setFormData(currentFormData)
              },[currentFormData]);
          
              return (
             <div>
            <form onSubmit = {submitupdate}>
              <p>Edit Form</p>
              <label>Event ID:</label>
            <input type ='text' name='event_id' id='event_id' onChange ={handleinputchange} value= {formData.event_id} required/>
            <label >Date:</label>
           <input type ='date' name='created' id ='created' onChange ={handleinputchange}   value = {formData.created} required/>
           <label>Narration:</label>
           <input type ='text' name='narration' id='narration' onChange ={handleinputchange}   value = {formData.narration} required/>
           <label >Item Name:</label>
           <select name ='item' id='item' onChange ={handleinputchange} value = {formData.item} required>
           {drug.map((dr)=>(
          <option key ={dr.id} value ={dr.id}>{dr.naming}</option>
           )
             )
            }
           </select>
           
           <label>quantity:</label>
            <input type ='number' name='quantity' id='quantity' onChange ={handleinputchange}   value= {formData.quantity} required/>
            <label>Actual Quantity:</label>
            <input type ='number' name='actual_quantity' id='actual_quantity' onChange ={handleinputchange}   value= {formData.actual_quantity} required/>
            <label>Package Id:</label>
            <input type ='number' name='package_id' id='package_id' onChange ={handleinputchange}   value= {formData.package_id} required/>
             <label>Unit Cost:</label>
            <input name ='unit_cost' id='unit_cost' onChange ={handleinputchange} value = {formData.unit_cost} required/>
            <label>location:</label>
            <select name ='location' id='location' onChange ={handleinputchange} value = {formData.location} required>
            {store.map((st)=>(
          <option key ={st.id} value ={st.id}>{st.location_name}</option>
        
            )
             )
           }
            </select>
           <input type ="submit" name="submit" value ="Update"/>
             <input type ="reset" name="reset" value ="Cancel" onClick ={()=>setEdit(false)}/>
           </form>
           </div>
             );
             }
        
            
              
                
             