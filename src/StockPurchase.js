import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Package from "./Packages/Packages";

export default function StockPurchase() {
  const [tableData, setTableData] = useState([]);
  const [currentFormData, setCurrentFormData] = useState({
    id: "",
    eventid: "",
    date: "",
    narration: "",
    item: "",
    quantity: "",
    actual_quantity: "",
    unit_cost: "",
    batch:1234,
    location: "",
  });
  const [edit, setEdit] = useState(false);
  const [transid, setTransid] = useState({ trans_id: 0 });
  const [createp, setCreatep] = useState(false);
  const [item, setItem] = useState(0);
  const [quantitycount, setQuantitycount] = useState("");
  const [evtid, setEvtid] = useState(currentFormData.eventid);
  console.log(item);

  
const addformdata = (formData) => {
    formData.id = tableData.length + 1;
    setTransid((transid) => ({ ...transid, trans_id: formData.eventid }));
    setTableData((tableData) => [...tableData, formData]);
  };

  const emptytabledata = () => {
    const trans = transid.trans_id;
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/createstrg",
        {
          params: {
            location: 1021,
            trans_id: trans,
            data: JSON.stringify(tableData),
          },
        }
      )
      .then((Response) => console.log(Response));
    console.log(JSON.stringify(tableData));
    console.log(trans);
    setTableData((tableData) => ([...tableData] = []));
  };

  const handleedit = (formData) => {
    setEdit(true);
    setCurrentFormData({
      id: formData.id,
      eventid: formData.eventid,
      date: formData.date,
      narration: formData.narration,
      item: formData.item,
      quantity: formData.quantity,
      actual_quantity: formData.actual_quantity,
      unit_cost: formData.unit_cost,
      location: formData.location
    });
  };

  const handledelete = (id) => {
    if (window.confirm("Are you sure you want to delete this row") === true) {
      setTableData(tableData.filter((el) => el.id !== id));
    }
  };

  const updatedata = (id, updatedUser) => {
    setEdit(false);
    setTableData(
      tableData.map((formData) => (formData.id === id ? updatedUser : formData))
    );
  };

  return (
    <>
      <form>
        <h3>Previous Invoices</h3>

        <label>From:</label>
        <input type="date" name="fdate" />
        <label>To:</label>
        <input type="date" name="tdate" />
        <button type="button">Click</button>
      </form>
      <hr />
      <div>
        {edit ? (
          <EditForm
            setEdit={setEdit}
            currentFormData={currentFormData}
            updatedata={updatedata}
          />
        ) : (
          <AddFormData
            addformdata={addformdata}
            setCreatep={setCreatep}
            createp={createp}
            setItem={setItem}
            quantitycount={quantitycount}
            evtid = {evtid}
            setEvtid = {setEvtid}
          />
        )}
        <AddTableData
          tableData={tableData}
          handleedit={handleedit}
          handledelete={handledelete}
          emptytabledata={emptytabledata}
        />
        
        <Package
          createp={createp}
          item={item}
          setCreatep = {setCreatep} 
          setQuantitycount = {setQuantitycount}
        />
      </div>
    </>
  );
}

export function AddTableData(props) {
  const purchaseApproval = (event) => {
    event.preventDefault();
    props.emptytabledata();
  };

  return (
    <form onSubmit={purchaseApproval}>
      <h2>Invoice Details</h2>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th>Event ID</th>
            <th>Date</th>
            <th>Narration</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Act Qty</th>
            <th>Unit Cost</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.eventid}</td>
              <td>{el.date}</td>
              <td>{el.narration}</td>
              <td>{el.item}</td>
              <td>{el.quantity}</td>
              <td>{el.actual_quantity}</td>
              <td>{el.unit_cost}</td>
              <td>{el.batch}</td>
              <td>{el.location}</td>
              <td>
                <button type="button" onClick={() => props.handleedit(el)}>
                  Edit
                </button>
                <button type="button" onClick={() => props.handledelete(el.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <button type="submit" name="submit">
                Submit For Approval
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export function AddFormData(props) {
  const [formData, setFormData] = useState({
    id: "",
    eventid: "",
    date: "",
    narration: "",
    item: "",
    quantity: "",
    actual_quantity: "",
    unit_cost: "",
    batch:"",
    location: "",
  });
  const [store, setStore] = useState([]);
  const [drug, setDrug] = useState([]);
  
  

  useEffect(() => {
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/list?location=1021&trans_id=120220000039131"
      )
      .then((Response) => {
        var data = Response.data;
        for (var x in data) {
          if (x === "locations") {
            setStore(data[x]);
          }
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/list?location=1021&trans_id=120220000039131"
      )
      .then((Response) => {
        var data = Response.data;
        for (var y in data) {
          if (y === "procedureItems") {
            setDrug(data[y]);
          }
        }
      });
  }, []);

  
  const handlebatch = () => {
    const evtdata = [{ title: "Test Event", description: "Just checking" }];
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/createevt",
        {
          params: { location: 1021, data: JSON.stringify(evtdata) },
        }
      )
      .then((Response) => {
        props.setEvtid(Response.data.insert_id);
        console.log(props.evtid);
      });
  };

  const handlechange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({
      ...values,
      [name]: value,
      eventid:props.evtid,
      quantity: props.quantitycount,
      actual_quantity: props.quantitycount,
    }));
  
    console.log(formData);
  };

  useEffect(()=>{props.setItem(formData.item);},[props, formData.item]);

  const handlesubmit = (event) => {
    event.preventDefault();
    props.addformdata(formData);
    setFormData((values) => ({
      ...values,
      item: "",
      quantity: "",
      unit_cost: "",
      actual_quantity: ""
    }));
  };

  const handlecreatep = () => {
    props.setCreatep(true);
  };

  return (
    <>
      <div></div>
      <div>
        <h3>New Invoices</h3>
        <button type="button" name="batch" onClick={handlebatch}>
          +
        </button>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder = "click the + button"
            name = "eventid"
            value={props.evtid}
            onChange={handlechange}
            required
          />
          <label>Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            onChange={handlechange}
            required
          />
           <input
            type="text"
            name="narration"
            placeholder="Input Narration"
            onChange={handlechange}
          
            required
          />
          <select
            name="item"
            value={formData.item}
            onChange={handlechange}
            required
          >
            <option value="">Select item / Drug</option>
            {drug.map((dr) => (
              <option key={dr.id} value={dr.id}>
                {dr.naming}
              </option>
            ))}
          </select>
        <button onClick={handlecreatep}>Item Package </button>
        <input
            type="text"
            name="quantity"
            placeholder="Enter quantity"
            value={props.quantitycount}
            onChange={handlechange}
            required
          />
          <input
            type="text"
            name="actual_quantity"
            placeholder="Enter Actual Quantity"
            value={props.quantitycount}
            onChange={handlechange}
            required
          />
          <input
            type="number"
            name="unit_cost"
            placeholder="Enter unit cost in Naira"
            value={formData.unit_cost}
            onChange={handlechange}
           required
          />
          <select
            name="location"
            onChange={handlechange}
            value={formData.location}
            required
          >
            <option value="">Select Store location</option>
            {store.map((st) => (
              <option key={st.id} value={st.id}>
                {st.location_name}
              </option>
            ))}
          </select>
          <input type="submit" name="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export function EditForm(props) {
  const [formData, setFormData] = useState(props.currentFormData);
  const [store, setStore] = useState([]);
  const [drug, setDrug] = useState([]);
  

  useEffect(() => {
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/list?location=1021&trans_id=120220000039131"
      )
      .then((Response) => {
        var data = Response.data;
        for (var x in data) {
          if (x === "locations") {
            setStore(data[x]);
          }
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        "http://localhost/bills_online/commons/stock_management_endpoint/index.php/purchases/list?location=1021&trans_id=120220000039131"
      )
      .then((Response) => {
        var data = Response.data;
        for (var y in data) {
          if (y === "procedureItems") {
            setDrug(data[y]);
          }
        }
      });
  }, []);

  
  const handleinputchange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const submitupdate = (event) => {
    event.preventDefault();
    props.updatedata(formData.id, formData);
    setFormData(values=>({...values, eventid:props.currentFormData.eventid}));
  };

  useEffect(() => {
    setFormData(props.currentFormData);
  }, [props]);

  return (
    <div>
      <form onSubmit={submitupdate}>
        <p>Edit Form</p>
        <label>Event ID:</label>
        <input
          type="number"
          name="eventid"
          id="eventid"
          onChange={handleinputchange}
          value={formData.eventid}
          required
        />
        <label>Narration</label>
        <input
          type="text"
          name="narration"
          id="narration"
          onChange={handleinputchange}
          value={formData.narration}
          required
        />
        
        <label>item Name / Drug:</label>
        <select
          name="item"
          id="item"
          onChange={handleinputchange}
          value={formData.item}
          required
        >
          {drug.map((dr) => (
            <option key={dr.id} value={dr.id}>
              {dr.naming}
            </option>
          ))}
        </select>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          onChange={handleinputchange}
          value={formData.quantity}
          required
        />
        <label>Actual Quantity:</label>
        <input
          type="number"
          name="actual_quantity"
          id="actual_quantity"
          onChange={handleinputchange}
          value={formData.actual_quantity}
          required
        />
        <label>Unit Cost:</label>
        <input
          type="number"
          name="unit_cost"
          id="unit_cost"
          onChange={handleinputchange}
          value={formData.unit_cost}
          required
        />
        <label>Date:</label>
        <input
          type="date"
          name="date"
          id="date"
          onChange={handleinputchange}
          value={formData.date}
          required
        />
        <label>location:</label>
        <select
          name="location"
          id="location"
          onChange={handleinputchange}
          value={formData.location}
          required
        >
          {store.map((st) => (
            <option key={st.id} value={st.id}>
              {st.location_name}
            </option>
          ))}
        </select>
        <input type="submit" name="submit" value="Update" />
        <input
          type="reset"
          name="reset"
          value="Cancel"
          onClick={() => props.setEdit(false)}
        />
      </form>
    </div>
  );
}
