
import React from 'react';
import {useState,useEffect} from 'react';
import axios from 'axios';
export default function Openpackage( props){
  const [packagelist, setPackagelist] = useState([]);
  const [packagetype, setPackagetype] = useState("");
  const item =props.item;
  const setQuantitycount = props.setQuantitycount;
  const setOpenp        =props.setOpenp;
  

  const handlepackage =(event)=>{
    setPackagetype(event.target.value);
    console.log(packagetype);
}

  useEffect(()=>{axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/packages/list?item=${item}`)
  .then(Response=>{var res = Response.data;
   for(var z in res){if(z==="data"){setPackagelist(res[z])}}});},[item]);

   
   if(!props.openp) {return null;}

    return(
    <>
    <div className= "modal">
    <div className ="modal-content">
      <div className ="modal-header">Open A Package</div>
      <div className = "modal-body">
      <form>
        <select name = "packagetype" value={packagetype}  onChange ={handlepackage} >
          <option value = "" >Select a Package</option>
           {packagelist && packagelist.map((list)=>(
  
          <option key ={list.id} value = {list.title}>{list.pack_label}</option>
  
        )
  )
  }
  </select>
  <button type = "button" onClick ={()=>{setOpenp(false);}}>Close Modal Box</button>
  
     {!item && packagetype === "" && <Nopackage setOpenp = {setOpenp}/>} 
     {item && packagetype === "Tabs" && <Tab setQuantitycount ={setQuantitycount} setOpenp = {setOpenp}/>} 
     {item && packagetype ==="Sachets" && <Sac setQuantitycount ={setQuantitycount} setOpenp = {setOpenp}/>}  
     {item && packagetype === "Packs" && <Pack setQuantitycount ={setQuantitycount} setOpenp = {setOpenp}/>} 
     {item && packagetype === "Boxes" && <Box setQuantitycount ={setQuantitycount} setOpenp = {setOpenp}/>} 
      </form>  
      </div>
      <div className ="modal-footer"></div>
   </div>
    </div>
   </>
    )
    }
      
    function Nopackage (props){
      const handleclose=()=>{
        props.setOpenp(false);
}
     
      return(
               <div>
       <h2>No Item Selected</h2>
       <h2>Close and Select an Item </h2>
       <button type ="button" onClick = {handleclose}>Close</button>
         </div>
         );
       }
      
       function Tab (props){
       const[ numbers, setNumbers] = useState({boxno:1})
            
        const [total, setTotal] = useState(numbers.boxno);
        
        const handlechange =(event)=>{
       const name = event.target.name;
      const value = event.target.value;
      setNumbers(numbers=>({...numbers, [name]:value}));
      setTotal(numbers.boxno);
      props.setQuantitycount(total);
        }

      const handleclose=()=>{
            props.setOpenp(false);
    
            }
      
       return(
                <div>
        <h2>Fill Details Below For A Tablet Packaging</h2>
         <label>Tablets per sachet:</label><input type ="text"  placeholder ="Enter tablets per sachet" onChange={handlechange}/>
         <button type ="button" onClick = {handleclose}>Close</button>
          </div>
          );
        }
        
        function Sac(props){

          const[ numbers, setNumbers] = useState({sacno:1, tabno:1})
            
            const [total, setTotal] = useState(numbers.sacno*numbers.boxno);
            
            const handlechange =(event)=>{
           const name = event.target.name;
          const value = event.target.value;
          setNumbers(numbers=>({...numbers, [name]:value}));
          setTotal(numbers.sacno*numbers.boxno);
          props.setQuantitycount(total);
            }

          const handleclose=()=>{
                props.setOpenp(false);
        
                }
            
            return (
                <div>
          <h2>Fill Details Below For A Sachet Packaging</h2>
          <label>Sachets per pack:</label><input type = "number" name ="sacno" placeholder ="Enter No of Sachets bought" onChange ={handlechange}/>
          <label>Tablets per sachet:</label><input type ="number" name="tabno" placeholder ="Enter tablets per sachet"  onChange ={handlechange}/>
          <button type ="button" onClick = {handleclose}>Close</button>
          </div>
            );
            } 

            function Pack (props){
            
              const[ numbers, setNumbers] = useState({packno:1,sacno:1, tabno:1})
            
            const [total, setTotal] = useState(numbers.packno*numbers.sacno*numbers.boxno);
            
            const handlechange =(event)=>{
           const name = event.target.name;
          const value = event.target.value;
          setNumbers(numbers=>({...numbers, [name]:value}));
          setTotal(numbers.packno*numbers.sacno*numbers.boxno);
          props.setQuantitycount(total);
            }

          const handleclose=()=>{
                props.setOpenp(false);
        
                }
            
                        
            return (
                <div>
         <h2>Fill Details Below For A Pack Packaging</h2>
          <label>Packs per box:</label><input type = "number" name="packno" placeholder ="Enter No of Packets bought"  onChange ={handlechange}/>
          <label>Sachets per pack:</label><input type ="number" name ="sacno" placeholder ="Enter Sachets per pack"  onChange ={handlechange}/>
          <label>Tablets per sachet:</label><input type ="number"  name ="tabno" placeholder ="Enter tablets per sachet"  onChange ={handlechange}/>
          <button type ="button" onClick = {handleclose}>Close</button>
          </div>
            );
            }

           function Box (props){
           
            const[ numbers, setNumbers] = useState({boxno:1, packno:1,sacno:1, tabno:1})
            
            const [total, setTotal] = useState(numbers.boxno*numbers.packno*numbers.sacno*numbers.boxno);
            
            const handlechange =(event)=>{
           const name = event.target.name;
          const value = event.target.value;
          setNumbers(numbers=>({...numbers, [name]:value}));
          setTotal(numbers.boxno*numbers.packno*numbers.sacno*numbers.boxno);
          props.setQuantitycount(total);
            }

          const handleclose=()=>{
                props.setOpenp(false);
        
                }
              
            return(
                <div>
          <h2>Fill Details Below For A Box Packaging</h2>
          <label>Number of boxes:</label><input type = "text" name="boxno" placeholder ="Enter no of boxes bought" onChange={handlechange}/>
          <label>Packs per box:</label><input type = "text" name="packno" placeholder ="Enter Packs Per Box" onChange={handlechange}/>
          <label>Sachets per pack:</label><input type ="text"  name="sacno"  placeholder ="Enter Sachets Per pack" onChange={handlechange}/>
          <label>Tablets per sachet:</label><input type ="text" name="tabno"  placeholder ="Enter tablets per sachet" onChange={handlechange}/>
          <button type ="button" onClick = {handleclose}>Close</button>
          
          </div>
            );
            }
        
        
           
  
        
