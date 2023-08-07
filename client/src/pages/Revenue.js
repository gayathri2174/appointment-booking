import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useEffect } from 'react';
import "../trainer.css"
import MonthlyRevenue from '../components/MonthlyRevenue';
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";


function Revenue(){
    const [revenue,setRevenue] =useState([])
    const dispatch = useDispatch();
    const totalamount= async()=>{
        try{
        dispatch(showLoading);
        const response=await axios.post("/get-amount");
        dispatch(hideLoading);
        if(response.data.success){
            setRevenue(response.data.data);
            
        }}
        catch(error){
            console.log(error);
            dispatch(hideLoading);
        }
        
    }
    useEffect(() => {
        totalamount();
      }, []); 
    return(
        <Layout>
            <div className='revenue-main'>
                <h1>Revenue</h1>
                <hr />
                {revenue.map((month)=>(
                    <MonthlyRevenue monthly={month}/>
                ))}
                
            </div>
        </Layout>
    )

}
export default Revenue;