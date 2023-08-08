import { Button } from "antd";
import React, { useState } from "react";
import "../trainer.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { Box } from "@mui/material";

function Trainer({ trainer }) {
  const navigate = useNavigate();
  const [available,setavailable]=useState(false);
  const [status,setStatus]=useState([]);
  const dispatch = useDispatch();
  const currentstatus=async()=>{
    try{
      dispatch(showLoading())
      const response= await axios.post("/status");
      dispatch(hideLoading())
    if(response.data.success){
      setStatus(response.data.data);
    }
    
    }
    catch(error){
      console.log(error);
    }
  }
  const checkvalue=()=>{
    if(status.sum!==undefined){
      setavailable(true);
    }
  }
  useEffect(() => {
    currentstatus(); 
    checkvalue();
  }, []);
  console.log(status.sum);
  return (  
    <div  
      className="appointment-status"
    >
      <Box display="flex" alignItems="center" marginBottom="10px">
        <EventNoteIcon  sx={{color:"#5138EE", marginRight:"15px",fontSize:"50px"}}/>
        <h1>Appointment Status</h1>
      </Box>
      <hr />
      <div style={{marginLeft:"20px"}}>
      <p style={{marginTop:"40px"}}> 
        <h4>
        <b>Appointments Booked : </b>
        <span className="res">{status.count}</span>
        </h4>
      </p>
      <p>
        <h4>
          <b>Pending Payment : </b>
          <span className="res">{status.pending}</span>
        </h4>
      </p>
      <p>
        <h4>
        <b>Amount till Now : </b>
        <span className="res">₹ {status.sum}</span>
        </h4>
      </p>
      </div>
      <p>
        <Button className="submit" onClick={() => navigate(`/book-appointment/${trainer._id}`)}>Book Now</Button>
      </p>
      
    </div>
  );
}
 
export default Trainer;
