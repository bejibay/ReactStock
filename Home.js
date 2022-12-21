
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