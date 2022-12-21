import React from 'react';
import axios from 'axios';



export default function StockPackage(){
    
const handlesubmit=(event)=>{
  event.preventDefault();
  axios.get(`http://localhost/bills_online/commons/stock_management_endpoint/index.php/packages/add?item=1042&title=Test Package&data=[{"title":"Tabs","description":"Tablets for actifed","child_factor":200,"dispense_tag_yn":1,"bulk_tag_yn":0},{"title":"Satchet","description":"Satchets for actifed","child_factor":200,"dispense_tag_yn":0,"bulk_tag_yn":0},{"title":"Boxes","description":"Boxess for actifed","child_factor":200,"dispense_tag_yn":0,"bulk_tag_yn":1}]`);

}

  return (
        <>
        <form >
        <h2>Select Right Package From DropDown</h2>
        <select>
          <option value ="Boxes">BOXES</option> 
          <option value ="Packs">Packs</option>
          <option value ="Sachets">Sachets</option>
        </select>
        </form>
        <form onSubmit={handlesubmit}>
             <h2>Fill Details Below For A Box Packaging</h2>
             <label>Enter Title:</label><input type ="text" placeholder ="Select Title Below" />
             <label>Enter Description:</label><input type ="text" placeholder = "e.g Tablets of Actified" />
             <label>Number of boxes:</label><input type = "number" placeholder ="Enter no of boxes bought"/>
             <label>Packs per box:</label><input type = "number" placeholder ="Enter Packs Per Box"/>
             <label>Sachets per pack:</label><input type ="number"  placeholder ="Enter Sachets Per pack"/>
             <label>Tablets per sachet:</label><input type ="number"  placeholder ="Enter tablets per sachet"/>
             <input type ="submit" value ="Sumit Package"/>
          </form>
          <form>  
          <h2>Fill Details Below For A Pack Packaging</h2>
          <label>Title:</label><input type ="text" placeholder ="Select Title Below" />
          <label>Description:</label><input type ="text" placeholder ="e.g Tablets of Actified" />
          <label>Packs per box:</label><input type = "number" placeholder ="Enter No of Packets bought" />
          <label>Sachets per pack:</label><input type ="number" placeholder ="Enter Sachets per pack" />
          <label>Tablets per sachet:</label><input type ="number"  placeholder ="Enter tablets per sachet"/>
          </form>
          <form>  
          <h2>Fill Details Below For A Sachet Packaging</h2>
          <label>Title:</label><input type ="text" placeholder ="Select Title Below" />
          <label>Description:</label><input type ="text" placeholder ="e.g Tablets of Actified" />
          <label>Sachets per pack:</label><input type = "number" placeholder ="Enter No of Sachets bought" />
          <label>Tablets per sachet:</label><input type ="number"  placeholder ="Enter tablets per sachet"/>
        
          </form>
          </>
    )
    
    
            
}