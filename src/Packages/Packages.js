
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function Package(props){
  const [packagetype, setPackagetype] = useState("");
   const item = props.item;
   const setCreatep = props.setCreatep;
   const [packagelist, setPackagelist] = useState([]);
   const setQuantitycount = props.setQuantitycount;
  


  useEffect(()=>{axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/packages/list?item=${item}`)
  .then(Response=>{var res = Response.data;
   for(var z in res){if(z==="data"){setPackagelist(res[z])}}});},[item]);


   const handlepackage =(event)=>{
   setPackagetype(event.target.value)

  }

 
  if(!props.createp) {return null;}

  return(
    <>
  <div className= "modal">
    <div className ="modal-content">
      <div className ="modal-header">Package Details</div>
      <div className = "modal-body">
      <form>
        <select name = "packagetype" onChange ={handlepackage} value={packagetype}>
        <option value ="">Select An Option</option>
          <option value ="Existing">Select Existing Packages</option>
          <option value ="Creating">Create New Packages</option>
        </select>
  <button type ="button" onClick = {()=>{props.setCreatep(false);}}>Close Modal Box</button>
     {!item && packagetype === "" && <Nopackage/>} 
     {item && packagetype === "Existing" && <Existing item ={item} setCreatep = {setCreatep} 
     packagelist = {packagelist} setQuantitycount = {setQuantitycount}/>} 
     {item && packagetype ==="Creating" && <Creating item ={item} setCreatep = {setCreatep} />} 
     
     
      </form>  
      </div>
      <div className ="modal-footer"></div>
   </div>
    </div>
    
   </>
    );
    }
      

    function Nopackage (){
          
      return(
        <div>
      <h2>No Item Selected</h2>
      <h2>Close the box and select an item</h2>
        </div>
        );
          }
        
      
        function Existing (props){
         const[exist, setExist] = useState({title:"",description:"",child_factor:""});
         const setQuantitycount = props.setQuantitycount;
         const setCreatep =props.setCreatep;
         const loadform =id=>{
          props.packagelist.map((pp,index)=>{if(id === index) 
           setExist(values=>({...values, title:pp.title,description:pp.description,child_factor:pp.child_factor})); 
            }
            )
         }  

         const handlechange =(event)=>{
         event.preventDefault();
         setQuantitycount(event.target.value);
         }

         const clearsave =()=>{
        setCreatep(false);
         }

         return(
              <>
            <form> 
          <h2>Existing packages for {props.item} </h2>
          <table>
            <thead>
          <tr><th>SN</th><th>Title</th><th>Description</th><th>Qty in Package</th></tr>
           </thead>
          <tbody>
        {props.packagelist && props.packagelist.map((pk,index)=>(
        <tr key ={index}>
        <td>{index+1}</td>
        <td>{pk.title}</td>
        <td>{pk.description}</td>
        <td>{pk.child_factor}</td>
        <td><button type ="button" onClick ={()=>loadform(index)}>+</button></td>
        </tr>
        ))}
         </tbody>
        </table>
        <table>
          <thead>
            <tr><th>Title</th><th>Description</th><th>Qty/Package</th><th>Quantity</th></tr>
          </thead>
          <tbody>
            <tr><td><input name ="title" size ="5" value = {exist.title} readOnly/></td>
            <td><input name = "description" size="10" value ={exist.description} readOnly/></td>
            <td><input name ="child_factor" size ="5" value ={exist.child_factor} readOnly/></td>
            <td><input name ="quantity" size ="5" onChange ={handlechange}/></td>
            <td><button type ="button" onClick ={()=>{clearsave();}}>save</button></td>
            </tr>
            </tbody>
         </table>
        </form>
        </>
      );
           }
        
            
            function Creating(props){
          
          const [title, setTitle] = useState("");
          const [packform, setPackform] = useState({title:'Tab', description:'Tablets of Actifed',child_factor:"",dispense_tag_yn:1, bulk_tag_yn:0});
          const [data, setData]  = useState([]);
          const item = props.item;
          const setCreatep = props.setCreatep;

          const handlechange =(event)=>{
            const name =event.target.name;
            const value = event.target.value;
           setPackform(values=>({...values, [name]:value}));
          }

           const handle2change =(event)=>{
            setTitle(event.target.value);
           }

           const savecontent =()=>{
            setData(values=>([...values, packform]));
            setPackform(values=>({...values, title:'Tabs', description:'Tablets of Actifed',child_factor:""
            ,dispense_tag_yn:1, bulk_tag_yn:0}));
          
           }

           const handlesubmit =()=>{
        
            const newdata = JSON.stringify(data);
          axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/packages/add?item=${item}&title=${title}&data=${newdata}`)
      .then(Response=>(Response.data));
      setData(values=>([...values] = []));
      setCreatep(false);
  
    }

       return (
        <>
      <form>
          <h2>CREATE A NEW LIST OF PACKAGES</h2>
          <label>Enter Package Name:</label><input type ="text" placeholder =" eg Actifed  Packages" 
          onChange ={handle2change} required/>
          <table>
           <tr><th>Title</th><th>Description</th><th>Child factor</th></tr>
            <tr><td><input name ="title" size ="15" onChange={handlechange} value={packform.title}/></td>
            <td><input name = "description" size="15" onChange ={handlechange} value={packform.description}/></td>
            <td><input name ="child_factor" size ="15" onChange={handlechange} value={packform.child_factor}/></td>
            <td><button type ="button" onClick ={()=>{savecontent();}}>save</button></td></tr>
          </table>
      </form>
        <div>
          <table>
            <thead>
          <tr><th>Title</th><th>Description</th><th>Child Factor</th></tr>
          </thead>
          <tbody>
         {data && data.map((td,index)=>(
          <tr key ={index}>
          <td>{td.title}</td>
          <td>{td.description}</td>
          <td>{td.child_factor}</td>
          </tr>
          
         ))}
         <tr><td><button type = "button" onClick={()=>{handlesubmit();}}>Create Packages</button></td></tr>
         </tbody>
        </table></div>
        </> 
        )}
