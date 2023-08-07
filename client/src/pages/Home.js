import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Trainer from "../components/Trainer";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Home() { 
  const [trainer, setTrainer] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-doctors", {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setTrainer(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData(); 
  }, []);
   
  return (
    <Layout sx={{flex:"100%"}}>
        {trainer.map((train) => (
            <Trainer trainer={train} />
        ))}
    </Layout>
  );
} 

export default Home;

 