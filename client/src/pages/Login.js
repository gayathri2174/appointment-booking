import { Button, Form,  Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "./SideBar";
import { Stack,Box } from "@mui/material";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Grid from "@mui/material/Grid";
import "../login.css";

function Login() { 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{p:6}}>
              <img className="logo" src="/logoimage.png" alt="imagenot" />
              
        <h2>Book Your Appointments.</h2>
        <div className="sub-head">Enter to get access to book appointments & information</div>
     <Form layout="vertical" onFinish={onFinish} className="">
     <Form.Item label="Email" name="email" className="inputBox">
            <Input placeholder="Enter Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" className="inputBox">
            <Input placeholder="Enter Password" type="password" />
          </Form.Item>
          
          <Button className="submit" htmlType="submit">
            LOGIN
          </Button>
        </Form>
        </Box>

        </Grid>
        <Grid item xs={12} md={6}>
        
        <SideBar/>
        </Grid>
        </Grid>

     
      
    </div>
    
  );
}

export default Login;
