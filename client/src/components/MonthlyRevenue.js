import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box } from "@mui/material";

function MonthlyRevenue({monthly}){
    const month= ["","January","Febrary","March","April","May","June","July","August","September","October","November","December"];
    const navigate=useNavigate();
    const handleDetailsClick = () => {
        const dataToPass = {
          month: month[monthly._id.month],
          year: monthly._id.year,
          totalAmount: monthly.total_cost_month,
          Customer: monthly.itemsSold,
        };
     
        navigate('/monthlyrevenue', { state:{monthlyData: dataToPass }});
      };

    return(
    <Grid container spacing={1} style={{marginBottom:"20px",padding:"15px"}}  justifyContent="space-between" alignItems="center">
      
      <Grid item md={3} xs={12}>
      <Box display="flex" alignItems="center" marginBottom="20px">
      <CalendarTodayIcon  style={{color:"#5138EE",fontSize:"45px"}}/>
      <div style={{marginLeft:"10px"}}>
        <h6 className="month">{month[monthly._id.month]}</h6>
        <h4 className="year"> {monthly._id.year}</h4>
        </div>
        </Box>
        </Grid>
        <Grid item md={3} >
        <h5>Total Amount : {monthly.total_cost_month}</h5>
        </Grid>
        <Grid item md={3}>
        <h5>Appointments : {monthly.total_appointments}</h5>
        </Grid>
        <Grid item md={2}>
        <Button type="primary" className="buttonapp" onClick={handleDetailsClick}>Details</Button>
        </Grid>
    </Grid>
   )

  

}

export default MonthlyRevenue;