import { Button, Col, Input,DatePicker, Form, InputNumber, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import "./bookappointment.css";
import Grid from "@mui/material/Grid";
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [pay,setPay]=useState("1000");
  const [time, setTime] = useState();
  const [fname, setfName] = useState();
  const [lname, setlName] = useState();
  const [phone, setPhone] = useState();
  const { user } = useSelector((state) => state.user);
  const [trainer, setTrainer] = useState(null);
  const params = useParams();
  const dispatch = useDispatch(); 
 
  const getTrainerData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/doctor/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        setTrainer(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };
  
  const checkAvailability = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: trainer,
          userInfo: user,
          date: date,
          time: time,
          pay:pay,
          fname:fname,
          lname:lname,
          phone:phone,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      

      dispatch(hideLoading());
      if (response.data.success) {
        
        toast.success(response.data.message);
        navigate('/appointments')
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getTrainerData();
  }, []); 
  
  const handleChangepayment = event => {
    setPay(event.target.value);
  };
  const handleChangefName = event => {
    const value = event.target.value;

  // Capitalize the first letter and update the state
  setfName(value.charAt(0).toUpperCase() + value.slice(1));
  };
  const handleChangelName = event => {
    const value = event.target.value;

  // Capitalize the first letter and update the state
  setlName(value.charAt(0).toUpperCase() + value.slice(1));
  }; 
  
  const handleChangePhone = event => {
    setPhone(event.target.value);
  };
  return (
    <Layout>
      {trainer && ( 
        <div className="appointment-status" >
          <BookmarkAddIcon fontSize="large" sx={{color:"#5138EE"}}/>
          
            <span><h1 >Book Appointment</h1></span>
          
              <div className="form" style={{marginTop:"15px"}}>
                <div className="text-holder">First Name</div>
              <input className="text-input" placeholder="Enter First Name" style={{"width":"100%","paddingLeft":"10px"}} onChange={handleChangefName}/>
              <div className="text-holder">Last Name</div>
              <input className="text-input" placeholder="Enter Last Name" style={{"width":"100%","paddingLeft":"10PX"}} onChange={handleChangelName}/>
              <div className="text-holder">Phone Number</div>
              <input className="text-input" placeholder="Enter Phone Number" style={{"width":"100%","paddingLeft":"10PX"}} onChange={handleChangePhone}/>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
              <div className="text-holder">Date</div>
                <DatePicker
                  format="DD-MM-YYYY"
                  className="text-input"
                  onChange={(value) => {
                    setDate(moment(value).format("DD-MM-YYYY"));
                    setIsAvailable(false);
                  }}
                />
                </Grid>
                <Grid item md={6} xs={12}>
                <div className="text-holder">Time</div>
                <TimePicker
                  format="HH:mm"
                  className="text-input"
                  onChange={(value) => {
                    setIsAvailable(false);
                    console.log(value);
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                </Grid>
                </Grid>
              
                <div className="text-holder">Amount</div>
                <input className="text-input" placeholder="Total Amount" style={{"width":"100%","paddingLeft":"10PX"}} onChange={handleChangepayment}/>
      
              {!isAvailable &&   <Button
                  className="submit"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}
                {isAvailable && (
                  <Button
                    className="submit"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                )}
              </div>
           
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
