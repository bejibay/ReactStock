import { useState,useEffect } from "react";
import { Routes, Route, Outlet, Link ,useParams } from "react-router-dom";
import Home from './Home';
import StockPurchase from './StockPurchase';
import StockRequest from './StockRequest';
import StockTaking from './StockTaking';
import StockReceive from './StockReceive';
import StockApproval from './StockApproval';
import StockReport from './StockReport';
import NotApproved from './NotApproved';
import StockIssue from './StockIssue';


export const datafile = [{url:"stock-purchase", elem: <StockPurchase/>,linktext:"Stock Purchase"},{url:"stock-request",
elem :<StockRequest/>,linktext:"Stock Request"},{url:"stock-issue", elem: <StockIssue/>,linktext:"Stock Issue"},
{url:"stock-receive", elem: <StockReceive/>,linktext:"Stock Receive"},
{url: "stock-taking", elem:<StockTaking/>,linktext:"Stock Taking"} ,
{url:"stock-approval", elem: <StockApproval/>,linktext:"Stock Approval"},
{url:"stock-report", elem: <StockReport/>,linktext:"Stock Report"},
{url:"not-approved", elem: <NotApproved/>,linktext:"Not Approved"}];




export default function app(){
const data = datafile;
return (
<>
<Routes>
<Route element ={<HomeDisplay/>}>
<Route index element ={<Home data={data}/>}></Route> 
<Route path =':id' element ={<DynamicDisplay/>} />
</Route>
</Routes>
</>
);
}

export function HomeDisplay (){
return (
<>
<div>
<Link to ='/' >Stock Home</Link>
</div>
<hr/>
<Outlet/>
</>
);
}

export function DynamicDisplay(){
const data = datafile;
const[id,setId] = useState(useParams().id);
const[url, setUrl] = useState("")
const[elem, setElem]= useState("");
useEffect(()=>{for(var i=0; i<data.length;i++){
  var obj= data[i];
  if(obj.url===id){
    setUrl(obj.url);
    setElem(obj.elem);     
         }
}
},[data,id]
);
return (
    <>
    <h5>{id}</h5>
    <div>{elem}</div>
   </>
);
}
